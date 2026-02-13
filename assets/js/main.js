/* ─────────────────────────────────────────────
   Main JS — Theme toggle, Mobile nav, Pub tabs
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
})();
