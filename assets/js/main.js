/* ─────────────────────────────────────────────
   Main JS — Theme toggle, Mobile nav, Pub tabs,
              Sensor mode (Thermal vision)
   ───────────────────────────────────────────── */

(function () {
    'use strict';

    /* ── Dark-mode toggle ── */
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const html = document.documentElement;
            const next = html.getAttribute('data-theme') === 'dark' ? '' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    /* ── Mobile hamburger ── */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open);
        });
    }

    /* ── Publication tabs ── */
    const tabBar = document.getElementById('pub-tabs');
    if (tabBar) {
        const tabs = tabBar.querySelectorAll('.pub-tab');
        const panels = document.querySelectorAll('.pub-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                // Update active tab
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Show matching panel
                panels.forEach(p => {
                    if (p.id === 'panel-' + target) {
                        p.classList.remove('hidden');
                    } else {
                        p.classList.add('hidden');
                    }
                });
            });
        });
    }

    /* ── Sensor Mode (Visible + Thermal) ── */
    const sensorBar = document.getElementById('sensor-bar');
    const thermalTrigger = document.getElementById('thermal-trigger');
    const thermalControls = document.getElementById('thermal-controls');
    const visibleCameraControls = document.getElementById('visible-camera-controls');
    const getThermalApi = () => window.thermalCanvas;
    const getVisibleCameraApi = () => window.visibleCameraCanvas;
    const sensorAvatars = document.querySelectorAll('.sensor-avatar');
    const VISIBLE_PRESETS = {
        noisy: { exposureMs: 4, iso: 3200, readNoise: 8.0, shotNoiseScale: 1.8 },
        clean: { exposureMs: 28, iso: 100, readNoise: 1.2, shotNoiseScale: 0.2 }
    };

    function updateSensorAvatars(mode) {
        sensorAvatars.forEach((img) => {
            const visibleSrc = img.dataset.visibleSrc;
            const thermalSrc = img.dataset.thermalSrc;

            if (!visibleSrc) return;

            const nextSrc = (mode === 'thermal' && thermalSrc) ? thermalSrc : visibleSrc;
            if (img.getAttribute('src') !== nextSrc) {
                img.setAttribute('src', nextSrc);
            }

            if (!img.dataset.sensorFallbackBound) {
                img.addEventListener('error', () => {
                    if (img.getAttribute('src') !== visibleSrc) {
                        img.setAttribute('src', visibleSrc);
                    }
                });
                img.dataset.sensorFallbackBound = 'true';
            }
        });
    }

    function applyThermalControlValues() {
        const api = getThermalApi();
        if (!api) return;

        const diffSlider = document.getElementById('diff-slider');
        const decaySlider = document.getElementById('decay-slider');
        const intensitySlider = document.getElementById('intensity-slider');
        const radiusSlider = document.getElementById('radius-slider');
        const activeColormap = thermalControls
            ? thermalControls.querySelector('.colormap-btn.active')
            : null;

        if (diffSlider && api.setParameter) api.setParameter('diffusivity', diffSlider.value);
        if (decaySlider && api.setParameter) api.setParameter('decay', decaySlider.value);
        if (intensitySlider && api.setParameter) api.setParameter('mouseIntensity', intensitySlider.value);
        if (radiusSlider && api.setParameter) api.setParameter('mouseRadius', radiusSlider.value);
        if (activeColormap && api.setColormap) api.setColormap(activeColormap.dataset.colormap);
    }

    function applyVisibleCameraControlValues() {
        const api = getVisibleCameraApi();
        if (!api || !api.setParameter) return;

        const exposureSlider = document.getElementById('exposure-slider');
        const gainSlider = document.getElementById('gain-slider');
        const readNoiseSlider = document.getElementById('read-noise-slider');
        const shotNoiseSlider = document.getElementById('shot-noise-slider');

        if (exposureSlider) api.setParameter('exposureMs', exposureSlider.value);
        if (gainSlider) api.setParameter('iso', gainSlider.value);
        if (readNoiseSlider) api.setParameter('readNoise', readNoiseSlider.value);
        if (shotNoiseSlider) api.setParameter('shotNoiseScale', shotNoiseSlider.value);
    }

    function setVisiblePreset(presetName) {
        const preset = VISIBLE_PRESETS[presetName];
        if (!preset) return;

        const exposureSlider = document.getElementById('exposure-slider');
        const gainSlider = document.getElementById('gain-slider');
        const readNoiseSlider = document.getElementById('read-noise-slider');
        const shotNoiseSlider = document.getElementById('shot-noise-slider');
        const exposureValue = document.getElementById('exposure-value');
        const gainValue = document.getElementById('gain-value');
        const readNoiseValue = document.getElementById('read-noise-value');
        const shotNoiseValue = document.getElementById('shot-noise-value');

        if (exposureSlider) exposureSlider.value = String(preset.exposureMs);
        if (gainSlider) gainSlider.value = String(preset.iso);
        if (readNoiseSlider) readNoiseSlider.value = String(preset.readNoise);
        if (shotNoiseSlider) shotNoiseSlider.value = String(preset.shotNoiseScale);

        if (exposureValue) exposureValue.textContent = String(preset.exposureMs);
        if (gainValue) gainValue.textContent = String(preset.iso);
        if (readNoiseValue) readNoiseValue.textContent = preset.readNoise.toFixed(1);
        if (shotNoiseValue) shotNoiseValue.textContent = preset.shotNoiseScale.toFixed(1);

        applyVisibleCameraControlValues();
    }

    function setSensor(mode) {
        const html = document.documentElement;
        const btns = sensorBar ? sensorBar.querySelectorAll('.sensor-btn') : [];
        const thermalApi = getThermalApi();
        const visibleApi = getVisibleCameraApi();

        if (mode === 'thermal') {
            html.setAttribute('data-sensor', 'thermal');
            localStorage.setItem('sensor', 'thermal');
            // Start heat simulation if available
            if (thermalApi && thermalApi.start) {
                thermalApi.start();
            }
            if (visibleApi && visibleApi.stop) {
                visibleApi.stop();
            }
            // Show thermal controls
            if (thermalControls) {
                thermalControls.style.display = 'block';
                thermalControls.setAttribute('aria-hidden', 'false');
            }
            if (visibleCameraControls) {
                visibleCameraControls.style.display = 'none';
                visibleCameraControls.setAttribute('aria-hidden', 'true');
            }
            applyThermalControlValues();
        } else {
            html.setAttribute('data-sensor', 'visible');
            localStorage.setItem('sensor', 'visible');
            if (thermalApi && thermalApi.stop) {
                thermalApi.stop();
            }
            if (visibleApi && visibleApi.start) {
                visibleApi.start();
            }
            if (thermalControls) {
                thermalControls.style.display = 'none';
                thermalControls.setAttribute('aria-hidden', 'true');
            }
            if (visibleCameraControls) {
                visibleCameraControls.style.display = 'block';
                visibleCameraControls.setAttribute('aria-hidden', 'false');
            }
            applyVisibleCameraControlValues();
        }

        updateSensorAvatars(mode);

        // Update active button
        btns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sensorMode === mode);
        });
    }

    // Sensor bar button clicks
    if (sensorBar) {
        sensorBar.querySelectorAll('.sensor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setSensor(btn.dataset.sensorMode);
            });
        });
    }

    // Tagline "feeling the heat" trigger
    // (Note: Element might not exist if removed, but keeping logic safe)
    if (thermalTrigger) {
        thermalTrigger.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-sensor');
            setSensor(current === 'thermal' ? 'visible' : 'thermal');
        });
    }

    // Always start on thermal mode on initial load/refresh.
    setSensor('thermal');

    /* ── Thermal Controls Integration ── */
    if (thermalControls) {
        // Toggle button for collapsing/expanding controls
        const toggleBtn = document.getElementById('thermal-controls-toggle');
        const controlsContent = document.getElementById('thermal-controls-content');

        if (toggleBtn && controlsContent) {
            toggleBtn.addEventListener('click', () => {
                controlsContent.classList.toggle('collapsed');
            });
        }

        // Diffusion rate slider
        const diffSlider = document.getElementById('diff-slider');
        const diffValue = document.getElementById('diff-value');
        if (diffSlider && diffValue) {
            diffSlider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                diffValue.textContent = val.toFixed(2);
                const thermalApi = getThermalApi();
                if (thermalApi && thermalApi.setParameter) {
                    thermalApi.setParameter('diffusivity', val);
                }
            });
        }

        // Decay rate slider
        const decaySlider = document.getElementById('decay-slider');
        const decayValue = document.getElementById('decay-value');
        if (decaySlider && decayValue) {
            decaySlider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                decayValue.textContent = val.toFixed(3);
                const thermalApi = getThermalApi();
                if (thermalApi && thermalApi.setParameter) {
                    thermalApi.setParameter('decay', val);
                }
            });
        }

        // Heat intensity slider
        const intensitySlider = document.getElementById('intensity-slider');
        const intensityValue = document.getElementById('intensity-value');
        if (intensitySlider && intensityValue) {
            intensitySlider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                intensityValue.textContent = val.toFixed(1);
                const thermalApi = getThermalApi();
                if (thermalApi && thermalApi.setParameter) {
                    thermalApi.setParameter('mouseIntensity', val);
                }
            });
        }

        // Heat radius slider
        const radiusSlider = document.getElementById('radius-slider');
        const radiusValue = document.getElementById('radius-value');
        if (radiusSlider && radiusValue) {
            radiusSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                radiusValue.textContent = val;
                const thermalApi = getThermalApi();
                if (thermalApi && thermalApi.setParameter) {
                    thermalApi.setParameter('mouseRadius', val);
                }
            });
        }

        // Colormap buttons
        const colormapButtons = thermalControls.querySelectorAll('.colormap-btn');
        colormapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const colormap = btn.dataset.colormap;
                const thermalApi = getThermalApi();
                if (thermalApi && thermalApi.setColormap) {
                    thermalApi.setColormap(colormap);
                }

                // Update active state
                colormapButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    /* ── Visible Camera Controls Integration ── */
    if (visibleCameraControls) {
        const toggleBtn = document.getElementById('visible-camera-controls-toggle');
        const controlsContent = document.getElementById('visible-camera-controls-content');

        if (toggleBtn && controlsContent) {
            toggleBtn.addEventListener('click', () => {
                controlsContent.classList.toggle('collapsed');
            });
        }

        const exposureSlider = document.getElementById('exposure-slider');
        const exposureValue = document.getElementById('exposure-value');
        if (exposureSlider && exposureValue) {
            exposureSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                exposureValue.textContent = String(val);
                const api = getVisibleCameraApi();
                if (api && api.setParameter) {
                    api.setParameter('exposureMs', val);
                }
            });
        }

        const gainSlider = document.getElementById('gain-slider');
        const gainValue = document.getElementById('gain-value');
        if (gainSlider && gainValue) {
            gainSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                gainValue.textContent = String(val);
                const api = getVisibleCameraApi();
                if (api && api.setParameter) {
                    api.setParameter('iso', val);
                }
            });
        }

        const readNoiseSlider = document.getElementById('read-noise-slider');
        const readNoiseValue = document.getElementById('read-noise-value');
        if (readNoiseSlider && readNoiseValue) {
            readNoiseSlider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                readNoiseValue.textContent = val.toFixed(1);
                const api = getVisibleCameraApi();
                if (api && api.setParameter) {
                    api.setParameter('readNoise', val);
                }
            });
        }

        const shotNoiseSlider = document.getElementById('shot-noise-slider');
        const shotNoiseValue = document.getElementById('shot-noise-value');
        if (shotNoiseSlider && shotNoiseValue) {
            shotNoiseSlider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                shotNoiseValue.textContent = val.toFixed(1);
                const api = getVisibleCameraApi();
                if (api && api.setParameter) {
                    api.setParameter('shotNoiseScale', val);
                }
            });
        }

        const cleanPresetButton = document.getElementById('visible-clean-preset');
        const noisyPresetButton = document.getElementById('visible-noisy-preset');
        if (noisyPresetButton) {
            noisyPresetButton.addEventListener('click', () => {
                setVisiblePreset('noisy');
            });
        }
        if (cleanPresetButton) {
            cleanPresetButton.addEventListener('click', () => {
                setVisiblePreset('clean');
            });
        }
    }
})();
