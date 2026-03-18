/* =========================================================
   particles.js — Neural Network Background Animation
   A responsive particle system that creates an interconnected
   network effect, responding to mouse movement.
   ========================================================= */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.animationId = null;
        this.isRunning = false;

        this.config = {
            particleCount: 80,
            maxDistance: 140,
            particleSize: { min: 1, max: 3 },
            speed: 0.4,
            colors: {
                particle: 'rgba(100, 255, 218, 0.6)',
                line: 'rgba(100, 255, 218, ',
                mouseParticle: 'rgba(249, 115, 22, 0.8)',
                mouseLine: 'rgba(249, 115, 22, '
            }
        };

        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        this.handleMouse = this.handleMouse.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    init() {
        if (!this.canvas) return;

        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.isRunning = true;
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const area = this.canvas.width * this.canvas.height;
        this.config.particleCount = Math.min(Math.floor(area / 12000), 120);
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.config));
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        this.canvas.addEventListener('mousemove', this.handleMouse);
        this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    }

    handleMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    handleMouseLeave() {
        this.mouse.x = null;
        this.mouse.y = null;
    }

    drawLines() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.maxDistance) {
                    const opacity = 1 - dist / this.config.maxDistance;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.config.colors.line + (opacity * 0.3) + ')';
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }

            if (this.mouse.x !== null) {
                const dx = this.particles[i].x - this.mouse.x;
                const dy = this.particles[i].y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius) {
                    const opacity = 1 - dist / this.mouse.radius;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.config.colors.mouseLine + (opacity * 0.5) + ')';
                    this.ctx.lineWidth = 0.8;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.update(this.mouse);
            p.draw(this.ctx);
        });

        this.drawLines();
        this.animationId = requestAnimationFrame(this.animate);
    }

    destroy() {
        this.isRunning = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.resize);
    }
}

class Particle {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * config.speed + 0.1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        this.y = Math.max(0, Math.min(this.canvas.height, this.y));

        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x += Math.cos(angle) * force * 1.5;
                this.y += Math.sin(angle) * force * 1.5;
            }
        }

        this.pulsePhase += this.pulseSpeed;
    }

    draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const alpha = this.opacity * pulse;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
        ctx.fill();
    }
}

window.particleNetwork = new ParticleNetwork('particles-canvas');
