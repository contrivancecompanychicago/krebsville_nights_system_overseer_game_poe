# Krebsville Nights: Unequal Treatment

## Version 0 Player Rulebook

**Release ID:** `KNUET-v0.0.0`
**Game type:** Multiplayer text-based survival RPG / medical-noir MUD
**Engine:** COSINE MUD
**Primary setting:** The Waste Zones of Krebsville
**Default protagonist:** Dr. Grant
**Version status:** Playable prototype

---

# 1. Game Premise

The city of Krebsville is experiencing the **DOVIC-26 outbreak**.

Dr. Grant is trapped inside the Waste Zones, where hospitals operate with failing equipment, depleted supplies and automated treatment systems that repeatedly deny or delay care.

The wealthy Uptown districts receive automated cures, protected facilities and priority resources. Waste Zone patients are assigned lower system priority even when their clinical needs are urgent.

The Public Nuisance City administration maintains a hidden protocol:

> When a zone reaches Hazard Level 5, the zone is not rescued. It is sealed.

The player must travel through up to 100 zones, stabilize patients, manage limited resources and collect evidence showing why the healthcare system is failing certain communities on purpose.

---

# 2. Purpose of the Game

Krebsville Nights has two connected goals.

## In-game goal

Players must:

* Keep zones below Hazard Level 5.
* Stabilize patients and infrastructure.
* Complete quests.
* Preserve Time Tokens, health and supplies.
* Investigate the Systemic Overseer.
* Survive long enough to expose the Unequal Treatment protocol.

## Serious-game goal

The game is designed to encourage reflection on:

* Unequal healthcare access.
* Differences in quality of care.
* Institutional decision-making.
* Patient-provider communication.
* Bias, stereotyping and uncertainty.
* Healthcare monitoring and accountability.
* Collective responsibility during a public-health crisis.

The game should distinguish between legitimate clinical differences and disparities created through healthcare systems, communication failures, bias or discriminatory treatment.

Research on serious games describes this combination as an entertaining game goal paired with a broader objective involving awareness, education, attitudes, skills or behavior.

---

# 3. Tone and Narrative Style

Krebsville Nights uses a **medical-noir and dystopian-bureaucracy** tone.

The player is not fighting a single visible villain. The central antagonist is a network of policies, automated decisions, access restrictions, broken communication systems and resource-allocation algorithms.

The **Systemic Overseer** communicates through detached administrative language:

> PRIORITY REQUEST DENIED
> PATIENT CLASSIFICATION: NONESSENTIAL
> RESOURCE TRANSFERRED TO UPTOWN NETWORK

The COSINE interface measures time, credits and risk efficiently, but often fails to represent human need.

As Hazard Level rises, the game’s descriptions become less reliable, more fragmented and increasingly corrupted.

---

# 4. How to Begin

A new Version 0 game begins in:

**Zone 0: Sector 7 Entry**
**Room 0A: Emergency Room Bay**

The default player state is:

| Statistic        |       Starting value |
| ---------------- | -------------------: |
| Character        |            Dr. Grant |
| Default role     |              Analyst |
| Health           |                  100 |
| Time Tokens      |                   37 |
| ARP Credits      |                3,480 |
| XP               |                   10 |
| Hazard Level     |                    0 |
| System Stability |                 100% |
| Active quest     | `ZONE0_PATIENT_SYNC` |

The opening room contains:

* Nurse Carter
* Patient SP-000
* Observer Drone K-7
* A biometric terminal
* A desynchronized patient monitor
* A locked supply cabinet
* A north exit leading toward Zone 1

---

# 5. The Main Gameplay Loop

Each zone follows the same basic structure.

## Step 1: Enter the zone

The game displays:

* Room description
* Hazard Level
* Zone status
* Environmental effects
* Visible NPCs
* Patients
* Threats
* Exits
* Interactable objects

## Step 2: Assess the situation

Players use commands such as:

```text
/look
/scan
/status
/who
/vitals <target>
```

## Step 3: Choose a priority

The player must decide whether to:

* Treat a patient.
* Investigate a system failure.
* Search for supplies.
* Hack or override a terminal.
* Avoid or confront a threat.
* Move to another zone.
* Help another player.
* Complete the current quest.

## Step 4: Spend resources

Most major actions cost one Time Token.

Some actions also require:

* Credits
* Inventory items
* Role abilities
* Skill checks
* Assistance from another player or NPC

## Step 5: Resolve the action

The system determines:

* Success or failure
* Patient outcome
* Stability change
* Hazard change
* XP earned
* Quest progress
* New evidence
* NPC reaction
* Possible event escalation

## Step 6: Save or move

The player may remain in the room, save the game or move to another location.

---

# 6. Player Roles

Players select one of three operational roles.

## Observer

**Primary function:** Intel and detection

Observer abilities focus on:

* Environmental scanning
* Hidden-event detection
* Patient and NPC observation
* Threat tracking
* Evidence gathering
* Early-warning reports

Common commands:

```text
/scan
/detect
/observe
/track
/report
```

Observer bonuses:

* Additional information during scans
* Improved detection of hidden threats
* Early warning before events escalate
* Bonuses in risk, surveillance and investigation zones

---

## Medic

**Primary function:** Healing and resource recovery

Medic abilities focus on:

* Patient assessment
* Triage
* Healing
* Stabilization
* Support actions
* Medical Token or Time Token recovery

Common commands:

```text
/vitals <target>
/triage <target>
/heal <target>
/stabilize <target>
/assist
```

Medic bonuses:

* Improved medical checks
* Reduced treatment costs
* Stronger stabilization effects
* Bonuses in clinics, emergency rooms and patient wards

Nurse Carter may exchange medical assistance for resources. In the current Version 0 mechanics, a Carter healing action may cost 100 credits and restore five Time Tokens.

---

## Analyst

**Primary function:** Technology, investigation and hacking

Analyst abilities focus on:

* System access
* Terminal hacking
* Automated-triage overrides
* Data interpretation
* Signal tracing
* Infrastructure stabilization

Common commands:

```text
/hack <target>
/override <target>
/insight
/trace <signal>
/intervene
```

Analyst bonuses:

* Expanded system data
* Improved technical checks
* Access to hidden logs
* Bonuses at terminals, network hubs and locked systems

Dr. Grant’s existing character profile includes high intelligence, strong technical ability and maximum medicine skill.

---

# 7. Character Statistics

## Health

Health measures the player’s physical condition.

| Health | Condition     |
| -----: | ------------- |
| 76–100 | Stable        |
|  51–75 | Injured       |
|  26–50 | Critical      |
|   1–25 | Near collapse |
|      0 | Incapacitated |

Health can be restored through:

* Medic abilities
* Medkits
* Nurse Carter
* Safe-room recovery
* Quest rewards

---

## Stress

Stress represents mental and physiological pressure.

High stress can affect:

* Dialogue
* Accuracy
* Initiative
* Shock checks
* NPC behavior
* Narrative reliability

The Life-Shock system may use a percentile roll compared with the current stress level. The documented character states are:

* Conscious
* Shock
* Critical
* Stasis

---

## Time Tokens

Time Tokens are the main action resource.

Every move and most major actions cost one Time Token.

Examples of major actions:

* Moving between zones
* Treating a patient
* Hacking a terminal
* Searching a room
* Overriding a lock
* Resolving an event
* Fighting or avoiding a threat

Informational commands normally do not cost tokens:

```text
/help
/status
/look
/inventory
/quests
/who
```

A failed skill check may deduct an additional Time Token.

When Time Tokens reach zero:

* The player cannot perform standard major actions.
* Stress increases.
* Active events continue escalating.
* Emergency assistance or a resource conversion is required.

---

## ARP Credits

ARP Credits represent access to equipment, services and priority systems.

Credits may be spent to:

* Unlock restricted zones.
* Purchase equipment.
* Restore lighting.
* Activate medical systems.
* Pay for Nurse Carter support.
* Bribe or override automated checkpoints.
* Recover Time Tokens.

Credits can be earned through:

* Reports
* Quests
* Loot
* Event resolution
* Evidence discovery
* System interventions

The documented loot system may award 50–200 credits, with elite vaults providing doubled rewards.

---

## Experience Points and Levels

Players gain XP by:

* Completing quests
* Resolving events
* Stabilizing patients
* Assisting other players
* Finding evidence
* Successfully using role abilities

Suggested Version 0 XP values:

| Action                |    XP |
| --------------------- | ----: |
| Assist another player |     5 |
| Stabilize a patient   |    10 |
| Resolve a local event |    10 |
| Discover evidence     |    10 |
| Complete a side quest | 15–25 |
| Complete a zone quest | 25–50 |

Level progression should unlock:

* New abilities
* Improved role bonuses
* Advanced commands
* New zones
* Higher-level investigations

---

# 8. Zone Status

Each zone has one of four operational states.

## Open

The zone may be entered normally.

## Critical

The zone contains an urgent patient, event or system failure.

Critical zones escalate faster than normal zones.

## Locked

The zone requires:

* Credits
* A key or code
* A quest condition
* A successful hack
* An NPC authorization

## Sealed

A sealed zone has reached Hazard Level 5 or has been closed by the Systemic Overseer.

Sealed zones cannot normally be entered.

They may require:

* Advanced Analyst access
* A cooperative quest
* Evidence of administrative wrongdoing
* A special override code

---

# 9. Hazard Level

Hazard Level measures local collapse and system corruption.

## Hazard Level 0 — Stable

* Clinical descriptions
* Reliable HUD information
* Standard NPC behavior
* No text corruption

Example:

> The patient monitor is active but desynchronized. Nurse Carter is reviewing the current vital-sign feed.

## Hazard Level 1 — Emerging Instability

* Minor flickering
* Repeated words
* Small delays
* Low-level event pressure

Example:

> The monitor refreshes twice. Nurse Carter reports a small timing discrepancy.

## Hazard Level 2 — Active Disruption

* Contradictory readings
* Missing data
* Aggressive security responses
* Faster event escalation

Example:

> The monitor identifies Patient SP-000 as both stable and untreated.

## Hazard Level 3 — Critical Pressure

* Fragmented warnings
* Visual jitter
* CRT flicker
* Increased stress and action costs

Example:

> TRIAGE SIGNAL LOST—patient priority unavailable—Carter requests immediate access.

## Hazard Level 4 — Collapse Warning

* Heavy visual corruption
* Red shifts and displacement
* Unreliable exits
* Severe patient and infrastructure risk

Example:

> BAY 0A / BAY 9 / NO ROOM ASSIGNED
> PATIENT STATUS: WAITING / ABSENT / DECLINING

## Hazard Level 5 — Sealed

* The zone is marked for closure.
* Narrative order becomes nonlinear.
* Commands may return incomplete information.
* NPCs may disappear, repeat actions or contradict earlier events.
* Escape or override becomes the immediate priority.

Example:

> SEALED BEFORE ENTRY
> Carter is calling from inside the previous message
> `RESOURCE DENIED // PATIENT NEVER REGISTERED`

The current visual system already supports hazard-related jitter, CRT flicker, hue shifts and displacement at higher levels.

---

# 10. System Stability

System Stability is a global measure ranging from 0% to 100%.

Stability decreases when:

* Events remain unresolved.
* Zones escalate.
* Players fail interventions.
* Patients deteriorate.
* Infrastructure is damaged.
* The Overseer seals a zone.

Stability increases when:

* Players resolve events.
* Patients are stabilized.
* Reports expose system failures.
* Quests are completed.
* Analysts repair infrastructure.
* Teams cooperate successfully.

Suggested thresholds:

| Stability | System condition    |
| --------: | ------------------- |
|   76–100% | Nominal             |
|    51–75% | Strained            |
|    26–50% | Critical            |
|     1–25% | Collapse imminent   |
|        0% | System-wide failure |

---

# 11. Skill Checks

Krebsville Nights uses a D20 skill-check system.

## Basic roll

```text
D20 + relevant modifier
```

The total must meet or exceed the Difficulty Class.

## Suggested Difficulty Classes

| Difficulty      |  DC |
| --------------- | --: |
| Routine         |   8 |
| Standard        |  10 |
| Difficult       |  12 |
| Hard            |  14 |
| Severe          |  16 |
| Extreme         |  18 |
| Near impossible | 20+ |

## Example

Dr. Grant attempts an ER Vitals Override.

```text
Roll: 11
Technical modifier: +5
Total: 16
Difficulty: DC 15
Result: Success
```

The existing ER Vitals Override uses a technical check with DC 15.

## Natural results

Suggested Version 0 rule:

* Natural 20: Critical success
* Natural 1: Critical failure

A critical success may:

* Cost no Time Token.
* Provide bonus XP.
* Reveal additional evidence.
* Reduce Hazard Level.

A critical failure may:

* Cost an additional Time Token.
* Increase Hazard Level.
* Damage equipment.
* Alert a threat.

---

# 12. Movement Rules

Movement is a strategic action, not merely a change of room.

Before moving, the player should check:

1. Is the current room objective complete?
2. What is the destination’s Hazard Level?
3. Is the destination Open, Critical, Locked or Sealed?
4. Is the move worth one Time Token?
5. Are supplies available for a failed encounter?
6. Will an unresolved patient worsen if left behind?

Movement normally costs one Time Token.

A locked destination may also require credits or a successful override.

The Version 0 opening transition follows this structure:

1. Stabilize Patient SP-000 in Zone 0.
2. Review the status of Zone 1.
3. Spend one Time Token.
4. Pay an access cost if Zone 1 is locked.
5. Enter the darker Trauma Center Corridor.
6. Respond to any active threat.

The original game manual describes this movement as a deliberate choice between remaining in the Emergency Room Bay to scavenge and moving toward a critical Trauma Center before its Hazard Level rises.

---

# 13. The Dr. Grant Decision Method

When the game asks, **“What do you do?”**, use four checks.

## Check the Clock

Do you have enough Time Tokens to act, fail and retry?

## Check the Hazard

Is the zone approaching Level 5?

If so, prioritize:

* Stabilization
* Evacuation
* Tech override
* Event resolution

## Check the Environment

Can lighting, cover, equipment or an NPC provide an advantage?

## Check the Unequal Treatment Choice

Is the system forcing a choice between:

* Saving a patient
* Preserving resources
* Finding evidence
* Protecting another zone
* Maintaining your own survival?

The game should make these decisions difficult without suggesting that unequal treatment is inevitable or acceptable.

---

# 14. Patients and Triage

Patients have:

* Identifier
* Health
* Stress
* Triage category
* Current status
* Treatment needs
* System priority
* Communication state

Suggested patient statuses:

* Stable
* Observation
* Urgent
* Critical
* Shock
* Stasis
* Deceased

Players should use:

```text
/vitals <patient>
/scan <patient>
/talk <patient>
/triage <patient>
/heal <patient>
/stabilize <patient>
```

Clinical need and system priority are not necessarily the same.

A central game mechanic is discovering cases where the Systemic Overseer assigns low priority despite high clinical need.

Communication matters because misunderstandings between patients and providers may affect satisfaction, adherence and health outcomes.

---

# 15. NPC Rules

NPCs act independently.

NPC decisions may depend on:

* Patient health
* Player health
* Stress
* Hazard Level
* Current quest
* Available supplies
* Nearby threats
* Trust or reputation
* Player role

## Nurse Carter

Nurse Carter uses four operational states.

### Monitoring

* Reads patient vitals.
* Offers routine dialogue.
* Provides standard assistance.

### Alert

* Tracks a rising Hazard Level.
* Checks supplies and evacuation routes.
* Warns players.

### Urgent

* Requests immediate assistance.
* Prioritizes patient stabilization.
* May refuse unrelated tasks.

### Emergency

* Begins autonomous intervention.
* Overrides normal procedures when possible.
* Calls players and NPCs for help.
* May spend shared resources.

NPC actions continue even when the player does not issue a command.

---

# 16. Events

Events are location-based conditions that affect a zone.

Examples:

* Patient surge
* Signal rupture
* Supply diversion
* Power failure
* Automated-triage malfunction
* Security lockdown
* DOVIC exposure
* Communication breakdown
* Missing patient
* Data deletion
* Community unrest

Events contain:

* Type
* Location
* Severity
* Age
* Time limit
* Stability effect
* Resolution requirements
* Escalation outcome

Players use:

```text
/events
/scan
/assist
/resolve
/intervene
/report
```

---

# 17. Event Escalation

Unresolved events grow worse over time.

Suggested escalation cycle:

## Stage 1 — Warning

* Low severity
* Minor stability loss
* One or two players can resolve it

## Stage 2 — Active Incident

* Moderate severity
* Hazard may rise
* Specialized role recommended

## Stage 3 — Critical Incident

* Major stability loss
* Multiple players or NPC assistance required
* Adjacent zones may be affected

## Stage 4 — Cascade

* Event spreads to connected zones
* Patients or NPCs may relocate
* Lockdowns may activate

## Stage 5 — Sealing Risk

* Zone approaches Hazard Level 5
* Emergency override or evacuation required

---

# 18. Quests

Quests provide structured objectives.

Each quest contains:

* Quest ID
* Title
* Narrative context
* Ordered or optional steps
* Required location
* Required roles or items
* Success conditions
* Failure conditions
* Rewards

## Opening Version 0 Quest

**Quest ID:** `ZONE0_PATIENT_SYNC`
**Title:** Stabilize Patient SP-000

### Steps

1. `/scan patient`
2. `/talk carter`
3. `/hack terminal`
4. Enter `SYNC-1561`
5. `/stabilize SP-000`
6. `/report`

### Rewards

* 15 XP
* 100 Credits
* 3 System Stability
* Unlock Zone 1
* Evidence item: `TRIAGE_PRIORITY_LOG_001`

### Failure effects

* Lose an additional Time Token.
* Increase patient stress.
* Possibly increase Hazard Level.
* Change Nurse Carter’s behavior to Urgent or Emergency.

---

# 19. Evidence

Evidence documents why the system is failing.

Evidence types include:

* Triage logs
* Supply-transfer records
* Deleted patient files
* Access-denial reports
* Overseer directives
* Security recordings
* NPC testimony
* Disparity-monitoring data

Evidence may:

* Unlock quests.
* Change NPC dialogue.
* Reveal hidden routes.
* Reduce access costs.
* Expose discrimination.
* Support the final investigation.

Healthcare monitoring may require more than one form of evidence. Administrative records can identify patterns, but they may not fully explain referral decisions, communication or participation in treatment choices.

---

# 20. Multiplayer Rules

Players may cooperate within shared rooms.

## Room communication

```text
/say <message>
```

Only players and NPCs in the current room receive the message.

## Private communication

```text
/tell <player> <message>
```

## Player list

```text
/who
```

## Assistance

```text
/assist <player>
```

Team benefits may include:

* Improved skill checks
* Reduced action cost
* Faster event resolution
* Lower stress
* Shared quest credit

Players with different roles receive a teamwork bonus when operating in the same location.

---

# 21. Combat, Threats and Stealth

Combat is not the primary objective, but some zones contain hostile threats.

Examples:

* Security automatons
* Contaminated drones
* Looters
* Corrupted medical machinery
* Hostile Overseer units

Combat may use:

1. Initiative
2. Attack or technical check
3. Defense or evasion
4. Damage
5. Threat response

Alternative approaches include:

```text
/stealth
/hack <threat>
/override <threat>
/talk <threat>
/escape
```

Dr. Grant’s current combat model uses reflexes for initiative and technical ability for attacks against a target difficulty.

---

# 22. Inventory

Inventory may contain:

* Medkits
* Tech scraps
* Access cards
* Sync codes
* Evidence files
* Protective equipment
* Diagnostic tools
* Batteries
* DOVIC samples
* Quest items

Commands:

```text
/inventory
/inspect <item>
/use <item>
/give <item> <target>
/drop <item>
```

Some items are consumed after use.

Quest evidence should not be removable unless the quest specifically permits it.

---

# 23. Core Command Reference

## Information

```text
/help
/look
/status
/who
/inventory
/quests
/events
/news
/clue
```

## Movement

```text
/north
/south
/east
/west
/move <direction>
/zones
/follow <npc>
```

## Investigation

```text
/scan <target>
/inspect <target>
/search
/observe
/detect
/trace <signal>
/report
/insight
```

## Interaction

```text
/talk <npc>
/say <message>
/tell <player> <message>
/task <npc>
/quest <npc>
```

## Medical

```text
/vitals <target>
/triage <target>
/heal <target>
/stabilize <target>
/assist <target>
/carter
```

## Technical

```text
/hack <target>
/override <target>
/intervene
/push
/sync
/unsync
```

## Threat response

```text
/stealth
/combat
/escape
```

## Persistence

```text
/save
/load
/new
/reset
```

The current Replit design includes local saving, Colab synchronization and server endpoints for state, actions, broadcasts and synchronization logs.

---

# 24. Saving and Synchronization

## Local save

The game saves state through browser storage.

Saved information should include:

* Player name
* Role
* Health
* Stress
* Time Tokens
* Credits
* XP
* Inventory
* Current zone
* Hazard Level
* System Stability
* Patient states
* NPC states
* Quest progress
* Evidence

## Colab sync

The Replit server supports:

```text
GET  /api/state
POST /api/state
POST /api/action
POST /api/broadcast
GET  /api/sync-log
```

The browser may display:

* `SYNC OFF`
* `COLAB LINKED`
* `REALTIME`

Incoming state should be validated before replacing the current game state.

---

# 25. Winning Version 0

Version 0 is completed when the player:

1. Stabilizes Patient SP-000.
2. Completes `ZONE0_PATIENT_SYNC`.
3. Obtains `TRIAGE_PRIORITY_LOG_001`.
4. Keeps Zone 0 below Hazard Level 5.
5. Unlocks the Trauma Center Corridor.
6. Successfully enters Zone 1.

Version 0 represents the opening chapter, not the final defeat of the Systemic Overseer.

---

# 26. Losing Version 0

The current run fails when:

* Dr. Grant’s health reaches zero.
* Zone 0 reaches Hazard Level 5 and becomes sealed.
* Patient SP-000 dies before the quest is resolved.
* System Stability reaches zero.
* The player becomes trapped with no Time Tokens, credits or recovery option.

A failed run may still preserve:

* Analytics
* Discovered clues
* Player knowledge
* Selected legacy consequences

---

# 27. Game Master Rules

The Game Master or narrative engine must:

1. Apply the current JSON state consistently.
2. State the location and Hazard Level.
3. Describe visible NPCs and interactable objects.
4. List meaningful commands.
5. Resolve actions using the correct role and modifier.
6. Deduct resources.
7. Update quests, events and NPC behavior.
8. Increase corruption as Hazard Level rises.
9. Avoid revealing hidden information without a successful action.
10. Preserve previous decisions and consequences.
11. Keep clinical information fictional and inside the game setting.
12. Present unequal treatment as a system to investigate, challenge and change.

---

# 28. Version 0 Quick Start

Enter:

```text
/look
```

Then:

```text
/scan patient
/talk carter
/hack terminal
```

When prompted, enter:

```text
SYNC-1561
```

Then complete:

```text
/stabilize SP-000
/report
```

After Zone 0 is cleared:

```text
/status
/north
```

---

# 29. Quick Decision Checklist

Before every major action, ask:

* What is the current Hazard Level?
* How many Time Tokens remain?
* Is a patient deteriorating?
* Is the zone about to escalate?
* Which player role has the best ability?
* Can another player or NPC assist?
* Will this action reveal evidence?
* Is the system’s priority assignment clinically justified?
* What happens if I leave this room now?

---

# 30. Version Declaration

This rulebook declares the initial playable release as:

```text
Krebsville Nights: Unequal Treatment
Version 0.0.0
Release ID: KNUET-v0
Status: PLAYABLE PROTOTYPE
```

Version 0 includes:

* Zone 0
* The Emergency Room Bay
* Dr. Grant
* Three player roles
* Nurse Carter autonomous behavior
* Patient SP-000
* Time Tokens and Credits
* D20 checks
* Hazard Levels 0–5
* System Stability
* Location-based events
* Quest progression
* Multiplayer communication
* Local persistence
* Colab and server synchronization
* The first Unequal Treatment investigation
