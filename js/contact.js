// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const fullName = formData.get('fullName').trim();
        const phone = formData.get('phone').trim();
        const message = formData.get('message').trim();
        
        // Validation
        if (!validateForm(fullName, phone, message)) {
            return;
        }
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Validation functions
    function validateForm(fullName, phone, message) {
        let isValid = true;
        
        // Validate full name
        if (fullName.length < 2) {
            showFieldError('fullName', 'Họ tên phải có ít nhất 2 ký tự');
            isValid = false;
        }
        
        // Validate phone number (Vietnamese format)
        const phoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;
        if (!phoneRegex.test(phone)) {
            showFieldError('phone', 'Số điện thoại không hợp lệ');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            showFieldError('message', 'Nội dung phải có ít nhất 10 ký tự');
            isValid = false;
        }
        
        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'fullName':
                if (value.length < 2) {
                    showFieldError(fieldName, 'Họ tên phải có ít nhất 2 ký tự');
                }
                break;
            case 'phone':
                const phoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;
                if (!phoneRegex.test(value)) {
                    showFieldError(fieldName, 'Số điện thoại không hợp lệ');
                }
                break;
            case 'message':
                if (value.length < 10) {
                    showFieldError(fieldName, 'Nội dung phải có ít nhất 10 ký tự');
                }
                break;
        }
    }

    function showFieldError(fieldName, message) {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        const errorElement = contactForm.querySelector(`[data-error="${fieldName}"]`) || createErrorElement(fieldName);
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#ff6b6b';
    }

    function clearFieldError(field) {
        const fieldName = field.name;
        const errorElement = contactForm.querySelector(`[data-error="${fieldName}"]`);
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        field.style.borderColor = '#ddd';
    }

    function createErrorElement(fieldName) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.setAttribute('data-error', fieldName);
        errorElement.style.cssText = `
            color: #ff6b6b;
            font-size: 0.9rem;
            margin-top: 5px;
            display: none;
        `;
        
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        formGroup.appendChild(errorElement);
        
        return errorElement;
    }

    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            background-color: #51cf66;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
        `;
        successMessage.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.';
        
        // Insert success message after form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 5000);
    }

    // Phone number formatting
    const phoneInput = contactForm.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            // Format Vietnamese phone number
            if (value.startsWith('84')) {
                value = '0' + value.substring(2);
            }
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            e.target.value = value;
        });
    }

    // Character counter for message
    const messageTextarea = contactForm.querySelector('#message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
        `;
        
        messageTextarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = messageTextarea.value.length;
            counter.textContent = `${length}/500 ký tự`;
            
            if (length > 450) {
                counter.style.color = '#ff6b6b';
            } else {
                counter.style.color = '#666';
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
}); 

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 

// Show more gallery images (4 ảnh mỗi lần)
const showMoreBtn = document.querySelector('.show-more-btn');
if (showMoreBtn) {
  showMoreBtn.addEventListener('click', function() {
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    for (let i = 0; i < 4 && i < hiddenItems.length; i++) {
      hiddenItems[i].classList.remove('hidden');
    }
    // Nếu không còn ảnh ẩn thì ẩn nút
    if (document.querySelectorAll('.gallery-item.hidden').length === 0) {
      showMoreBtn.style.display = 'none';
    }
  });
} 