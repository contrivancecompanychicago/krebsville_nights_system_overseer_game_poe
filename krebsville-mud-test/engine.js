/**
 * engine.js - COSINE MUD Box Foundation
 * Handles: State Management, Dice Engine, Persistence, Command Processing
 * Organization: contrivancecompanychicago
 * Project: Krebsville Nights: Unequal Treatment
 */

// ============ GAME STATE ============
const gameState = {
  timeTokens: 37,
  credits: 3480,
  hazardLevel: 4,
  currentZone: 'Oncology_Research',
  inventory: [
    { name: 'Faulty Sequencer Part', qty: 1, rarity: 'common' },
    { name: 'Salvaged Circuit Board', qty: 2, rarity: 'common' }
  ],
  npcPresent: ['Dr. Kovacs'],
  narrative: [],
  zoneConfig: {},
  sessionStartTime: Date.now(),
  commandHistory: []
};

// ============ HUD UPDATE UTILITY ============
/**
 * Updates all HUD elements to reflect current game state
 */
function updateHUD() {
  const timeTokensEl = document.getElementById('hud-timeTokens');
  const creditsEl = document.getElementById('hud-credits');
  const hazardLevelEl = document.getElementById('hud-hazardLevel');
  const currentZoneEl = document.getElementById('hud-currentZone');

  if (timeTokensEl) timeTokensEl.textContent = gameState.timeTokens;
  if (creditsEl) creditsEl.textContent = gameState.credits.toLocaleString();
  if (hazardLevelEl) {
    hazardLevelEl.textContent = gameState.hazardLevel;
    // Apply glitch effect for high hazard
    if (gameState.hazardLevel >= 4) {
      hazardLevelEl.classList.add('hazard-critical');
    } else {
      hazardLevelEl.classList.remove('hazard-critical');
    }
  }
  if (currentZoneEl) currentZoneEl.textContent = gameState.currentZone.replace(/_/g, ' ');
}

// ============ DICE ENGINE ============
/**
 * Roll D20 with modifier against target DC
 * Handles success/failure narrative and hazard escalation
 * @param {number} modifier - Skill modifier to add to roll
 * @param {number} targetDC - Difficulty Class (default 12)
 * @returns {number} The final roll result
 */
function rollD20(modifier = 0, targetDC = 12) {
  const baseRoll = Math.floor(Math.random() * 20) + 1;
  const finalRoll = baseRoll + modifier;
  const success = finalRoll >= targetDC;

  let message = `[DICE ROLL] d20${modifier > 0 ? '+' + modifier : ''} = ${baseRoll}${modifier > 0 ? '+' + modifier : ''} = ${finalRoll} vs DC ${targetDC} `;

  if (success) {
    message += '✓ SUCCESS';
    addConsoleMessage(message, 'success');
  } else {
    message += '✗ FAILURE';
    addConsoleMessage(message, 'failure');
    
    // In critical zones, failures increase hazard
    if (gameState.hazardLevel >= 3) {
      gameState.hazardLevel = Math.min(5, gameState.hazardLevel + 1);
      addConsoleMessage('[HAZARD] Hazard level increased due to failed check!', 'warning');
    }
  }

  updateHUD();
  return finalRoll;
}

// ============ PERSISTENCE (localStorage) ============
/**
 * Save game state to browser localStorage
 */
function saveGameState() {
  try {
    const stateToSave = {
      ...gameState,
      saveTimestamp: new Date().toISOString()
    };
    localStorage.setItem('cosineMudState_v1', JSON.stringify(stateToSave));
    addConsoleMessage('[SYSTEM] Game state saved to localStorage.', 'info');
  } catch (err) {
    console.error('Failed to save game state:', err);
    addConsoleMessage('[ERROR] Failed to save game state.', 'error');
  }
}

/**
 * Load game state from browser localStorage
 */
function loadGameState() {
  try {
    const saved = localStorage.getItem('cosineMudState_v1');
    if (saved) {
      const loadedState = JSON.parse(saved);
      Object.assign(gameState, loadedState);
      addConsoleMessage(`[SYSTEM] Game state loaded (saved at ${new Date(gameState.saveTimestamp).toLocaleString()}).`, 'info');
      updateHUD();
      updateInventoryList();
      return true;
    } else {
      addConsoleMessage('[SYSTEM] No saved game found. Starting fresh.', 'info');
      return false;
    }
  } catch (err) {
    console.error('Failed to load game state:', err);
    addConsoleMessage('[ERROR] Failed to load saved game.', 'error');
    return false;
  }
}

/**
 * Auto-save game state every 30 seconds
 */
function autoSave() {
  saveGameState();
  setTimeout(autoSave, 30000); // Every 30 seconds
}

// ============ ACTION HANDLERS ============
/**
 * Handle button-based actions (inspect, commune, contrive, hazard_check)
 * @param {string} action - The action type
 */
window.handleAction = function(action) {
  switch(action) {
    case 'inspect':
      handleInspect();
      break;
    case 'commune':
      handleCommune();
      break;
    case 'contrive':
      handleContrive();
      break;
    case 'hazard_check':
      handleHazardCheck();
      break;
    default:
      addConsoleMessage(`[SYSTEM] Unknown action: ${action}`, 'warning');
  }
  updateHUD();
};

/**
 * Inspect the current zone and surroundings
 */
function handleInspect() {
  const descriptions = [
    "You scan the Genetic Sequencing Hub with your HUD overlay. Flickering CRT screens display erratic genetic data. Loose components are scattered across workstations—a mix of medical equipment and salvaged tech.",
    "The haze of smoke thickens as you move deeper into the vents. You spot a faulty sequencer unit partially obscured by debris. The machinery hums ominously beneath your feet.",
    "A security camera blinks red, its lens cracked. The equipment in this zone is old, maintained poorly, and clearly deprioritized by the System."
  ];
  const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
  addConsoleMessage(`[ACTION] ${randomDesc}`, 'narrative');
}

/**
 * Commune with NPCs in the zone
 */
function handleCommune() {
  const dialogues = {
    'Dr. Kovacs': [
      "Dr. Kovacs leans out of the shadows, eyes wild. 'The filters are failing. If you can fix the hazmat system, I'll give you experimental antivirals. The DOVIC-26 is mutating.'",
      "Dr. Kovacs whispers urgently: 'I found something in the genetic data. The virus targets specific demographics. The System is controlling the outbreak distribution.'",
      "Dr. Kovacs hands you a data chip. 'This proves everything. But if they find you with it, they'll lock you out of every zone. The choice is yours, Dr. Grant.'"
    ]
  };
  
  const npc = gameState.npcPresent[0] || 'Unknown';
  const dialogue = dialogues[npc] ? dialogues[npc][Math.floor(Math.random() * dialogues[npc].length)] : 'An NPC stands before you.';
  
  addConsoleMessage(`[${npc.toUpperCase()}] ${dialogue}`, 'dialogue');
}

/**
 * Attempt to combine items (contrive)
 * COSINE mechanic: Crafting system
 */
function handleContrive() {
  const recipes = [
    {
      name: 'Makeshift Analyzer',
      requires: [
        { name: 'Faulty Sequencer Part', qty: 1 },
        { name: 'Salvaged Circuit Board', qty: 1 }
      ],
      result: { name: 'Makeshift Analyzer', qty: 1, rarity: 'uncommon' },
      narrative: "You carefully solder the circuit board to the sequencer part, creating a makeshift diagnostic device. It hums with fragile electricity."
    },
    {
      name: 'Hazmat Filter Patch',
      requires: [
        { name: 'Salvaged Circuit Board', qty: 2 }
      ],
      result: { name: 'Hazmat Filter Patch', qty: 1, rarity: 'rare' },
      narrative: "You fashion a makeshift filter patch from the salvaged materials. It's not perfect, but it might help."
    }
  ];

  // Show available recipes
  let available = [];
  recipes.forEach(recipe => {
    const canMake = recipe.requires.every(req => {
      const item = gameState.inventory.find(i => i.name === req.name);
      return item && item.qty >= req.qty;
    });
    if (canMake) available.push(recipe);
  });

  if (available.length === 0) {
    addConsoleMessage('[ACTION] You lack the necessary parts to contrive anything.', 'warning');
    return;
  }

  // Make the first available recipe for simplicity
  const recipe = available[0];
  recipe.requires.forEach(req => {
    const item = gameState.inventory.find(i => i.name === req.name);
    if (item) item.qty -= req.qty;
  });
  gameState.inventory.push(recipe.result);
  addConsoleMessage(`[ACTION] ${recipe.narrative}`, 'success');
  updateInventoryList();
}

/**
 * Roll Environmental Perception Check (DC 13)
 * Failure increases hazard level
 */
function handleHazardCheck() {
  addConsoleMessage('[ACTION] You attempt an Environmental Perception Check (DC 13)...', 'info');
  const result = rollD20(0, 13);
  
  if (result >= 13) {
    addConsoleMessage('[RESULT] You safely navigate through the hazardous environment, avoiding contamination.', 'success');
  } else {
    addConsoleMessage('[RESULT] The smoke inhalation disorients you. You struggle to maintain composure.', 'failure');
    // Hazard already increased by rollD20 on failure
  }
}

// ============ CONSOLE INPUT HANDLER ============
/**
 * Process text-based commands from console input
 * @param {string} command - The command text
 */
window.processCommand = function(command) {
  command = command.trim().toLowerCase();
  
  // Add to command history
  gameState.commandHistory.push(command);
  
  // Command routing
  if (command.includes('inspect') || command.includes('examine') || command.includes('look')) {
    window.handleAction('inspect');
  } else if (command.includes('commune') || command.includes('talk') || command.includes('speak')) {
    window.handleAction('commune');
  } else if (command.includes('contrive') || command.includes('craft') || command.includes('combine')) {
    window.handleAction('contrive');
  } else if (command.includes('hazard') || command.includes('check') || command.includes('roll')) {
    window.handleAction('hazard_check');
  } else if (command === 'status' || command === 'status report') {
    const status = `[STATUS REPORT] Zone: ${gameState.currentZone} | Tokens: ${gameState.timeTokens} | Credits: ${gameState.credits} | Hazard: ${gameState.hazardLevel}/5`;
    addConsoleMessage(status, 'info');
  } else if (command === 'inventory' || command === 'inv') {
    addConsoleMessage('[INVENTORY] See item list above.', 'info');
  } else if (command === 'save') {
    saveGameState();
  } else if (command === 'load') {
    loadGameState();
  } else if (command === 'help') {
    showHelp();
  } else {
    addConsoleMessage(`[COMMAND] "${command}" is not recognized. Type "help" for available commands.`, 'warning');
  }
  
  updateHUD();
};

/**
 * Display help text in console
 */
function showHelp() {
  const helpText = `
[HELP] Available Commands:
  - inspect / examine / look : Examine the current zone
  - commune / talk / speak : Interact with NPCs
  - contrive / craft / combine : Craft items from inventory
  - hazard / check / roll : Test Environmental Perception (DC 13)
  - status / status report : View game status
  - inventory / inv : View your inventory
  - save : Save your game
  - load : Load your last saved game
  - help : Show this help text
  `;
  addConsoleMessage(helpText, 'info');
}

// ============ INVENTORY DISPLAY ============
/**
 * Update the inventory display in the DOM
 */
function updateInventoryList() {
  const inventoryEl = document.getElementById('inventory-list');
  if (!inventoryEl) return;
  
  inventoryEl.innerHTML = '';
  
  if (gameState.inventory.length === 0) {
    inventoryEl.innerHTML = '<p class="text-slate-500 text-xs">Inventory empty.</p>';
    return;
  }

  gameState.inventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'bg-slate-800/50 border border-slate-700 p-3 rounded text-xs';
    const rarityColor = {
      'common': 'text-slate-400',
      'uncommon': 'text-violet-400',
      'rare': 'text-pink-400'
    }[item.rarity] || 'text-slate-300';
    
    div.innerHTML = `
      <p class="font-bold text-pink-300">${item.name}</p>
      <p class="text-slate-500">qty: ${item.qty}</p>
      <p class="text-xs ${rarityColor}">${item.rarity || 'common'}</p>
    `;
    inventoryEl.appendChild(div);
  });
}

// ============ CONSOLE MESSAGING UTILITY ============
/**
 * Add a message to the on-screen console
 * Integrates with index.html's console element
 * @param {string} message - The message text
 * @param {string} type - Message type (system, success, failure, warning, narrative, dialogue, info, error)
 */
function addConsoleMessage(message, type = 'system') {
  const consoleEl = document.getElementById('console');
  if (!consoleEl) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'console-message mt-1';

  // Color coding by type
  const colorMap = {
    'system': 'text-slate-300',
    'success': 'text-green-400',
    'failure': 'text-red-400',
    'warning': 'text-yellow-400',
    'narrative': 'text-cyan-300',
    'dialogue': 'text-pink-300',
    'info': 'text-violet-300',
    'error': 'text-red-600'
  };

  const color = colorMap[type] || 'text-slate-300';
  msgDiv.innerHTML = `<span class="${color}">${message}</span>`;
  consoleEl.appendChild(msgDiv);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

// ============ ZONE CONFIG LOADER ============
/**
 * Load zone configuration from external JSON file
 * @param {string} zoneId - The zone identifier
 */
function loadZoneConfig(zoneId) {
  fetch('data/zones.json')
    .then(res => res.json())
    .then(zones => {
      if (zones[zoneId]) {
        gameState.zoneConfig = zones[zoneId];
        addConsoleMessage(`[SYSTEM] Loaded zone config for ${zoneId}.`, 'info');
        // Optional: dynamically update room description, exits, etc.
      } else {
        addConsoleMessage(`[WARNING] Zone config not found for ${zoneId}.`, 'warning');
      }
    })
    .catch(err => {
      console.error('Zone config load failed:', err);
      addConsoleMessage('[ERROR] Could not load zone configuration.', 'error');
    });
}

// ============ INITIALIZATION ============
/**
 * Initialize the game engine when DOM is ready
 */
window.addEventListener('DOMContentLoaded', () => {
  console.log('[ENGINE] COSINE MUD Box initialization...');
  updateHUD();
  updateInventoryList();
  loadGameState();
  autoSave();
  addConsoleMessage('[SYSTEM] Krebsville Nights COSINE Engine v1.0 initialized.', 'info');
  // Uncomment to load zone config:
  // loadZoneConfig(gameState.currentZone);
});

/**
 * Save game state before page unload
 */
window.addEventListener('beforeunload', () => {
  saveGameState();
});