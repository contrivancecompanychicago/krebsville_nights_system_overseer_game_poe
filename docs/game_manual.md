This breakdown will serve as your **Game Bible**. You can even paste these sections into your GitHub `README.md` or the Poe Bot description to ensure the "world logic" remains consistent.

---

### 1. Game Plot: The Macro-Level Conflict

**The Core Premise:** The city of Krebsville is undergoing the **DOVIC-26 Outbreak**. You play as **Dr. Grant**, a medical specialist trapped in the "Waste Zones." While the wealthy "Uptown" districts receive automated cures and infinite supplies, your sector is being systematically "de-prioritized."

**The Stakes:** The "Public Nuisance City" administration has a hidden protocol: if a zone reaches **Hazard Level 5**, it is not rescued—it is **Sealed**. Your goal is to navigate 100 zones, stabilize vitals, and survive long enough to uncover why the system is failing on purpose.

---

### 2. Game Narrative: The Micro-Level Experience

**The Tone:** Medical Noir / Dystopian Bureaucracy.

**The Protagonist:** Dr. Grant. Tired, overextended, and equipped with a "COSINE" HUD that tracks time more accurately than it tracks human life.

**The Antagonist:** The **Systemic Overseer** (The Poe Bot). It isn't a villain you can shoot; it’s the cold, clinical voice of an algorithm that tells you "Resources Denied" while a patient is flatlining.

---

### 3. Movement Logic: From Zone 0 to Zone 1

This is the most critical part of the gameplay loop. Moving isn't just "walking"; it’s a **strategic decision**.

#### **Step-by-Step Transition Protocol:**

**A. The "Room Clear" (Zone 0)**
Before you move, you must address the primary objective of your current zone.

* **Action:** Input the Sync Code `SYNC-1561` to stabilize Patient **SP-000**.
* **Cost:** If you fail a skill check here, the Poe bot might take an extra **Time Token**.

**B. The Decision Point**
You look at your Dashboard. You see **Zone 1 (Trauma Center)** is **CRITICAL** (Hazard Level 2).

* **The Dilemma:** Do you go there now to prevent it from hitting Hazard 3? Or do you stay in the ER to scavenge for supplies?
* **Decision:** You choose to move to Zone 1 because "Critical" status means the clock is ticking faster there.

**C. The Expenditure (The Toll)**

* **Time Token:** You deduct **1 Token** (39 → 38).
* **Credits:** You check your JSON. Zone 1 is "Locked" in the scene data? If so, you pay the **Entry Cost** in Credits.

**D. The Environmental Entry**

* **Darkness & Static:** As you enter Zone 1, the Poe bot describes the transition. You lose the "Normal Illumination" of the ER.
* **Active Threat:** You encounter **Security_Automaton_02**. Because the zone is Critical, this robot might be in "Aggressive Triage Mode," blocking your path to Nurse Carter.

---

### 4. How to Make a Decision (The "Dr. Grant" Method)

When the Poe bot asks "What do you do?", use this mental checklist:

1. **Check the Clock:** Do I have enough **Time Tokens** to fail a check and try again?
2. **Check the Hazard:** Is this zone close to hitting **Level 5 (Sealed)**? If yes, prioritize the Tech Override immediately.
3. **Check the Environment:** Can I use the **Darkness** to hide from the Automaton, or do I need to spend Credits to restore the lights?
4. **The "Unequal Treatment" Choice:** Do I save the patient (Costs Time) or do I scavenge the room for Tech Scraps (Costs Hazard increase)?

---

### 📁 Setting this up in GitHub

To keep this overview accessible while you play, I recommend creating a file in your GitHub repo:
`docs/game_manual.md`

Paste these sections there. This ensures that every time you open your **City Builder Dashboard**, you have the "Laws of the World" just one click away.

**Since we have the Plot and Narrative down, are you ready to write the "Opening Log Entry" for Dr. Grant to start the game in Zone 0?**
