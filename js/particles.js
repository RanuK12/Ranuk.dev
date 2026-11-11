/* =========================================================
   particles.js — Google Antigravity Zero-G Particle Engine
   Inspired by https://antigravity.google/auth-success?app=antigravity
   
   Features:
   - Weightless multi-harmonic zero-gravity drift physics.
   - Interactive Antigravity Repulsion (curved force field around cursor).
   - Radial Antigravity Shockwave pulses on click/touch.
   - Multi-chromatic quantum palette: Electric Cyan, Mint Emerald,
     Solar Gold, Hyper Violet, and Coral Rose.
   - Dynamic neural synaptic filaments with proximity energy brightening.
   - HiDPI / Retina canvas crispness with 60fps adaptive budget.
   ========================================================= */

(function () {
  'use strict';

  // Multi-chromatic palette
  const SPECTRUM = [
    { r: 0,   g: 240, b: 255, name: 'cyan' },     // Electric Cyan (#00f0ff)
    { r: 16,  g: 235, b: 155, name: 'emerald' },  // Synthetic Mint (#10eb9b)
    { r: 251, g: 191, b: 36,  name: 'gold' },     // Solar Gold (#fbbf24)
    { r: 192, g: 132, b: 252, name: 'violet' },   // Hyper Violet (#c084fc)
    { r: 255, g: 42,  b: 95,   name: 'rose' }      // Coral Rose (#ff2a5f)
  ];

  class AntigravityParticle {
    constructor(w, h, dpr) {
      this.dpr = dpr || 1;
      this.reset(w, h);
    }

    reset(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.depth = Math.random() * 0.9 + 0.6; // Depth factor (0.6 - 1.5)
      this.baseRadius = (Math.random() * 1.8 + 1.2) * this.depth;
      
      // Floating organic phase
      this.phaseX = Math.random() * Math.PI * 2;
      this.phaseY = Math.random() * Math.PI * 2;
      this.freqX = (Math.random() * 0.0015 + 0.0008);
      this.freqY = (Math.random() * 0.0018 + 0.0009);
      this.amplitude = (Math.random() * 0.6 + 0.3) * this.depth;

      // Base velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.35 + 0.15) * this.depth;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      // Color from spectrum
      this.color = SPECTRUM[Math.floor(Math.random() * SPECTRUM.length)];
      this.baseOpacity = (Math.random() * 0.45 + 0.35) * this.depth;
      this.opacity = this.baseOpacity;
      this.pulseSpeed = Math.random() * 0.025 + 0.01;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(w, h, time, mouse, shockwaves) {
      // 1. Organic Zero-G Sinusoidal Floating Drift
      const driftX = Math.sin(time * this.freqX + this.phaseX) * this.amplitude;
      const driftY = Math.cos(time * this.freqY + this.phaseY) * this.amplitude;

      this.x += this.vx + driftX;
      this.y += this.vy + driftY;

      // Friction to stabilize extreme kicks
      this.vx *= 0.965;
      this.vy *= 0.965;

      // 2. Interactive Antigravity Repulsion (Cursor)
      if (mouse.x !== null && mouse.isActive) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const radius = mouse.antigravityRadius;

        if (dist < radius && dist > 0.001) {
          // Quadratic repulsion curve: strongest near center, gentle at edge
          const force = Math.pow((radius - dist) / radius, 1.8) * mouse.antigravityForce;
          const nx = dx / dist;
          const ny = dy / dist;
          this.vx += nx * force * 1.8;
          this.vy += ny * force * 1.8;
          this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        } else {
          this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }
      } else {
        this.opacity += (this.baseOpacity - this.opacity) * 0.05;
      }

      // 3. Radial Antigravity Shockwaves (from click/tap)
      if (shockwaves && shockwaves.length) {
        for (let i = 0; i < shockwaves.length; i++) {
          const sw = shockwaves[i];
          const dx = this.x - sw.x;
          const dy = this.y - sw.y;
          const dist = Math.hypot(dx, dy);
          const diff = Math.abs(dist - sw.radius);

          if (diff < sw.thickness && dist > 0.01) {
            const shockForce = (1 - diff / sw.thickness) * sw.intensity;
            this.vx += (dx / dist) * shockForce * 4.5;
            this.vy += (dy / dist) * shockForce * 4.5;
            this.opacity = 1;
          }
        }
      }

      // 4. Soft Boundary Wrap
      const margin = 20;
      if (this.x < -margin) this.x = w + margin;
      else if (this.x > w + margin) this.x = -margin;
      if (this.y < -margin) this.y = h + margin;
      else if (this.y > h + margin) this.y = -margin;

      // 5. Breathing pulse
      this.pulsePhase += this.pulseSpeed;
    }

    draw(ctx) {
      const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
      const alpha = Math.min(1, Math.max(0.1, this.opacity * pulse));
      const r = this.color.r;
      const g = this.color.g;
      const b = this.color.b;

      // Draw particle core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();

      // Subtle outer glow aura for larger nodes
      if (this.depth > 1.0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.18})`;
        ctx.fill();
      }
    }
  }

  class AntigravityParticleNetwork {
    constructor(canvasId) {
      this.canvasId = canvasId;
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.shockwaves = [];
      this.dpr = 1;
      this.width = 0;
      this.height = 0;

      this.mouse = {
        x: null,
        y: null,
        radius: 220,
        antigravityRadius: 210,
        antigravityForce: 2.8,
        isActive: false
      };

      this.config = {
        maxDistance: 135,
        targetFPS: 60
      };

      this.animationId = null;
      this.isRunning = false;
      this.lastTime = 0;

      this.resize = this.resize.bind(this);
      this.animate = this.animate.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    init() {
      if (!this.canvas) {
        this.canvas = document.getElementById(this.canvasId);
      }
      if (!this.canvas) {
        console.warn(`[AntigravityParticles] Canvas #${this.canvasId} not found.`);
        return;
      }
      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.resize();
      this.createParticles();
      this.addEventListeners();
      this.isRunning = true;
      this.lastTime = performance.now();
      this.animate(this.lastTime);
    }

    resize() {
      if (!this.canvas) return;
      const parent = this.canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };

      this.width = rect.width || window.innerWidth;
      this.height = rect.height || window.innerHeight;

      // Scale canvas for Retina
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(this.dpr, this.dpr);

      // Adaptive count based on screen area (capped for optimal 60fps)
      const area = this.width * this.height;
      const targetCount = Math.min(Math.max(Math.floor(area / 11000), 55), 110);

      // Adjust particle count smoothly
      if (this.particles.length === 0) {
        this.createParticles(targetCount);
      } else if (this.particles.length < targetCount) {
        while (this.particles.length < targetCount) {
          this.particles.push(new AntigravityParticle(this.width, this.height, this.dpr));
        }
      } else if (this.particles.length > targetCount) {
        this.particles.length = targetCount;
      }
    }

    createParticles(count) {
      const n = count || 75;
      this.particles = [];
      for (let i = 0; i < n; i++) {
        this.particles.push(new AntigravityParticle(this.width, this.height, this.dpr));
      }
    }

    addEventListeners() {
      window.addEventListener('resize', this.resize, { passive: true });
      window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', this.handleMouseLeave, { passive: true });

      // Click / Touch Shockwave triggers
      this.canvas.addEventListener('click', this.handleClick, { passive: true });
      const hero = document.getElementById('hero');
      if (hero && hero !== this.canvas) {
        hero.addEventListener('click', this.handleClick, { passive: true });
      }

      // Touch interaction
      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.x = e.touches[0].clientX - rect.left;
          this.mouse.y = e.touches[0].clientY - rect.top;
          this.mouse.isActive = true;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.mouse.isActive = false;
      }, { passive: true });
    }

    handleMouseMove(e) {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        this.mouse.isActive = false;
        return;
      }
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.isActive = true;
    }

    handleMouseLeave() {
      this.mouse.x = null;
      this.mouse.y = null;
      this.mouse.isActive = false;
    }

    handleClick(e) {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add radial antigravity shockwave
      this.shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: Math.min(this.width, this.height) * 0.45,
        speed: 7.5,
        thickness: 45,
        intensity: 1.0,
        opacity: 0.8
      });
    }

    drawFilaments() {
      const mouseActive = this.mouse.x !== null && this.mouse.isActive;
      const r = this.mouse.radius;
      const len = this.particles.length;

      for (let i = 0; i < len; i++) {
        const pi = this.particles[i];
        const iNearMouse = mouseActive && Math.hypot(pi.x - this.mouse.x, pi.y - this.mouse.y) < r;

        for (let j = i + 1; j < len; j++) {
          const pj = this.particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.hypot(dx, dy);

          if (dist < this.config.maxDistance) {
            const opacity = 1 - (dist / this.config.maxDistance);
            const jNearMouse = mouseActive && Math.hypot(pj.x - this.mouse.x, pj.y - this.mouse.y) < r;
            const tensed = iNearMouse && jNearMouse;

            this.ctx.beginPath();
            if (tensed) {
              // High-energy Golden/Cyan filament when near cursor
              this.ctx.strokeStyle = `rgba(251, 191, 36, ${opacity * 0.75})`;
              this.ctx.lineWidth = 1.2;
            } else {
              // Delicate synaptic filament
              this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.22})`;
              this.ctx.lineWidth = 0.5;
            }
            this.ctx.moveTo(pi.x, pi.y);
            this.ctx.lineTo(pj.x, pj.y);
            this.ctx.stroke();
          }
        }

        // Draw cursor connection filament
        if (mouseActive) {
          const dx = pi.x - this.mouse.x;
          const dy = pi.y - this.mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < this.mouse.radius) {
            const opacity = 1 - (dist / this.mouse.radius);
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.45})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.moveTo(pi.x, pi.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
          }
        }
      }
    }

    drawShockwaves() {
      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.radius += sw.speed;
        sw.opacity *= 0.94;

        if (sw.radius > sw.maxRadius || sw.opacity < 0.02) {
          this.shockwaves.splice(i, 1);
          continue;
        }

        // Draw expanding subtle shockwave ring
        this.ctx.beginPath();
        this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(0, 240, 255, ${sw.opacity * 0.5})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Secondary warm harmonic ring
        this.ctx.beginPath();
        this.ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(16, 235, 155, ${sw.opacity * 0.3})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    }

    animate(currentTime) {
      if (!this.isRunning) return;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Update & Draw Particles
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update(this.width, this.height, currentTime, this.mouse, this.shockwaves);
        this.particles[i].draw(this.ctx);
      }

      // Draw Filaments
      this.drawFilaments();

      // Draw Shockwaves
      this.drawShockwaves();

      this.animationId = requestAnimationFrame(this.animate);
    }

    destroy() {
      this.isRunning = false;
      if (this.animationId) cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this.resize);
      window.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseleave', this.handleMouseLeave);
      if (this.canvas) this.canvas.removeEventListener('click', this.handleClick);
    }
  }

  // Assign to window for app.js initialization
  window.ParticleNetwork = AntigravityParticleNetwork;
  window.particleNetwork = new AntigravityParticleNetwork('particles-canvas');
})();
