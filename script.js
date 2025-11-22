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

        // Log System
        this.logBtn = document.getElementById('log-btn');
        this.logModal = document.getElementById('log-modal');
        this.logList = document.getElementById('log-list');
        this.closeLogBtn = document.getElementById('close-log');
        this.logHistory = [];

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

        // Log Event Listeners
        if (this.logBtn) {
            this.logBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.renderLog();
                this.toggleLog(true);
            });
        }

        if (this.closeLogBtn) {
            this.closeLogBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLog(false);
            });
        }

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
        // Add to log history
        if (this.currentBlock) {
            this.logHistory.push({
                speaker: this.currentBlock.speaker,
                text: this.currentBlock.text
            });
            if (this.logHistory.length > 30) {
                this.logHistory.shift();
            }
        }

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
                if (choice.action === 'present_evidence') {
                    this.startEvidenceSelection();
                } else {
                    this.goToBlock(choice.next);
                }
            };
            this.choicesContainer.appendChild(btn);
        });
    }

    startEvidenceSelection() {
        // Hide choices temporarily
        this.choicesContainer.classList.add('hidden');
        // Open evidence modal in selection mode
        this.toggleEvidence(true, true);
    }

    toggleEvidence(show, isSelectionMode = false) {
        this.isEvidenceSelectionMode = isSelectionMode;

        if (show) {
            this.evidenceModal.classList.remove('hidden');
            this.renderEvidenceList();

            // Add visual cue for selection mode
            if (isSelectionMode) {
                this.evidenceModal.classList.add('selection-mode');
                // Add a "Present" button if not exists
                if (!document.getElementById('present-btn')) {
                    const presentBtn = document.createElement('button');
                    presentBtn.id = 'present-btn';
                    presentBtn.textContent = 'つきつける';
                    presentBtn.className = 'choice-btn';
                    presentBtn.style.marginTop = '20px';
                    presentBtn.style.width = '100%';
                    presentBtn.onclick = (e) => {
                        e.stopPropagation();
                        this.presentSelectedEvidence();
                    };
                    document.getElementById('evidence-detail').appendChild(presentBtn);
                }
            } else {
                this.evidenceModal.classList.remove('selection-mode');
                const presentBtn = document.getElementById('present-btn');
                if (presentBtn) presentBtn.remove();
            }
        } else {
            this.evidenceModal.classList.add('hidden');
            this.evidenceModal.classList.remove('selection-mode');
            const presentBtn = document.getElementById('present-btn');
            if (presentBtn) presentBtn.remove();

            // If we were in selection mode and cancelled (closed), show choices again
            if (this.isEvidenceSelectionMode) {
                this.choicesContainer.classList.remove('hidden');
                this.isEvidenceSelectionMode = false;
            }
        }
    }

    presentSelectedEvidence() {
        const selectedItem = this.selectedEvidenceItem;
        if (!selectedItem) {
            alert('証拠品を選んでください');
            return;
        }

        // Check if correct
        const correctId = this.currentBlock.correctEvidence;

        if (selectedItem.id === correctId) {
            // Correct!
            this.toggleEvidence(false); // Close modal
            this.playObjectionSound();
            this.showCutIn('objection', () => {
                this.goToBlock(this.currentBlock.successNext);
            });
        } else {
            // Incorrect
            this.toggleEvidence(false); // Close modal
            // Go to failure route
            this.goToBlock(this.currentBlock.failureNext);
        }
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
    }

    showCutIn(type, callback) {
        const overlay = document.getElementById('cut-in-overlay');

        // Reset animations
        overlay.classList.remove('active');

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
        this.detailImageEl = document.getElementById('detail-image');

        if (!this.evidenceBtn || !this.evidenceModal) {
            console.warn('Evidence UI elements not found');
            return;
        }

        this.evidenceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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

    renderEvidenceList() {
        this.evidenceListEl.innerHTML = '';
        // Ensure evidenceList exists (it should be in scenario.js)
        if (typeof evidenceList === 'undefined') {
            console.error('evidenceList is not defined');
            return;
        }

        evidenceList.forEach(item => {
            const li = document.createElement('li');

            // Create Image
            if (item.image) {
                const img = document.createElement('img');
                img.src = `assets/images/${item.image}`;
                img.className = 'evidence-icon';
                li.appendChild(img);
            }

            // Create Text Span
            const span = document.createElement('span');
            span.textContent = item.name;
            li.appendChild(span);

            li.onclick = () => this.showEvidenceDetail(item, li);
            this.evidenceListEl.appendChild(li);
        });
    }

    showEvidenceDetail(item, liElement) {
        // Highlight selected
        const allLi = this.evidenceListEl.querySelectorAll('li');
        allLi.forEach(el => el.classList.remove('selected'));
        liElement.classList.add('selected');

        this.selectedEvidenceItem = item; // Store selected item

        // Show details
        this.detailNameEl.textContent = item.name;
        this.detailDescEl.textContent = item.description;

        if (item.image) {
            this.detailImageEl.src = `assets/images/${item.image}`;
            this.detailImageEl.classList.remove('hidden');
        } else {
            this.detailImageEl.classList.add('hidden');
        }
    }

    // --- Log System ---

    renderLog() {
        this.logList.innerHTML = '';
        this.logHistory.forEach(entry => {
            const li = document.createElement('li');
            li.className = 'log-entry';

            const speakerDiv = document.createElement('div');
            speakerDiv.className = 'log-speaker';
            speakerDiv.textContent = entry.speaker || ' ';

            const textDiv = document.createElement('div');
            textDiv.className = 'log-text';
            textDiv.textContent = entry.text;

            li.appendChild(speakerDiv);
            li.appendChild(textDiv);
            this.logList.appendChild(li);
        });

        // Scroll to bottom
        setTimeout(() => {
            this.logList.scrollTop = this.logList.scrollHeight;
        }, 0);
    }

    toggleLog(show) {
        if (show) {
            this.logModal.classList.remove('hidden');
        } else {
            this.logModal.classList.add('hidden');
        }
    }
}

// Start Game
window.onload = () => {
    const game = new GameEngine(scenario);
};
