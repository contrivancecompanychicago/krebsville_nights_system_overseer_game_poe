const Sentry = require('@sentry/node');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Daily Deeds Logging Helper
async function logDeed(deed) {
  try {
    // Check if daily_deeds table exists first, if not just console log
    await pool.query(
      'INSERT INTO daily_deeds (timestamp, event, type, zone, health, credits) VALUES ($1, $2, $3, $4, $5, $6)',
      [deed.timestamp, deed.event, deed.type, deed.zone, deed.health, deed.credits]
    );
  } catch (err) {
    console.log(`[DEEDS_LOG_FALLBACK] ${JSON.stringify(deed)}`);
    // Only capture real errors, not missing table errors during transition
    if (err.code !== '42P01') {
      Sentry.captureException(err);
    }
  }
}

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
    });
    console.log('[SENTRY] Diagnostics scanner initialized.');
}

const PORT = 5000;
const HOST = '0.0.0.0';

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.md': 'text/plain',
    '.yml': 'text/yaml',
    '.yaml': 'text/yaml',
    '.txt': 'text/plain'
};

let sharedGameState = null;
let lastSyncTime = null;
let syncLog = [];

function addSyncLog(source, action) {
    const entry = { time: new Date().toISOString(), source, action };
    syncLog.push(entry);
    if (syncLog.length > 50) syncLog.shift();
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    });
}

// Google Sheets Relay / System Broadcast
async function systemBroadcast(payload) {
    try {
        const entry = {
            timestamp: new Date().toISOString(),
            payload: JSON.stringify(payload)
        };
        console.log(`[SYSTEM_BROADCAST] ${entry.payload}`);
        // Log to deeds as well
        await logDeed({
            timestamp: entry.timestamp,
            event: `BROADCAST: ${payload.type || payload.action || 'update'}`,
            type: 'broadcast',
            zone: payload.zone || (sharedGameState ? sharedGameState.currentZoneId : 0),
            health: sharedGameState ? sharedGameState.health : 0,
            credits: sharedGameState ? sharedGameState.credits : 0
        });
    } catch (err) {
        console.error('Broadcast relay failed:', err);
        Sentry.captureException(err);
    }
}

const server = http.createServer(async (req, res) => {
  try {
    // ... headers ...

    if (req.url === '/api/broadcast' && req.method === 'POST') {
        try {
            const data = await parseBody(req);
            await systemBroadcast(data);
            
            // Handle Life-Shock specifically
            if (data.type === 'LIFE_SHOCK') {
                console.log(`[ALERT] ${data.character} entered Life-Shock state!`);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
        } catch (e) {
            Sentry.captureException(e);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/state' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            state: sharedGameState,
            lastSync: lastSyncTime,
            log: syncLog.slice(-10)
        }));
        return;
    }

    if (req.url === '/api/state' && req.method === 'POST') {
        try {
            const data = await parseBody(req);
            sharedGameState = data.state || data;
            lastSyncTime = new Date().toISOString();
            const source = data.source || 'unknown';
            addSyncLog(source, 'state_update');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, synced: lastSyncTime }));
            
            // Log sync to deeds
            logDeed({
              timestamp: new Date().toISOString(),
              event: `State synced from ${source}`,
              type: 'sync',
              zone: sharedGameState.currentZoneId,
              health: sharedGameState.health,
              credits: sharedGameState.credits
            });
        } catch (e) {
            Sentry.captureException(e);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
        return;
    }

    if (req.url === '/api/action' && req.method === 'POST') {
        try {
            const data = await parseBody(req);
            const action = data.action;
            const params = data.params || {};
            const source = data.source || 'colab';

            if (!sharedGameState) {
                sharedGameState = {
                    name: 'Dr. Grant',
                    time_tokens: 37,
                    credits: 3480,
                    hazard_level: 0,
                    health: 100,
                    companion: 'Nurse Carter',
                    modifiers: { tech: 5, stealth: 3, reflexes: 2 },
                    currentZoneId: 1,
                    inventory: [],
                    visitedZones: [1],
                    turnCount: 0
                };
            }

            let result = { ok: true };

            switch (action) {
                case 'roll_check': {
                    const stat = params.stat || 'tech';
                    const mod = sharedGameState.modifiers?.[stat] || 0;
                    const roll = Math.floor(Math.random() * 20) + 1;
                    const total = roll + mod;
                    result = { roll, modifier: mod, total, stat };
                    addSyncLog(source, `roll_check:${stat} = ${total}`);
                    break;
                }
                case 'combat': {
                    const enemy = params.enemy || 'Unknown';
                    const difficulty = params.difficulty || 15;
                    const initRoll = Math.floor(Math.random() * 20) + 1;
                    const reflexMod = sharedGameState.modifiers?.reflexes || 0;
                    const initTotal = initRoll + reflexMod;
                    let combatResult = 'loss';

                    if (initTotal >= 12) {
                        const techMod = sharedGameState.modifiers?.tech || 0;
                        const atkRoll = Math.floor(Math.random() * 20) + 1;
                        const atkTotal = atkRoll + techMod;
                        if (atkTotal >= difficulty) {
                            combatResult = 'win';
                        } else {
                            sharedGameState.time_tokens -= 2;
                        }
                        result = { combatResult, enemy, initiative: { roll: initRoll, total: initTotal }, attack: { roll: atkRoll, total: atkTotal, dc: difficulty } };
                    } else {
                        sharedGameState.time_tokens -= 2;
                        result = { combatResult, enemy, initiative: { roll: initRoll, total: initTotal } };
                    }
                    addSyncLog(source, `combat:${enemy} = ${combatResult}`);
                    break;
                }
                case 'carter_heal': {
                    if (sharedGameState.credits >= 100) {
                        sharedGameState.credits -= 100;
                        sharedGameState.time_tokens += 5;
                        result = { healed: true, tokens_restored: 5 };
                        addSyncLog(source, 'carter_heal: +5 tokens');
                    } else {
                        result = { healed: false, reason: 'insufficient_credits' };
                    }
                    break;
                }
                case 'generate_loot': {
                    const isElite = params.is_elite_vault || false;
                    let credits = Math.floor(Math.random() * 151) + 50;
                    if (isElite) credits *= 2;
                    sharedGameState.credits += credits;
                    const items = [
                        'Empty Syringe', 'Decrypted Patient File', 'Broken Circuit Board',
                        'Adrenaline Shot', 'Data Spike', 'Coolant Spray', 'Elite Keycard'
                    ];
                    const foundItem = items[Math.floor(Math.random() * items.length)];
                    result = { credits_found: credits, item: foundItem };
                    addSyncLog(source, `loot: +${credits}cr, ${foundItem}`);
                    break;
                }
                case 'er_vitals_override': {
                    const techMod = sharedGameState.modifiers?.tech || 5;
                    const roll = Math.floor(Math.random() * 20) + 1;
                    const total = roll + techMod;
                    let overrideResult = 'FAIL';
                    if (total >= 15) {
                        overrideResult = 'SUCCESS';
                    } else if (roll === 1) {
                        overrideResult = 'CRIT_FAIL';
                        sharedGameState.hazard_level = Math.min(5, (sharedGameState.hazard_level || 0) + 2);
                    } else {
                        sharedGameState.hazard_level = Math.min(5, (sharedGameState.hazard_level || 0) + 1);
                    }
                    result = { roll, modifier: techMod, total, result: overrideResult };
                    addSyncLog(source, `er_override: ${overrideResult}`);
                    break;
                }
                case 'move_zone': {
                    const zoneId = params.zone_id;
                    if (zoneId >= 1 && zoneId <= 100) {
                        sharedGameState.currentZoneId = zoneId;
                        sharedGameState.time_tokens -= 1;
                        if (!sharedGameState.visitedZones) sharedGameState.visitedZones = [];
                        if (!sharedGameState.visitedZones.includes(zoneId)) {
                            sharedGameState.visitedZones.push(zoneId);
                        }
                        result = { moved: true, zone_id: zoneId };
                        addSyncLog(source, `move: zone ${zoneId}`);
                    } else {
                        result = { moved: false, reason: 'invalid_zone' };
                    }
                    break;
                }
                default:
                    result = { error: `Unknown action: ${action}` };
            }

            lastSyncTime = new Date().toISOString();

            // Log action to deeds
            logDeed({
              timestamp: new Date().toISOString(),
              event: `Action: ${action} from ${source}`,
              type: 'action',
              zone: sharedGameState.currentZoneId,
              health: sharedGameState.health,
              credits: sharedGameState.credits
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                ...result,
                state: sharedGameState,
                synced: lastSyncTime
            }));
        } catch (e) {
            Sentry.captureException(e);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

    if (req.url === '/api/config' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            supabaseUrl: process.env.SUPABASE_URL || null,
            supabaseKey: process.env.SUPABASE_ANON_KEY || null,
            sentryDsn: process.env.SENTRY_DSN || null
        }));
        return;
    }

    if (req.url === '/api/sync-log' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ log: syncLog, lastSync: lastSyncTime }));
        return;
    }

    let filePath = req.url === '/' ? '/index.html' : req.url;

    if (filePath.startsWith('/public/')) {
        filePath = filePath.substring(7);
    }

    let fullPath = path.join(__dirname, 'public', filePath);

    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(__dirname, filePath);
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                Sentry.captureException(err);
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
  } catch (err) {
    Sentry.captureException(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
    console.log('API endpoints:');
    console.log('  GET  /api/state     - Get current shared game state');
    console.log('  POST /api/state     - Push game state from Colab/browser');
    console.log('  POST /api/action    - Execute game action (combat, loot, heal, etc.)');
    console.log('  GET  /api/sync-log  - View sync activity log');
});
