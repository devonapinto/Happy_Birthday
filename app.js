/**
 * Happy Birthday Website for Navarag - Interactive JavaScript (FIXED VERSION)
 * Features: Typing effects, animations, music, photo uploads, countdown timer
 * Mobile-responsive with touch support
 */

// Birthday data and configuration
const birthdayConfig = {
    name: "Navarag",
    age: 24,
    birthdayDate: new Date('2025-09-30T00:00:00'),
    quotes: [
        "Another year older, another year wiser, and another year more awesome!",
        "May your birthday be filled with laughter, joy, and all your favorite things!",
        "Cheers to 24 years of being incredible!",
        "Here's to another year of adventures and amazing memories!",
        "Happy Birthday to someone who makes the world brighter just by being in it!",
        "Age is merely mind over matter. If you don't mind, it doesn't matter!",
        "Count your life by smiles, not tears. Count your age by friends, not years.",
        "The more you praise and celebrate your life, the more there is in life to celebrate!"
    ],
    colors: ['#FFD700', '#8A2BE2', '#FF69B4', '#FFA500']
};

// Global variables
let currentQuoteIndex = 0;
let quoteInterval;
let musicPlaying = false;
let countdownInterval;
let typingComplete = false;
let loadingComplete = false;

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Ensure loading screen is visible initially
    showLoadingScreen();
    
    // Start loading sequence with proper timing
    setTimeout(() => {
        initializeApp();
    }, 3000); // Give loading screen time to be seen
});

/**
 * Show loading screen initially
 */
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        loadingScreen.classList.remove('hidden');
        console.log('📱 Loading screen displayed');
    }
}

/**
 * Main initialization function
 */
function initializeApp() {
    console.log('🎉 Starting birthday website initialization...');
    
    // Hide loading screen first
    hideLoadingScreen();
    
    // Initialize all features with proper delays
    setTimeout(() => {
        initializeTypingEffect();
    }, 500);
    
    setTimeout(() => {
        initializeAgeCounter();
    }, 1000);
    
    setTimeout(() => {
        initializeFloatingBalloons();
        initializeParticleBackground();
        initializePhotoGallery();
        initializeQuotesCarousel();
        initializeMusicPlayer();
        initializeGiftBoxes();
        initializeCountdownTimer();
        initializeCelebrationButton();
        initializeScrollAnimations();
    }, 1500);
    
    setTimeout(() => {
        createConfettiOnLoad();
    }, 3000);
    
    loadingComplete = true;
    console.log('🎂 Birthday website initialized for ' + birthdayConfig.name + '!');
}

/**
 * Loading Screen Management (FIXED)
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('🔄 Hiding loading screen...');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }
}

/**
 * Typing Effect for Main Title (FIXED)
 */
function initializeTypingEffect() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const textToType = `Happy Birthday ${birthdayConfig.name}! 🎂`;
    let charIndex = 0;
    
    // Clear existing text
    typedTextElement.textContent = '';
    
    function typeCharacter() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            // Slower typing for better visibility
            setTimeout(typeCharacter, 150);
        } else {
            typingComplete = true;
            console.log('✍️ Typing effect completed');
            // Remove cursor after typing is complete
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';
            }, 3000);
        }
    }
    
    // Start typing effect
    console.log('✍️ Starting typing effect...');
    typeCharacter();
}

/**
 * Age Counter Animation (FIXED)
 */
function initializeAgeCounter() {
    const ageCounterElement = document.getElementById('age-counter');
    if (!ageCounterElement) return;
    
    let currentAge = 0;
    
    function incrementAge() {
        if (currentAge < birthdayConfig.age) {
            ageCounterElement.textContent = currentAge;
            currentAge++;
            // Slower increment for better visibility
            setTimeout(incrementAge, 150);
        } else {
            ageCounterElement.textContent = birthdayConfig.age;
            console.log('🔢 Age counter animation completed: ' + birthdayConfig.age);
        }
    }
    
    // Start age counter after typing effect begins
    console.log('🔢 Starting age counter animation...');
    incrementAge();
}

/**
 * Floating Balloons with Click-to-Pop Functionality
 */
function initializeFloatingBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach((balloon, index) => {
        // Add click/touch event for popping
        balloon.addEventListener('click', function(e) {
            e.preventDefault();
            popBalloon(this);
        });
        
        // Add touch support for mobile
        balloon.addEventListener('touchstart', function(e) {
            e.preventDefault();
            popBalloon(this);
        });
        
        // Random animation delay for more natural movement
        balloon.style.animationDelay = Math.random() * 2 + 's';
        
        // Mouse follow effect on desktop
        if (!isMobileDevice()) {
            balloon.addEventListener('mousemove', function(e) {
                followMouse(this, e);
            });
        }
    });
    
    console.log('🎈 Floating balloons initialized');
}

/**
 * Pop balloon animation with sound effect
 */
function popBalloon(balloon) {
    balloon.classList.add('popped');
    createConfetti(balloon.getBoundingClientRect());
    
    // Play pop sound (simulated with Web Audio API)
    playPopSound();
    
    console.log('💥 Balloon popped!');
    
    // Respawn balloon after 3 seconds
    setTimeout(() => {
        balloon.classList.remove('popped');
        console.log('🎈 Balloon respawned');
    }, 3000);
}

/**
 * Simulate pop sound using Web Audio API
 */
function playPopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio context not supported');
    }
}

/**
 * Mouse follow effect for balloons
 */
function followMouse(balloon, event) {
    const rect = balloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * 0.1;
    const deltaY = (event.clientY - centerY) * 0.1;
    
    balloon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    
    // Reset position after mouse leaves
    setTimeout(() => {
        balloon.style.transform = '';
    }, 1000);
}

/**
 * Particle Background Animation
 */
function initializeParticleBackground() {
    const particlesContainer = document.getElementById('particles-background');
    if (!particlesContainer) return;
    
    const particleCount = isMobileDevice() ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    console.log('✨ Particle background initialized');
}

/**
 * Create individual particle
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size and position
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    // Random color from theme
    const color = birthdayConfig.colors[Math.floor(Math.random() * birthdayConfig.colors.length)];
    particle.style.backgroundColor = color;
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    container.appendChild(particle);
}

/**
 * Photo Gallery with Fullscreen Modal
 */
function initializePhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item img');
    
    photoItems.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src);
        });
    });
    
    console.log('🖼️ Photo gallery initialized with static images.');
}

/**
 * Open image in modal for fullscreen view
 */
function openImageModal(imageSrc) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop">
                <img class="modal-image" alt="Fullscreen image">
                <button class="modal-close">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', closeImageModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', function(e) {
            if (e.target === this) closeImageModal();
        });
    }
    
    // Show modal with image
    modal.querySelector('.modal-image').src = imageSrc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Close image modal
 */
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Quotes Carousel Functionality
 */
function initializeQuotesCarousel() {
    const quotes = document.querySelectorAll('.quote-card');
    const dotsContainer = document.getElementById('quote-dots');
    const prevButton = document.getElementById('quote-prev');
    const nextButton = document.getElementById('quote-next');
    
    if (!quotes.length || !dotsContainer || !prevButton || !nextButton) return;
    
    // Create dots for navigation
    quotes.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'quote-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showQuote(index));
        dotsContainer.appendChild(dot);
    });
    
    // Navigation buttons
    prevButton.addEventListener('click', () => {
        currentQuoteIndex = currentQuoteIndex > 0 ? currentQuoteIndex - 1 : quotes.length - 1;
        showQuote(currentQuoteIndex);
    });
    
    nextButton.addEventListener('click', () => {
        currentQuoteIndex = currentQuoteIndex < quotes.length - 1 ? currentQuoteIndex + 1 : 0;
        showQuote(currentQuoteIndex);
    });
    
    // Auto-rotate quotes every 5 seconds
    startQuoteRotation();
    
    // Touch/swipe support for mobile
    if (isMobileDevice()) {
        initializeQuoteSwipe();
    }
    
    console.log('💬 Quotes carousel initialized');
}

/**
 * Show specific quote
 */
function showQuote(index) {
    const quotes = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.quote-dot');
    
    // Hide all quotes
    quotes.forEach(quote => quote.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected quote
    if (quotes[index] && dots[index]) {
        quotes[index].classList.add('active');
        dots[index].classList.add('active');
        currentQuoteIndex = index;
    }
}

/**
 * Start automatic quote rotation
 */
function startQuoteRotation() {
    quoteInterval = setInterval(() => {
        const nextIndex = currentQuoteIndex < birthdayConfig.quotes.length - 1 ? currentQuoteIndex + 1 : 0;
        showQuote(nextIndex);
    }, 5000);
}

/**
 * Stop quote rotation
 */
function stopQuoteRotation() {
    if (quoteInterval) {
        clearInterval(quoteInterval);
    }
}

/**
 * Touch/swipe support for quotes on mobile
 */
function initializeQuoteSwipe() {
    const quotesCarousel = document.querySelector('.quotes-carousel');
    if (!quotesCarousel) return;
    
    let startX = 0;
    let endX = 0;
    
    quotesCarousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        stopQuoteRotation(); // Stop auto-rotation during user interaction
    });
    
    quotesCarousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        setTimeout(startQuoteRotation, 2000); // Resume auto-rotation
    });
    
    function handleSwipe() {
        const difference = startX - endX;
        const threshold = 50;
        
        if (Math.abs(difference) > threshold) {
            if (difference > 0) {
                // Swipe left - next quote
                currentQuoteIndex = currentQuoteIndex < birthdayConfig.quotes.length - 1 ? currentQuoteIndex + 1 : 0;
            } else {
                // Swipe right - previous quote
                currentQuoteIndex = currentQuoteIndex > 0 ? currentQuoteIndex - 1 : birthdayConfig.quotes.length - 1;
            }
            showQuote(currentQuoteIndex);
        }
    }
}

/**
 * Music Player Functionality
 */
function initializeMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (!musicToggle || !playPauseBtn) return;
    
    // Music toggle button
    musicToggle.addEventListener('click', toggleMusic);
    playPauseBtn.addEventListener('click', toggleMusic);
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            console.log('🔊 Volume set to:', this.value);
        });
    }
    
    // Start visualizer animation
    startMusicVisualizer();
    
    console.log('🎵 Music player initialized');
}

/**
 * Toggle music playback
 */
function toggleMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const toggleText = musicToggle.querySelector('span');
    const audio = document.getElementById('birthday-audio');
    const playIcon = playPauseBtn.querySelector('i');
    
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        audio.play().catch(e => {
            console.error("Audio play failed:", e);
        });
        if (toggleText) toggleText.textContent = 'Pause Music';
        if (playIcon) playIcon.className = 'fas fa-pause';
        console.log('🎵 Music started playing');
    } else {
        if (toggleText) toggleText.textContent = 'Play Music';
        if (playIcon) playIcon.className = 'fas fa-play';
        console.log('⏸️ Music paused');
        audio.pause();
    }
    
    // Toggle visualizer animation
    toggleMusicVisualizer();
}

/**
 * Start music visualizer animation
 */
function startMusicVisualizer() {
    const bars = document.querySelectorAll('.music-visualizer .bar');
    
    function animateBars() {
        bars.forEach(bar => {
            const height = Math.random() * 80 + 20;
            bar.style.height = height + 'px';
        });
    }
    
    // Animate bars continuously
    setInterval(animateBars, 200);
}

/**
 * Toggle music visualizer
 */
function toggleMusicVisualizer() {
    const visualizer = document.getElementById('music-visualizer');
    
    if (visualizer) {
        if (musicPlaying) {
            visualizer.style.opacity = '1';
        } else {
            visualizer.style.opacity = '0.3';
        }
    }
}

/**
 * Gift Boxes Interactive Functionality
 */
function initializeGiftBoxes() {
    const giftBoxes = document.querySelectorAll('.gift-box');
    
    giftBoxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            openGiftBox(this);
        });
        
        // Touch support for mobile
        box.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openGiftBox(this);
        });
    });
    
    console.log('🎁 Gift boxes initialized');
}

/**
 * Open gift box animation
 */
function openGiftBox(giftBox) {
    if (!giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');
        createConfetti(giftBox.getBoundingClientRect());
        
        console.log('🎁 Gift box opened!');
        
        // Reset after 3 seconds
        setTimeout(() => {
            giftBox.classList.remove('opened');
        }, 3000);
    }
}

/**
 * Countdown Timer to Birthday (FIXED)
 */
function initializeCountdownTimer() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    console.log('⏰ Countdown timer initialized');
}

/**
 * Update countdown display (FIXED)
 */
function updateCountdown() {
    const now = new Date().getTime();
    const birthdayTime = birthdayConfig.birthdayDate.getTime();
    const difference = birthdayTime - now;
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    } else {
        // Birthday has arrived!
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        
        // Trigger birthday celebration
        if (countdownInterval) {
            clearInterval(countdownInterval);
            celebrateBirthday();
        }
    }
}

/**
 * Birthday celebration when countdown reaches zero
 */
function celebrateBirthday() {
    // Show birthday message
    alert('🎉 HAPPY BIRTHDAY ' + birthdayConfig.name.toUpperCase() + '! 🎂');
    
    // Trigger massive confetti
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createMassiveConfetti();
        }, i * 500);
    }
    
    // Auto-play music if not already playing
    if (!musicPlaying) {
        toggleMusic();
    }
    
    console.log('🎂 BIRTHDAY CELEBRATION ACTIVATED!');
}

/**
 * Celebration Button Functionality
 */
function initializeCelebrationButton() {
    const celebrateBtn = document.getElementById('celebrate-btn');
    
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', function() {
            triggerCelebration();
        });
        
        console.log('🎉 Celebration button initialized');
    }
}

/**
 * Trigger celebration effects
 */
function triggerCelebration() {
    console.log('🎉 CELEBRATION TRIGGERED!');
    
    // Create confetti
    createMassiveConfetti();
    
    // Pop all balloons
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        setTimeout(() => {
            popBalloon(balloon);
        }, index * 200);
    });
    
    // Animate cake
    const cake = document.querySelector('.interactive-cake');
    if (cake) {
        cake.style.animation = 'bounceNumber 1s ease-in-out';
        setTimeout(() => {
            cake.style.animation = '';
        }, 1000);
    }
    
    // Show celebration message
    showCelebrationMessage();
}

/**
 * Show celebration popup message
 */
function showCelebrationMessage() {
    const messages = [
        '🎉 Let\'s party, ' + birthdayConfig.name + '!',
        '🎂 Hope your day is amazing!',
        '🎈 You deserve all the happiness!',
        '✨ Another year of awesomeness!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = randomMessage;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #FFD700, #FF69B4);
        color: #1a1a2e;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: bounceNumber 1s ease-in-out;
        box-shadow: 0 10px 25px rgba(255, 215, 0, 0.5);
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

/**
 * Confetti Animation System
 */
function createConfettiOnLoad() {
    if (loadingComplete) {
        setTimeout(() => {
            createMassiveConfetti();
        }, 500);
    }
}

function createConfetti(sourceRect) {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    const confettiCount = isMobileDevice() ? 20 : 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random size and color
        const size = Math.random() * 8 + 4;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = birthdayConfig.colors[Math.floor(Math.random() * birthdayConfig.colors.length)];
        
        // Position based on source (balloon, gift, etc.)
        if (sourceRect) {
            confetti.style.left = (sourceRect.left + sourceRect.width / 2) + 'px';
            confetti.style.top = sourceRect.top + 'px';
        } else {
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
        }
        
        // Random animation duration
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function createMassiveConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    const confettiCount = isMobileDevice() ? 50 : 100;
    
    console.log('🎊 Creating massive confetti!');
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            const size = Math.random() * 10 + 6;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = birthdayConfig.colors[Math.floor(Math.random() * birthdayConfig.colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * Utility Functions
 */

/**
 * Detect if user is on mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Window resize handler
 */
window.addEventListener('resize', debounce(function() {
    // Recalculate particle positions on resize
    if (!isMobileDevice()) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
        });
    }
}, 250));

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (e.target.closest('.quotes-section')) {
                e.preventDefault();
                document.getElementById('quote-prev').click();
            }
            break;
        case 'ArrowRight':
            if (e.target.closest('.quotes-section')) {
                e.preventDefault();
                document.getElementById('quote-next').click();
            }
            break;
        case ' ':
            if (e.target.closest('.music-section')) {
                e.preventDefault();
                toggleMusic();
            }
            break;
        case 'Enter':
            if (e.target.classList.contains('balloon')) {
                e.preventDefault();
                popBalloon(e.target);
            }
            break;
    }
});

/**
 * Add modal styles dynamically for image viewer
 */
const modalStyles = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .modal-backdrop {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 10px;
    }
    
    @media (max-width: 768px) {
        .modal-close {
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

// Add modal styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

/**
 * Performance monitoring (for development)
 */
if (window.performance && window.performance.mark) {
    window.performance.mark('birthday-app-loaded');
    console.log('🚀 Birthday app performance metrics available');
}

/**
 * Error handling for graceful degradation
 */
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
    // Continue with basic functionality even if some features fail
});

/**
 * Service Worker registration for offline functionality (optional)
 */
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/sw.js').catch(function() {
        console.log('Service worker registration not available');
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        birthdayConfig,
        isMobileDevice,
        createConfetti,
        toggleMusic
    };
}

console.log('🎂 Happy Birthday JavaScript loaded successfully! (FIXED VERSION)');
console.log('👋 Built with ❤️ for ' + birthdayConfig.name + '\'s special day!');