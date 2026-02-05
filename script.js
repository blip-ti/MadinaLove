document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const app = document.getElementById('app');
    const particlesContainer = document.getElementById('particles-container');
    const explosionContainer = document.getElementById('explosion-container');
    const cursorContainer = document.getElementById('cursor-particles');
    const teaseContainer = document.getElementById('tease-container');

    const homeView = document.getElementById('home-view');
    const prankView = document.getElementById('prank-view');
    const successView = document.getElementById('success-view');
    const poeticTextNode = document.getElementById('poetic-text');

    const prankMessage = document.getElementById('prank-message');
    const prankEmoji = document.getElementById('prank-emoji');

    const startTime = Date.now();
    const escapeDuration = 10000;
    let placeholder = null;
    let successActive = false;

    const heartEmojis = ['❤️', '💖', '💝', '💘', '✨', '🌹', '💕', '💌'];
    const teaseMessages = [
        "Не в этот раз! 😉",
        "Промахнулась! 😜",
        "Лови меня! ✨",
        "Хе-хе, нет! 👻",
        "Даже не думай! 💖",
        "Тут занято! 🛑",
        "Мимо! ✨",
        "Старайся лучше! 💪"
    ];

    const successPoem = [
        "Года идут как дни, не видя жизни,",
        "Я счастлив, что мы рядом целый год,",
        "И каждый миг я чувствую надежду,",
        "Надежду в радость, счастье и любовь ❤️"
    ];

    // --- Global Click Burst ---
    document.addEventListener('click', (e) => {
        if (successActive) return; // Let explosion container handle success
        createBurst(e.clientX, e.clientY, 10);
    });

    function createBurst(x, y, count) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.classList.add('particle-heart');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            const size = Math.random() * 20 + 10;
            heart.style.fontSize = `${size}px`;
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 150 + 50;
            const destX = Math.cos(angle) * velocity;
            const destY = Math.sin(angle) * velocity;

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1.5)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.1, 0.8, 0.4, 1)',
                fill: 'forwards'
            });

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1200);
        }
    }

    // --- Cursor Trail ---
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.85) {
            const star = document.createElement('div');
            star.classList.add('cursor-trail');
            star.innerHTML = '✨';
            star.style.left = e.clientX + 'px';
            star.style.top = e.clientY + 'px';
            cursorContainer.appendChild(star);
            setTimeout(() => star.remove(), 800);
        }
    });

    // --- Particle System ---
    function createHeart(container, isExplosion = false, x = '50%', y = '50%') {
        const heart = document.createElement('div');
        heart.classList.add('particle-heart');
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const size = Math.random() * (isExplosion ? 50 : 30) + (isExplosion ? 25 : 10);
        heart.style.fontSize = `${size}px`;

        if (isExplosion) {
            heart.style.left = x;
            heart.style.top = y;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 600 + 300;
            const destX = Math.cos(angle) * velocity;
            const destY = Math.sin(angle) * velocity;

            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(2.5) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1500,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });
        } else {
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-10vh';
            heart.style.animation = `fall ${Math.random() * 4 + 4}s linear forwards`;
            heart.style.opacity = Math.random() * 0.5 + 0.2;
            heart.style.filter = `blur(${Math.random() * 2}px)`;
        }

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }

    setInterval(() => {
        if (!successActive) createHeart(particlesContainer);
    }, 400);

    // --- Success Fountain ---
    function startFountain() {
        if (!successActive) return;
        // Central burst
        for (let i = 0; i < 5; i++) {
            createHeart(explosionContainer, true);
        }
        // Random bursts
        const rx = Math.random() * 100 + '%';
        const ry = Math.random() * 100 + '%';
        createHeart(explosionContainer, true, rx, ry);

        setTimeout(startFountain, 150);
    }

    // --- Teasing Logic ---
    function showTease(x, y) {
        const bubble = document.createElement('div');
        bubble.classList.add('tease-bubble');
        bubble.innerText = teaseMessages[Math.floor(Math.random() * teaseMessages.length)];
        bubble.style.left = x + 'px';
        bubble.style.top = (y - 70) + 'px';
        teaseContainer.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1200);
    }

    // --- Button Logic ---
    noBtn.addEventListener('mouseover', () => {
        const currentTime = Date.now();
        if (currentTime - startTime >= escapeDuration) return;

        if (!placeholder) {
            placeholder = document.createElement('div');
            const rect = noBtn.getBoundingClientRect();
            placeholder.style.width = rect.width + 'px';
            placeholder.style.height = rect.height + 'px';
            placeholder.style.display = 'inline-block';
            noBtn.parentNode.insertBefore(placeholder, noBtn);
            document.body.appendChild(noBtn);
        }

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        const padding = 50;

        const maxX = window.innerWidth - btnWidth - padding;
        const maxY = window.innerHeight - btnHeight - padding;

        if (maxX <= padding || maxY <= padding) return;

        let newX = Math.random() * (maxX - padding) + padding;
        let newY = Math.random() * (maxY - padding) + padding;

        newX = Math.min(Math.max(newX, padding), maxX);
        newY = Math.min(Math.max(newY, padding), maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.margin = '0';
        noBtn.style.zIndex = '100000';
        noBtn.style.transition = 'all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        showTease(newX, newY);
        createBurst(newX + btnWidth / 2, newY + btnHeight / 2, 5);
    });

    noBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerPrank();
    });

    yesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        app.classList.add('shake');
        setTimeout(() => app.classList.remove('shake'), 600);

        successActive = true;
        switchView(successView);

        // Initial grand blast
        for (let i = 0; i < 80; i++) {
            setTimeout(() => createHeart(explosionContainer, true), i * 5);
        }

        startFountain();

        poeticTextNode.innerHTML = successPoem.join('<br>');
        setTimeout(() => poeticTextNode.classList.add('show'), 1500);
    });

    function switchView(targetView) {
        [homeView, prankView, successView].forEach(view => {
            view.classList.remove('active');
        });
        targetView.classList.add('active');
    }

    function triggerPrank() {
        noBtn.style.display = 'none';
        switchView(prankView);
        prankMessage.innerText = 'Ты серьезно? 🤨';
        prankEmoji.innerText = '😡😠😤';

        setTimeout(() => {
            prankMessage.innerText = 'Хахахахах! Так легко повелась? 😂';
            prankMessage.classList.add('swing-animation');
            prankEmoji.innerText = '😜🤡👻';
            prankEmoji.classList.add('swing-animation');

            setTimeout(resetToHome, 5000);
        }, 3000);
    }

    function resetToHome() {
        successActive = false;
        if (placeholder) {
            const buttonGroup = document.querySelector('.button-group');
            if (buttonGroup) buttonGroup.insertBefore(noBtn, placeholder);
            placeholder.remove();
            placeholder = null;
        }
        noBtn.style.display = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.position = 'relative';
        noBtn.style.zIndex = '10';
        poeticTextNode.classList.remove('show');
        switchView(homeView);
        explosionContainer.innerHTML = '';
    }
});
