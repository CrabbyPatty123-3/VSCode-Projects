document.addEventListener('DOMContentLoaded', function() {
    // Price Range Slider Functionality
    const priceSlider = document.querySelector('.price-slider');
    const minPriceInput = document.querySelector('.price-inputs input:first-child');
    const maxPriceInput = document.querySelector('.price-inputs input:last-child');

    if (priceSlider && minPriceInput && maxPriceInput) {
        priceSlider.addEventListener('input', function() {
            const value = this.value;
            maxPriceInput.value = value;
        });

        minPriceInput.addEventListener('input', function() {
            if (parseInt(this.value) > parseInt(maxPriceInput.value)) {
                this.value = maxPriceInput.value;
            }
            priceSlider.min = this.value;
        });

        maxPriceInput.addEventListener('input', function() {
            if (parseInt(this.value) < parseInt(minPriceInput.value)) {
                this.value = minPriceInput.value;
            }
            priceSlider.max = this.value;
        });
    }

    // Filter Functionality
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const carCards = document.querySelectorAll('.car-card');
    const brandCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');
    const yearSelect = document.querySelector('.year-select');
    const mileageSelect = document.querySelector('.mileage-select');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Get selected brands
            const selectedBrands = Array.from(brandCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.parentElement.textContent.trim());

            // Get selected year
            const selectedYear = yearSelect.value;

            // Get selected mileage
            const selectedMileage = mileageSelect.value;

            // Filter cars
            carCards.forEach(card => {
                const carTitle = card.querySelector('h3').textContent;
                const carMileage = card.querySelector('.mileage').textContent;
                const carYear = carTitle.match(/\d{4}/)[0];

                let showCard = true;

                // Check brand filter
                if (selectedBrands.length > 0) {
                    showCard = selectedBrands.some(brand => carTitle.includes(brand));
                }

                // Check year filter
                if (selectedYear && showCard) {
                    showCard = carYear === selectedYear;
                }

                // Check mileage filter
                if (selectedMileage && showCard) {
                    const mileage = parseInt(carMileage.replace(/[^0-9]/g, ''));
                    showCard = mileage <= parseInt(selectedMileage);
                }

                // Show/hide card
                card.style.display = showCard ? 'block' : 'none';
            });
        });
    }

    // Buy Now and Add to Cart Functionality
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const carCard = this.closest('.car-card');
            const carName = carCard.querySelector('h3').textContent;
            alert(`Thank you for your interest in the ${carName}! Our sales team will contact you shortly.`);
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const carCard = this.closest('.car-card');
            const carName = carCard.querySelector('h3').textContent;
            alert(`${carName} has been added to your cart!`);
        });
    });

    // FAQ Toggle Functionality (for support page)
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.toggle-faq');
            
            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                toggle.textContent = '+';
            } else {
                answer.style.display = 'block';
                toggle.textContent = '-';
            }
        });
    });

    // Contact Form Submission (for support page)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! Our support team will contact you shortly.');
            this.reset();
        });
    }
});