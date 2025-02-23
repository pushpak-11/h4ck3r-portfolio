// public/assets/js/custom.js

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all animations
    function initializeAnimations() {
        // Typewriter functionality
        function initTypewriter() {
            const dynamicWordsEl = document.getElementById("dynamicWords");
            if (!dynamicWordsEl) {
                setTimeout(initTypewriter, 100);
                return;
            }

            const phrases = [
                "Ethical Hacking Done Right",
                "Cybersecurity Solutions That Matter",
                "Defending Your Digital Frontier",
                "Innovative Security Strategies",
                "Protecting Your Digital Assets"
            ];

            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let isWaiting = false;

            function type() {
                const currentPhrase = phrases[phraseIndex];
                
                if (isDeleting) {
                    dynamicWordsEl.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    dynamicWordsEl.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                }

                dynamicWordsEl.textContent += "|";

                let typeSpeed = isDeleting ? 50 : 100;

                if (!isDeleting && charIndex === currentPhrase.length) {
                    isWaiting = true;
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 500;
                }

                setTimeout(type, typeSpeed);
            }

            type();
        }

        // Counter animation
        function initCounters() {
            const counters = document.querySelectorAll('[data-counter-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-counter-target'));
                if (!isNaN(target)) {
                    let current = 0;
                    const interval = setInterval(() => {
                        if (current < target) {
                            current += Math.ceil(target / 100);
                            if (current > target) current = target;
                            counter.textContent = current.toLocaleString();
                        } else {
                            clearInterval(interval);
                        }
                    }, 20);
                }
            });
        }

        // Logo animation
        function initLogoAnimation() {
            const logo = document.getElementById('hacker-logo');
            if (!logo) return;
            
            // Initial setup
            logo.style.display = 'flex';
            logo.style.opacity = '0';
            logo.style.transform = 'translate3d(50px, 20px, 0) rotate(5deg)';
            logo.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            requestAnimationFrame(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
            });
        }

        // Start all animations in sequence
        initTypewriter();
        setTimeout(initLogoAnimation, 300);
        setTimeout(initCounters, 1000);
    }

    // Start everything
    initializeAnimations();
});