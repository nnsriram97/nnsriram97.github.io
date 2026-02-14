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

    /* ── Sensor Mode (Thermal Vision) ── */
    const sensorBar = document.getElementById('sensor-bar');
    const thermalTrigger = document.getElementById('thermal-trigger');
    const thermalControls = document.getElementById('thermal-controls');
    const getThermalApi = () => window.thermalCanvas;
    const sensorAvatars = document.querySelectorAll('.sensor-avatar');

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

    function setSensor(mode) {
        const html = document.documentElement;
        const btns = sensorBar ? sensorBar.querySelectorAll('.sensor-btn') : [];
        const api = getThermalApi();

        if (mode === 'thermal') {
            html.setAttribute('data-sensor', 'thermal');
            localStorage.setItem('sensor', 'thermal');
            // Start heat simulation if available
            if (api && api.start) {
                api.start();
            }
            // Show thermal controls
            if (thermalControls) {
                thermalControls.style.display = 'block';
                thermalControls.setAttribute('aria-hidden', 'false');
            }
            applyThermalControlValues();
        } else {
            html.removeAttribute('data-sensor');
            localStorage.setItem('sensor', '');
            // Stop heat simulation
            if (api && api.stop) {
                api.stop();
            }
            // Hide thermal controls
            if (thermalControls) {
                thermalControls.style.display = 'none';
                thermalControls.setAttribute('aria-hidden', 'true');
            }
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

    // Restore sensor mode from localStorage
    const savedSensor = localStorage.getItem('sensor');
    if (savedSensor === 'thermal') {
        setSensor('thermal');
    }

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
                const api = getThermalApi();
                if (api && api.setParameter) {
                    api.setParameter('diffusivity', val);
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
                const api = getThermalApi();
                if (api && api.setParameter) {
                    api.setParameter('decay', val);
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
                const api = getThermalApi();
                if (api && api.setParameter) {
                    api.setParameter('mouseIntensity', val);
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
                const api = getThermalApi();
                if (api && api.setParameter) {
                    api.setParameter('mouseRadius', val);
                }
            });
        }

        // Colormap buttons
        const colormapButtons = thermalControls.querySelectorAll('.colormap-btn');
        colormapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const colormap = btn.dataset.colormap;
                const api = getThermalApi();
                if (api && api.setColormap) {
                    api.setColormap(colormap);
                }

                // Update active state
                colormapButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
})();
