class GameEngine {
    constructor(scenario) {
        this.scenario = scenario;
        this.currentIndex = 0;
        this.currentBlock = this.getScenarioBlock('start');
        this.isTyping = false;
        this.typingSpeed = 50; // ms per char

        // DOM Elements
        this.speakerEl = document.getElementById('speaker-name');
        this.dialogueEl = document.getElementById('dialogue-text');
        this.charactersContainer = document.getElementById('characters');
        this.choicesContainer = document.getElementById('choices-container');
        this.nextIndicator = document.getElementById('next-indicator');
        this.dialogueBox = document.getElementById('dialogue-box');

        // Audio Context (initialized on user interaction)
        this.audioCtx = null;

        this.init();
    }

    init() {
        this.renderBlock();

        // Advance text on click
        this.dialogueBox.addEventListener('click', () => {
            if (this.isTyping) {
                this.finishTyping();
            } else if (this.currentBlock.choices) {
                // Do nothing, waiting for choice
            } else if (this.currentBlock.next) {
                this.goToBlock(this.currentBlock.next);
            }
        });

        // Initialize audio on first click
        document.body.addEventListener('click', () => {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });

        this.initEvidenceSystem();
    }

    getScenarioBlock(id) {
        return this.scenario.find(b => b.id === id);
    }

    goToBlock(id) {
        this.currentBlock = this.getScenarioBlock(id);
        if (this.currentBlock) {
            this.renderBlock();
        } else {
            console.error('Block not found:', id);
        }
    }

    renderBlock() {
        // Clear previous state
        this.choicesContainer.innerHTML = '';
        this.choicesContainer.classList.add('hidden');
        this.nextIndicator.style.display = 'none';

        // Update Character
        this.updateCharacter(this.currentBlock.character);

        // Update Speaker
        this.speakerEl.textContent = this.currentBlock.speaker;

        // Start Typing Text
        if (this.currentBlock.cutIn) {
            this.showCutIn(this.currentBlock.cutIn, () => {
                this.typeText(this.currentBlock.text);
            });
        } else {
            this.typeText(this.currentBlock.text);
        }
    }

    updateCharacter(characterName) {
        // Clear existing characters
        this.charactersContainer.innerHTML = '';

        if (!characterName) return;

        const img = document.createElement('img');
        img.src = `assets/images/${characterName}.png`;
        img.className = 'character active';
        img.dataset.role = characterName;
        this.charactersContainer.appendChild(img);
    }

    typeText(text) {
        this.isTyping = true;
        this.dialogueEl.textContent = '';
        let i = 0;

        const interval = setInterval(() => {
            this.dialogueEl.textContent += text.charAt(i);
            this.playBlip();
            i++;

            if (i >= text.length) {
                clearInterval(interval);
                this.isTyping = false;
                this.onTypingFinished();
            }
        }, this.typingSpeed);

        this.typingInterval = interval;
    }

    finishTyping() {
        clearInterval(this.typingInterval);
        this.dialogueEl.textContent = this.currentBlock.text;
        this.isTyping = false;
        this.onTypingFinished();
    }

    onTypingFinished() {
        if (this.currentBlock.choices) {
            this.showChoices(this.currentBlock.choices);
        } else if (this.currentBlock.next) {
            this.nextIndicator.style.display = 'block';
        }
    }

    showChoices(choices) {
        this.choicesContainer.classList.remove('hidden');
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = (e) => {
                e.stopPropagation(); // Prevent dialogue box click
                this.goToBlock(choice.next);
            };
            this.choicesContainer.appendChild(btn);
        });
    }

    playBlip() {
        if (!this.audioCtx) return;

        // Simple synth blip
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(220 + Math.random() * 50, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
    }

    playObjectionSound() {
        if (!this.audioCtx) return;

        // Dramatic "Objection!" sound (Synth)
        const t = this.audioCtx.currentTime;

        // Low impact
        const osc1 = this.audioCtx.createOscillator();
        const gain1 = this.audioCtx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(150, t);
        osc1.frequency.exponentialRampToValueAtTime(50, t + 0.3);
        gain1.gain.setValueAtTime(0.5, t);
        gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
        osc1.connect(gain1);
        gain1.connect(this.audioCtx.destination);
        osc1.start(t);
        osc1.stop(t + 0.3);

        // High screech
        const osc2 = this.audioCtx.createOscillator();
        const gain2 = this.audioCtx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(800, t);
        osc2.frequency.exponentialRampToValueAtTime(400, t + 0.2);
        gain2.gain.setValueAtTime(0.3, t);
        gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        osc2.connect(gain2);
        gain2.connect(this.audioCtx.destination);
        osc2.start(t);
        osc2.stop(t + 0.2);
    }

    showCutIn(type, callback) {
        const overlay = document.getElementById('cut-in-overlay');
        const img = document.getElementById('cut-in-image');
        const img2 = document.getElementById('defense-objection');

        // Set image source based on type if we had multiple
        // img.src = `assets/images/${type}.png`;

        const clickSound = new Audio('assets/audio/objection-voice.mp3');
        clickSound.play();

        overlay.classList.add('active');

        setTimeout(() => {
            overlay.classList.remove('active');
            if (callback) callback();
        }, 1000); // Show for 1 second
    }

    // --- Evidence System ---

    initEvidenceSystem() {
        this.evidenceBtn = document.getElementById('evidence-btn');
        this.evidenceModal = document.getElementById('evidence-modal');
        this.closeEvidenceBtn = document.getElementById('close-evidence');
        this.evidenceListEl = document.getElementById('evidence-list');
        this.detailNameEl = document.getElementById('detail-name');
        this.detailDescEl = document.getElementById('detail-desc');

        if (!this.evidenceBtn || !this.evidenceModal) {
            console.warn('Evidence UI elements not found');
            return;
        }

        this.evidenceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.playBlip(); // Play sound
            this.toggleEvidence(true);
        });

        this.closeEvidenceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleEvidence(false);
        });

        // Prevent clicks inside modal from advancing text
        this.evidenceModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    toggleEvidence(show) {
        if (show) {
            this.evidenceModal.classList.remove('hidden');
            this.renderEvidenceList();
        } else {
            this.evidenceModal.classList.add('hidden');
        }
    }

    renderEvidenceList() {
        this.evidenceListEl.innerHTML = '';
        // Ensure evidenceList exists (it should be in scenario.js)
        if (typeof evidenceList === 'undefined') {
            console.error('evidenceList is not defined');
            return;
        }

        evidenceList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.onclick = () => this.showEvidenceDetail(item, li);
            this.evidenceListEl.appendChild(li);
        });
    }

    showEvidenceDetail(item, liElement) {
        // Highlight selected
        const allLi = this.evidenceListEl.querySelectorAll('li');
        allLi.forEach(el => el.classList.remove('selected'));
        liElement.classList.add('selected');

        // Show details
        this.detailNameEl.textContent = item.name;
        this.detailDescEl.textContent = item.description;
    }
}

// Start Game
window.onload = () => {
    const game = new GameEngine(scenario);
};
