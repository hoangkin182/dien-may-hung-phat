// Products Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const productsSlider = document.querySelector('.products-slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (!productsSlider || !prevBtn || !nextBtn) {
        console.log('Products slider elements not found');
        return;
    }

    function getVisibleCount() {
        if (window.innerWidth <= 768) return 2;
        return 4;
    }

    let currentIndex = 0;

    function updateSliderPosition() {
        const visibleCount = getVisibleCount();
        const itemWidth = productItems[0].offsetWidth + 30; // 30 là gap
        const translateX = currentIndex * itemWidth;
        productsSlider.style.transform = `translateX(-${translateX}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= productItems.length - visibleCount;
    }

    function nextProducts() {
        const visibleCount = getVisibleCount();
        if (currentIndex < productItems.length - visibleCount) {
            currentIndex++;
            updateSliderPosition();
        }
    }

    function prevProducts() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    }

    // Add event listeners to navigation buttons
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Prev button clicked');
        prevProducts();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Next button clicked');
        nextProducts();
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            e.preventDefault();
            prevProducts();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            e.preventDefault();
            nextProducts();
        }
    });

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    productsSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    productsSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleProductsSwipe();
    });

    function handleProductsSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && !nextBtn.disabled) {
                // Swipe left - next products
                nextProducts();
            } else if (diff < 0 && !prevBtn.disabled) {
                // Swipe right - previous products
                prevProducts();
            }
        }
    }

    window.addEventListener('resize', function() {
        // Đảm bảo không bị lòi trắng khi resize
        const visibleCount = getVisibleCount();
        if (currentIndex > productItems.length - visibleCount) {
            currentIndex = Math.max(0, productItems.length - visibleCount);
        }
        updateSliderPosition();
    });

    // Initialize slider
    updateSliderPosition();
    
    console.log('Products slider setup complete');
}); 