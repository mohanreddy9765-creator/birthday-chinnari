// ==========================================
// 💛 FRIEND BIRTHDAY SETTINGS
// Change this value only —
// the entire website updates automatically.
// ==========================================

const birthdaySettings = {
    name: "Chinnari",
};

// ==========================================
// Everything below uses the settings above.
// You do NOT need to edit anything else.
// ==========================================

(function () {
    'use strict';

    const settings = birthdaySettings;
    const personName = (settings.name || "Friend").trim() || "Friend";

    /* ---------- 1. Apply name everywhere ---------- */
    function applyName() {
        document.querySelectorAll('[data-birthday-name]').forEach((el) => {
            el.textContent = personName;
        });
        document.title = `Happy Birthday ${personName} 🎉`;
    }

    /* ---------- 2. Typing effect on opening screen ---------- */
    const line1Text = "Today is not just another day...";
    const line2Text = "It's your day to shine 🎂✨";
    const line1El = document.getElementById('typing-line-1');
    const line2El = document.getElementById('typing-line-2');
    const openBtn = document.getElementById('open-surprise-btn');

    if (openBtn) openBtn.style.opacity = '0';

    function typeText(el, text, speed) {
        return new Promise((resolve) => {
            if (!el) return resolve();
            let i = 0;
            el.classList.remove('done');
            const timer = setInterval(() => {
                el.textContent = text.slice(0, ++i);
                if (i >= text.length) {
                    clearInterval(timer);
                    el.classList.add('done');
                    resolve();
                }
            }, speed);
        });
    }

    async function playOpeningSequence() {
        await new Promise((r) => setTimeout(r, 700));
        await typeText(line1El, line1Text, 45);
        await new Promise((r) => setTimeout(r, 400));
        await typeText(line2El, line2Text, 55);
        if (openBtn) {
            openBtn.style.transition = 'opacity .8s ease';
            openBtn.style.opacity = '1';
        }
    }

    /* ---------- 3. Open surprise → reveal main site ---------- */
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            openingScreen.classList.add('fade-out');
            setTimeout(() => {
                openingScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                observeReveals();
                document.getElementById('birthday').scrollIntoView({ behavior: 'smooth' });
                burstConfetti(24);
            }, 650);
        });
    }

    /* ---------- 4. Scroll reveal animations ---------- */
    let revealObserver = null;
    function observeReveals() {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach((el) => el.classList.add('visible'));
            return;
        }
        if (revealObserver) revealObserver.disconnect();
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        els.forEach((el) => revealObserver.observe(el));
    }

    /* ---------- 5. Floating confetti + glowing particles ---------- */
    const CONFETTI = ['💛', '✨', '🎉', '⭐', '🤍', '💐'];
    const fallingLayer = document.getElementById('falling-hearts');
    const particlesLayer = document.getElementById('particles');

    function spawnFallingHearts() {
        if (!fallingLayer) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;
        const isMobile = window.innerWidth < 560;
        const count = isMobile ? 10 : 18;
        fallingLayer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const h = document.createElement('span');
            h.className = 'fall-heart';
            h.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
            h.style.left = Math.random() * 100 + 'vw';
            h.style.fontSize = (12 + Math.random() * 18) + 'px';
            h.style.opacity = (0.35 + Math.random() * 0.5).toFixed(2);
            h.style.animationDuration = (6 + Math.random() * 8) + 's';
            h.style.animationDelay = (Math.random() * 8) + 's';
            fallingLayer.appendChild(h);
        }
    }

    function spawnParticles() {
        if (!particlesLayer) return;
        const count = window.innerWidth < 560 ? 18 : 32;
        particlesLayer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            const size = 3 + Math.random() * 6;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = Math.random() * 100 + 'vh';
            p.style.animationDelay = (Math.random() * 3) + 's';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            particlesLayer.appendChild(p);
        }
    }

    /* ---------- 6. Final surprise: celebration burst ---------- */
    const finaleBtn = document.getElementById('finale-btn');
    const finaleMessage = document.getElementById('finale-message');
    const explosionLayer = document.getElementById('explosion-layer');

    function burstConfetti(n) {
        if (!explosionLayer) return;
        for (let i = 0; i < n; i++) {
            const h = document.createElement('span');
            h.className = 'explosion-heart';
            h.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
            h.style.left = (45 + Math.random() * 10) + 'vw';
            h.style.top = (40 + Math.random() * 15) + 'vh';
            const angle = Math.random() * Math.PI * 2;
            const dist = 120 + Math.random() * 320;
            h.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            h.style.setProperty('--dy', Math.sin(angle) * dist - 120 + 'px');
            h.style.fontSize = (16 + Math.random() * 26) + 'px';
            explosionLayer.appendChild(h);
            setTimeout(() => h.remove(), 1800);
        }
    }
    // Keep old name working for any other callers
    const burstHearts = burstConfetti;

    if (finaleBtn) {
        finaleBtn.addEventListener('click', () => {
            burstConfetti(60);
            setTimeout(() => burstConfetti(40), 400);
            if (finaleMessage) finaleMessage.classList.remove('hidden');
            finaleBtn.textContent = "You're Awesome 🎉";
            setTimeout(() => {
                if (finaleMessage) finaleMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);
        });
    }

    /* ---------- 7. Background music (optional, no autoplay) ---------- */
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const musicLabel = document.getElementById('music-label');
    const audio = document.getElementById('bg-music');

    if (musicBtn && audio) {
        musicBtn.addEventListener('click', async () => {
            try {
                if (audio.paused) {
                    await audio.play();
                    musicBtn.classList.add('playing');
                    musicBtn.setAttribute('aria-pressed', 'true');
                    if (musicIcon) musicIcon.textContent = '💛';
                    if (musicLabel) musicLabel.textContent = 'Playing';
                } else {
                    audio.pause();
                    musicBtn.classList.remove('playing');
                    musicBtn.setAttribute('aria-pressed', 'false');
                    if (musicIcon) musicIcon.textContent = '🎵';
                    if (musicLabel) musicLabel.textContent = 'Music';
                }
            } catch (err) {
                if (musicLabel) musicLabel.textContent = 'Add music.mp3';
                console.warn('Music file missing? Add your song at music/music.mp3', err);
            }
        });
        audio.addEventListener('error', () => {
            if (musicLabel) musicLabel.textContent = 'Add music.mp3';
        });
    }

    /* ---------- 8. Image fallback ---------- */
    function handleImageFallbacks() {
        document.querySelectorAll('[data-memory-img]').forEach((img, idx) => {
            img.addEventListener('error', function onErr() {
                img.removeEventListener('error', onErr);
                img.style.display = 'none';
                const wrap = img.closest('.memory-img-wrap');
                if (wrap && !wrap.querySelector('.img-fallback')) {
                    const div = document.createElement('div');
                    div.className = 'img-fallback';
                    div.innerHTML = '💛<small>Add your photo<br/>images/image' + (idx + 1) + '.jpg</small>';
                    wrap.prepend(div);
                }
            });
            if (img.complete && img.naturalWidth === 0) {
                img.dispatchEvent(new Event('error'));
            }
        });
    }

    /* ---------- 9. Reasons tap-to-reveal ---------- */
    document.querySelectorAll('.reason-card').forEach((card) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('revealed')) return;
            card.classList.add('revealed');
            const msg = card.getAttribute('data-reason');
            card.querySelector('.reason-front').textContent = msg;
            burstConfetti(14);
        });
    });

    /* ---------- 10. Scroll progress bar ---------- */
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        if (!progressBar) return;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        progressBar.style.width = pct + '%';
    }, { passive: true });

    /* ---------- 11. 3D tilt on memory cards (desktop) ---------- */
    document.querySelectorAll('.memory-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 860) return;
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-10px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* ---------- Init ---------- */
    applyName();
    spawnFallingHearts();
    spawnParticles();
    handleImageFallbacks();
    playOpeningSequence();

    window.addEventListener('resize', () => {
        spawnFallingHearts();
        spawnParticles();
    });
})();
