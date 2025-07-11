// Auto Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (!slides.length || !dots.length) {
        console.log('Slider elements not found');
        return;
    }

    // Function to show a specific slide
    function showSlide(index) {
        // Calculate transform position
        const translateX = -index * 33.333; // Move by slide width percentage
        
        // Apply transform to slider
        const slider = document.querySelector('.slider');
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Activate current dot
        dots[index].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Function to go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetInterval();
    }

    // Function to reset the auto-slide interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetInterval();
        }
    }

    // Start the auto-slide interval
    slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide when user hovers over slider
    sliderContainer.addEventListener('mouseenter', function() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    });

    // Resume auto-slide when user leaves slider
    sliderContainer.addEventListener('mouseleave', function() {
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    });

    // Initialize first slide
    showSlide(0);
    
    console.log('Auto slider initialized');
}); 