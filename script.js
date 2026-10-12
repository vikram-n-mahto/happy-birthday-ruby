/* ==========================================
   Ruby's Birthday Website - Interactive Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ------------------------------------------
       1. Theme Toggle (Dark / Light Mode)
       ------------------------------------------ */
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check saved preference or default to dark
    const savedTheme = localStorage.getItem('ruby_birthday_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ruby_birthday_theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }


    /* ------------------------------------------
       2. Mobile Menu Toggle
       ------------------------------------------ */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    /* ------------------------------------------
       3. Dynamic Countdown to 13 October
       ------------------------------------------ */
    function updateCountdown() {
        const now = new Date();
        let year = now.getFullYear();
        
        // Birthday date is 13 October
        let birthday = new Date(year, 9, 13, 0, 0, 0); // Month 9 is October
        
        if (now > new Date(year, 9, 13, 23, 59, 59)) {
            birthday = new Date(year + 1, 9, 13, 0, 0, 0);
        }

        const diff = birthday - now;

        if (diff <= 0) {
            document.getElementById('countdownCard').innerHTML = '<div style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--primary-pink); padding: 0.5rem 1rem;">🎉 It\'s Ruby\'s Special Day! Happy Birthday! 🎂</div>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    /* ------------------------------------------
       4. Floating Hearts & Particles Generator
       ------------------------------------------ */
    const particlesContainer = document.getElementById('particlesContainer');
    const particleSymbols = ['💖', '✨', '🌸', '⭐', '🎈', '💗'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        
        const duration = Math.random() * 5 + 5;
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Generate initial particles and interval
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 400);
    }
    setInterval(createParticle, 1200);


    /* ------------------------------------------
       5. Interactive Gift Box Surprise
       ------------------------------------------ */
    const giftBoxWrapper = document.getElementById('giftBoxWrapper');
    const giftBox = document.getElementById('giftBox');
    const giftPrompt = document.getElementById('giftPrompt');
    const surpriseReveal = document.getElementById('surpriseReveal');

    let giftOpened = false;

    giftBoxWrapper.addEventListener('click', () => {
        if (!giftOpened) {
            giftOpened = true;
            giftBox.classList.add('opened');
            giftPrompt.style.display = 'none';
            surpriseReveal.classList.remove('hidden');
            
            // Trigger celebratory burst
            triggerCelebrationBurst();
        }
    });


    /* ------------------------------------------
       6. Celebration Confetti Effect
       ------------------------------------------ */
    const celebrateBtn = document.getElementById('celebrateBtn');
    const finalLoveBtn = document.getElementById('finalLoveBtn');

    function triggerCelebrationBurst() {
        for (let i = 0; i < 40; i++) {
            setTimeout(createParticle, i * 50);
        }
    }

    celebrateBtn.addEventListener('click', triggerCelebrationBurst);
    finalLoveBtn.addEventListener('click', () => {
        triggerCelebrationBurst();
        alert('💖 All your love and warm wishes have been sent straight to Ruby! ✨');
    });


    /* ------------------------------------------
       7. Photo Gallery Lightbox Modal
       ------------------------------------------ */
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });


    /* ------------------------------------------
       8. Optional Background Music Toggle
       ------------------------------------------ */
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggle.textContent = '🔊';
                musicToggle.title = 'Pause Music';
            }).catch(error => {
                console.log("Audio playback prevented or file missing:", error);
                alert("🎵 Background music file (audio/birthday-music.mp3) could not be loaded or played automatically. You can add your MP3 file to the audio folder!");
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            musicToggle.textContent = '🎵';
            musicToggle.title = 'Play Birthday Music';
        }
    });

});