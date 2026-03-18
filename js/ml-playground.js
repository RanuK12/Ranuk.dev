/* =========================================================
   ml-playground.js — Interactive Neural Network Classifier
   A 2-layer neural network built from scratch in vanilla JS.
   No libraries. Forward prop + backprop + gradient descent.
   ========================================================= */

class NeuralNetwork {
    constructor(inputSize, hiddenSize, outputSize) {
        this.lr = 0.1;
        this.W1 = this.randomMatrix(inputSize, hiddenSize);
        this.b1 = new Array(hiddenSize).fill(0);
        this.W2 = this.randomMatrix(hiddenSize, outputSize);
        this.b2 = new Array(outputSize).fill(0);
    }

    randomMatrix(rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = (Math.random() - 0.5) * Math.sqrt(2.0 / rows);
            }
        }
        return matrix;
    }

    relu(x) { return Math.max(0, x); }
    reluDeriv(x) { return x > 0 ? 1 : 0; }
    sigmoid(x) { return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x)))); }

    forward(input) {
        this.input = input;
        this.hiddenRaw = [];
        this.hidden = [];
        for (let j = 0; j < this.W1[0].length; j++) {
            let sum = this.b1[j];
            for (let i = 0; i < input.length; i++) {
                sum += input[i] * this.W1[i][j];
            }
            this.hiddenRaw.push(sum);
            this.hidden.push(this.relu(sum));
        }

        let outputSum = this.b2[0];
        for (let j = 0; j < this.hidden.length; j++) {
            outputSum += this.hidden[j] * this.W2[j][0];
        }
        this.output = this.sigmoid(outputSum);
        return this.output;
    }

    backward(target) {
        const outputError = this.output - target;
        const dOutput = outputError;

        for (let j = 0; j < this.hidden.length; j++) {
            this.W2[j][0] -= this.lr * dOutput * this.hidden[j];
        }
        this.b2[0] -= this.lr * dOutput;

        for (let j = 0; j < this.hidden.length; j++) {
            const dHidden = dOutput * this.W2[j][0] * this.reluDeriv(this.hiddenRaw[j]);
            for (let i = 0; i < this.input.length; i++) {
                this.W1[i][j] -= this.lr * dHidden * this.input[i];
            }
            this.b1[j] -= this.lr * dHidden;
        }

        return outputError * outputError;
    }

    predict(input) {
        return this.forward(input);
    }
}


class MLPlayground {
    constructor() {
        this.canvas = document.getElementById('ml-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.currentClass = 0;
        this.nn = null;
        this.isTraining = false;
        this.hiddenNeurons = 8;

        this.colors = {
            classA: '#64ffda',
            classB: '#f97316',
            bg: '#0a0a1a',
            grid: 'rgba(100, 255, 218, 0.05)'
        };

        this.lossDisplay = document.getElementById('ml-loss');
        this.accuracyDisplay = document.getElementById('ml-accuracy');
        this.epochDisplay = document.getElementById('ml-epoch');
        this.hint = document.querySelector('.ml-canvas-hint');
    }

    init() {
        if (!this.canvas) return;

        this.resizeCanvas();
        this.drawGrid();
        this.setupEvents();

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.redraw();
        });
    }

    resizeCanvas() {
        const wrapper = this.canvas.parentElement;
        const rect = wrapper.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = Math.max(rect.height, 400);
    }

    setupEvents() {
        this.canvas.addEventListener('click', (e) => this.addPoint(e));

        document.querySelectorAll('.class-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentClass = parseInt(btn.dataset.class);
            });
        });

        const lrSlider = document.getElementById('learning-rate');
        const lrValue = document.getElementById('lr-value');
        if (lrSlider) {
            lrSlider.addEventListener('input', () => {
                lrValue.textContent = parseFloat(lrSlider.value).toFixed(2);
            });
        }

        const epochsSlider = document.getElementById('epochs');
        const epochsValue = document.getElementById('epochs-value');
        if (epochsSlider) {
            epochsSlider.addEventListener('input', () => {
                epochsValue.textContent = epochsSlider.value;
            });
        }

        const neuronsSlider = document.getElementById('hidden-neurons');
        const neuronsValue = document.getElementById('neurons-value');
        if (neuronsSlider) {
            neuronsSlider.addEventListener('input', () => {
                neuronsValue.textContent = neuronsSlider.value;
                this.hiddenNeurons = parseInt(neuronsSlider.value);
            });
        }

        const trainBtn = document.getElementById('ml-train');
        if (trainBtn) {
            trainBtn.addEventListener('click', () => this.train());
        }

        const clearBtn = document.getElementById('ml-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }
    }

    addPoint(e) {
        if (this.isTraining) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.points.push({
            x: x / this.canvas.width,
            y: y / this.canvas.height,
            px: x,
            py: y,
            cls: this.currentClass
        });

        if (this.hint) this.hint.classList.add('hidden');
        this.redraw();
    }

    drawGrid(clearBg = true) {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        if (clearBg) {
            ctx.fillStyle = this.colors.bg;
            ctx.fillRect(0, 0, w, h);
        }

        ctx.strokeStyle = this.colors.grid;
        ctx.lineWidth = 1;
        const step = 40;

        for (let x = 0; x < w; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }

    drawPoint(x, y, cls, radius) {
        const ctx = this.ctx;
        radius = radius || 6;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = cls === 0 ? this.colors.classA : this.colors.classB;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = cls === 0 ?
            'rgba(100, 255, 218, 0.3)' :
            'rgba(249, 115, 22, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    redraw() {
        this.drawGrid();
        this.points.forEach(p => {
            this.drawPoint(
                p.x * this.canvas.width,
                p.y * this.canvas.height,
                p.cls
            );
        });
    }

    drawDecisionBoundary() {
        if (!this.nn) return;

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const resolution = 4;

        const imageData = ctx.createImageData(w, h);

        for (let px = 0; px < w; px += resolution) {
            for (let py = 0; py < h; py += resolution) {
                const nx = px / w;
                const ny = py / h;
                const pred = this.nn.predict([nx, ny]);

                const r = Math.floor(pred * 249 + (1 - pred) * 100);
                const g = Math.floor(pred * 115 + (1 - pred) * 255);
                const b = Math.floor(pred * 22 + (1 - pred) * 218);
                const a = 35;

                for (let dx = 0; dx < resolution && px + dx < w; dx++) {
                    for (let dy = 0; dy < resolution && py + dy < h; dy++) {
                        const idx = ((py + dy) * w + (px + dx)) * 4;
                        imageData.data[idx] = r;
                        imageData.data[idx + 1] = g;
                        imageData.data[idx + 2] = b;
                        imageData.data[idx + 3] = a;
                    }
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);

        this.drawGrid(false);

        this.points.forEach(p => {
            this.drawPoint(
                p.x * this.canvas.width,
                p.y * this.canvas.height,
                p.cls,
                7
            );
        });
    }

    showWarning(msg) {
        const trainBtn = document.getElementById('ml-train');
        if (!trainBtn) return;
        const original = trainBtn.innerHTML;
        trainBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + msg;
        trainBtn.style.borderColor = '#f97316';
        trainBtn.style.color = '#f97316';
        setTimeout(() => {
            trainBtn.innerHTML = original;
            trainBtn.style.borderColor = '';
            trainBtn.style.color = '';
        }, 2500);
    }

    async train() {
        if (this.isTraining) return;

        if (this.points.length < 2) {
            this.showWarning('Add more points!');
            return;
        }

        const hasClassA = this.points.some(p => p.cls === 0);
        const hasClassB = this.points.some(p => p.cls === 1);
        if (!hasClassA || !hasClassB) {
            this.showWarning('Need both classes!');
            return;
        }

        this.isTraining = true;
        const trainBtn = document.getElementById('ml-train');
        if (trainBtn) {
            trainBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Training...';
            trainBtn.disabled = true;
        }

        const lrSlider = document.getElementById('learning-rate');
        const lr = lrSlider ? parseFloat(lrSlider.value) : 0.1;

        const epochsSlider = document.getElementById('epochs');
        const totalEpochs = epochsSlider ? parseInt(epochsSlider.value) : 100;

        this.nn = new NeuralNetwork(2, this.hiddenNeurons, 1);
        this.nn.lr = lr;

        const data = this.points.map(p => ({
            input: [p.x, p.y],
            target: p.cls
        }));

        for (let epoch = 0; epoch < totalEpochs; epoch++) {
            let totalLoss = 0;

            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }

            for (const sample of data) {
                this.nn.forward(sample.input);
                totalLoss += this.nn.backward(sample.target);
            }

            const avgLoss = totalLoss / data.length;

            let correct = 0;
            for (const sample of data) {
                const pred = this.nn.predict(sample.input);
                if ((pred >= 0.5 ? 1 : 0) === sample.target) correct++;
            }
            const accuracy = (correct / data.length * 100).toFixed(1);

            if (epoch % 5 === 0 || epoch === totalEpochs - 1) {
                if (this.lossDisplay) this.lossDisplay.textContent = avgLoss.toFixed(4);
                if (this.accuracyDisplay) this.accuracyDisplay.textContent = accuracy + '%';
                if (this.epochDisplay) this.epochDisplay.textContent = epoch + 1;

                this.drawDecisionBoundary();
                await new Promise(r => setTimeout(r, 10));
            }
        }

        this.drawDecisionBoundary();
        this.isTraining = false;

        if (trainBtn) {
            const trainText = window.i18n ? window.i18n.get('mllab.train') : 'Train Model';
            trainBtn.innerHTML = '<i class="fas fa-play"></i> ' + trainText;
            trainBtn.disabled = false;
        }
    }

    clear() {
        if (this.isTraining) return;

        this.points = [];
        this.nn = null;

        if (this.lossDisplay) this.lossDisplay.textContent = '--';
        if (this.accuracyDisplay) this.accuracyDisplay.textContent = '--';
        if (this.epochDisplay) this.epochDisplay.textContent = '--';

        if (this.hint) this.hint.classList.remove('hidden');

        this.drawGrid();
    }
}

window.mlPlayground = new MLPlayground();
