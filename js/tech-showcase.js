/**
 * RANUK.DEV & RANUK IT — Tech Showcase & Interactive Telemetry Module
 * Handles Tech Radar filters, ML Benchmarks, and ROI Architecture Estimator.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTechRadar();
    initMlTelemetry();
    initRoiEstimator();
});

/* ==========================================================================
   1. TECH RADAR / MATRIX INTERACTIVA (#skills)
   ========================================================================== */
function initTechRadar() {
    const radarContainer = document.getElementById('tech-radar-matrix');
    if (!radarContainer) return;

    const filterBtns = document.querySelectorAll('.radar-filter-btn');
    const skillCards = document.querySelectorAll('.radar-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            skillCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   2. TELEMETRÍA Y BENCHMARK ML EN TIEMPO REAL (#ml-lab)
   ========================================================================== */
function initMlTelemetry() {
    const latencyEl = document.getElementById('telemetry-latency');
    const throughputEl = document.getElementById('telemetry-throughput');
    const memoryEl = document.getElementById('telemetry-memory');
    const accuracyEl = document.getElementById('telemetry-accuracy');
    const canvas = document.getElementById('telemetry-chart');

    if (!latencyEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    let history = Array(20).fill(12);

    function updateMetrics() {
        // Simulación de fluctuación de latencia de alta precisión (ms)
        const baseLatency = 11.4;
        const noise = (Math.random() - 0.5) * 1.8;
        const currentLatency = Math.max(8.5, (baseLatency + noise)).toFixed(1);
        
        latencyEl.textContent = `${currentLatency} ms`;
        if (throughputEl) throughputEl.textContent = `${Math.floor(1420 + Math.random() * 180)} req/s`;
        if (memoryEl) memoryEl.textContent = `${(1.82 + (Math.random() * 0.04)).toFixed(2)} GB`;
        if (accuracyEl) accuracyEl.textContent = '99.4%';

        history.push(parseFloat(currentLatency));
        history.shift();
        drawChart();
    }

    function drawChart() {
        const w = canvas.width = canvas.parentElement.clientWidth || 300;
        const h = canvas.height = 80;

        ctx.clearRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(189, 211, 226, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();

        // Trend line
        ctx.strokeStyle = '#6fffd1';
        ctx.lineWidth = 2.2;
        ctx.beginPath();

        const step = w / (history.length - 1);
        history.forEach((val, i) => {
            // Map 8ms - 16ms to height
            const y = h - ((val - 6) / 12) * h;
            const x = i * step;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Area gradient
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(111, 255, 209, 0.25)');
        grad.addColorStop(1, 'rgba(111, 255, 209, 0.0)');
        ctx.fillStyle = grad;
        ctx.fill();
    }

    setInterval(updateMetrics, 1200);
    updateMetrics();
}

/* ==========================================================================
   3. ESTIMADOR DE ROI Y ARQUITECTURA TÉCNICA (#roi-calculator - RANUK IT)
   ========================================================================== */
function initRoiEstimator() {
    const serviceSelect = document.getElementById('roi-service-type');
    const scaleSelect = document.getElementById('roi-business-scale');
    const archOutput = document.getElementById('roi-arch-output');
    const efficiencyOutput = document.getElementById('roi-efficiency-output');
    const timelineOutput = document.getElementById('roi-timeline-output');
    const ctaBtn = document.getElementById('roi-schedule-cta');

    if (!serviceSelect || !archOutput) return;

    const dataMatrix = {
        'ml-pricing': {
            small: { arch: 'XGBoost + FastAPI + Redis Cache', eff: '85% autom. de precios', time: '2-3 semanas' },
            medium: { arch: 'PyTorch/CUDA + Async Pipeline + Kafka', eff: '3.2x margen neto', time: '3-5 semanas' },
            enterprise: { arch: 'Distributed MLOps + Vector DB + Multi-Region', eff: 'Optimización de millones de registros', time: '6-8 semanas' }
        },
        'legacy-modernization': {
            small: { arch: 'PHP/Excel -> Python Async API + PostgreSQL', eff: '70% menos tiempo manual', time: '1-2 semanas' },
            medium: { arch: 'Monolito -> Microservicios Dockerized + CI/CD', eff: '99.98% Uptime SLA', time: '3-4 semanas' },
            enterprise: { arch: 'Cloud Native Migration (AWS/GCP K8s)', eff: 'Cero downtime + 60% ahorros infra', time: '5-7 semanas' }
        },
        'trading-bots': {
            small: { arch: 'Python + ccxt + Backtrader + VPS 24/7', eff: 'Ejecución 0ms subjetividad', time: '1-2 semanas' },
            medium: { arch: 'Señales ML (XGBoost) + Risk Mgmt Engine', eff: 'Sharpe ratio optimizado', time: '2-4 semanas' },
            enterprise: { arch: 'HFT Pipeline + WebSocket + Multi-Exchange Arb', eff: 'Latencia ultra-baja en milisegundos', time: '4-6 semanas' }
        },
        'fullstack-platform': {
            small: { arch: 'TypeScript + Next.js + PostgreSQL + Tailwind', eff: 'Lanzamiento ultra-rápido', time: '2 semanas' },
            medium: { arch: 'Next.js App Router + GraphQL API + Auth2', eff: 'Plataforma B2B escalable', time: '3-5 semanas' },
            enterprise: { arch: 'Micro-frontends + Distributed Backend + ADA AA', eff: 'Cumplimiento 100% ADA / WCAG 2.1', time: '6 semanas' }
        }
    };

    function recalculate() {
        const service = serviceSelect.value || 'ml-pricing';
        const scale = scaleSelect ? scaleSelect.value : 'medium';
        const result = dataMatrix[service][scale];

        archOutput.textContent = result.arch;
        efficiencyOutput.textContent = result.eff;
        timelineOutput.textContent = result.time;

        if (ctaBtn) {
            ctaBtn.href = `#contact?service=${service}&scale=${scale}`;
        }
    }

    serviceSelect.addEventListener('change', recalculate);
    if (scaleSelect) scaleSelect.addEventListener('change', recalculate);

    recalculate();
}
