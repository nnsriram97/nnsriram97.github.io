/* ─────────────────────────────────────────────
   Visible Camera Canvas — RGB camera emulation
   Core controls: exposure, ISO, read noise,
   shot noise for low-light/noisy behavior.
   ───────────────────────────────────────────── */

(function () {
    'use strict';

    const GRID_SCALE = 2;
    const FPS = 24;
    const MAX_DPR = 1.5;
    const CANVAS_OPACITY = 0.72;

    let exposureMs = 4;
    let iso = 3200;
    let readNoise = 8.0;
    let shotNoiseScale = 1.8;

    let canvas;
    let ctx;
    let imageData;
    let pixels;
    let gridW = 0;
    let gridH = 0;
    let baseLuma;

    let active = false;
    let frameHandle = null;
    let lastTime = 0;
    const frameInterval = 1000 / FPS;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function approxGaussian() {
        return ((Math.random() + Math.random() + Math.random()) - 1.5) / 0.5;
    }

    function initGrid() {
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        gridW = Math.max(1, Math.floor((window.innerWidth * dpr) / GRID_SCALE));
        gridH = Math.max(1, Math.floor((window.innerHeight * dpr) / GRID_SCALE));

        if (!canvas || !ctx) return;

        canvas.width = gridW;
        canvas.height = gridH;
        imageData = ctx.createImageData(gridW, gridH);
        pixels = imageData.data;

        baseLuma = new Float32Array(gridW * gridH);
        for (let i = 0; i < gridW * gridH; i++) {
            const x = (i % gridW) / gridW;
            const y = Math.floor(i / gridW) / gridH;
            const dx = x - 0.5;
            const dy = y - 0.5;
            const vignette = clamp(1 - (Math.sqrt((dx * dx) + (dy * dy)) * 1.2), 0.25, 1);
            const texture = 0.5
                + (0.22 * Math.sin(x * 9.5))
                + (0.17 * Math.sin(y * 7.2))
                + (0.11 * Math.sin((x + y) * 13.0));
            baseLuma[i] = clamp((0.62 * vignette) + (0.38 * texture), 0.03, 1);
        }
    }

    function resize() {
        if (!active || !canvas || !ctx) return;
        initGrid();
    }

    function renderFrame() {
        if (!ctx || !imageData || !pixels || !baseLuma) return;

        const exposureNorm = clamp(exposureMs / 16, 0.03, 31.25);
        const gainNorm = clamp(iso / 100, 1, 64);

        const signalScale = exposureNorm * gainNorm;
        const shotSigmaBase = shotNoiseScale * 0.08 * Math.sqrt(gainNorm);
        const readSigma = (readNoise / 12) * 0.3 * Math.sqrt(gainNorm);

        for (let i = 0; i < gridW * gridH; i++) {
            const baseSignal = baseLuma[i] * signalScale;

            // Shot noise grows with sqrt(signal), read noise is additive.
            const shotNoise = approxGaussian() * shotSigmaBase * Math.sqrt(Math.max(baseSignal, 0.0001));
            const readNoiseValue = approxGaussian() * readSigma;
            const sensorValue = Math.max(0, baseSignal + shotNoise + readNoiseValue);

            // ADC quantization + gamma-like mapping.
            const adcNorm = clamp(sensorValue / (1 + signalScale), 0, 1);
            const gamma = Math.pow(adcNorm, 1 / 2.2);

            const chromaNoise = 0.02 + (0.01 * gainNorm);
            const r = clamp(gamma + (approxGaussian() * chromaNoise), 0, 1);
            const g = clamp(gamma + (approxGaussian() * chromaNoise * 0.9), 0, 1);
            const b = clamp(gamma + (approxGaussian() * chromaNoise * 1.1), 0, 1);

            const p = i * 4;
            pixels[p] = Math.floor(r * 255);
            pixels[p + 1] = Math.floor(g * 255);
            pixels[p + 2] = Math.floor(b * 255);
            pixels[p + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0);

        // Exposure bias on top for darker/brighter under/over-exposure effect.
        const exposureBias = clamp((exposureNorm * 0.34) - 0.32, -0.28, 0.24);
        if (exposureBias < 0) {
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.abs(exposureBias)})`;
            ctx.fillRect(0, 0, gridW, gridH);
        } else if (exposureBias > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${exposureBias * 0.45})`;
            ctx.fillRect(0, 0, gridW, gridH);
        }
    }

    function animate(timestamp) {
        if (!active) return;
        if (timestamp - lastTime >= frameInterval) {
            lastTime = timestamp;
            renderFrame();
        }
        frameHandle = requestAnimationFrame(animate);
    }

    function start() {
        if (active) return;

        if (!canvas) {
            canvas = document.getElementById('visible-camera-canvas');
            if (!canvas) return;
            ctx = canvas.getContext('2d', { alpha: true });
            if (!ctx) return;
        }

        initGrid();
        canvas.style.opacity = String(CANVAS_OPACITY);
        window.addEventListener('resize', resize, { passive: true });
        active = true;
        lastTime = 0;
        frameHandle = requestAnimationFrame(animate);
    }

    function stop() {
        active = false;
        if (frameHandle) {
            cancelAnimationFrame(frameHandle);
            frameHandle = null;
        }
        window.removeEventListener('resize', resize);
        if (canvas) {
            canvas.style.opacity = '0';
        }
    }

    function setParameter(name, value) {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return;

        switch (name) {
            case 'exposureMs':
                exposureMs = clamp(numeric, 1, 500);
                break;
            case 'iso':
                iso = clamp(numeric, 100, 6400);
                break;
            case 'readNoise':
                readNoise = clamp(numeric, 0.5, 12.0);
                break;
            case 'shotNoiseScale':
                shotNoiseScale = clamp(numeric, 0.0, 2.0);
                break;
        }
    }

    window.visibleCameraCanvas = {
        start,
        stop,
        setParameter
    };
})();
