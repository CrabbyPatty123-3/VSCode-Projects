// Slider functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Set initial slider width
slider.style.width = `${slides.length * 100}%`;

// Previous slide button
prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : slides.length - 1;
    updateSlider();
});

// Next slide button
nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex < slides.length - 1) ? slideIndex + 1 : 0;
    updateSlider();
});

function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * 100 / slides.length}%)`;
}

// Auto slide every 5 seconds
setInterval(() => {
    slideIndex = (slideIndex < slides.length - 1) ? slideIndex + 1 : 0;
    updateSlider();
}, 5000);

// Responsive Filters
const filterToggle = document.getElementById('filterToggle');
const filterContainer = document.getElementById('filterContainer');
const toggleIcon = document.querySelector('.toggle-icon');

// Function to check window width and adjust filters visibility
function adjustFiltersVisibility() {
    if (window.innerWidth <= 768) {
        // Mobile view - collapsed filters by default
        filterContainer.classList.add('collapsed');
        toggleIcon.style.transform = 'rotate(-90deg)';
    } else {
        // Desktop view - expanded filters by default
        filterContainer.classList.remove('collapsed');
        toggleIcon.style.transform = 'rotate(0deg)';
    }
}

// Toggle filters visibility on mobile
filterToggle.addEventListener('click', () => {
    filterContainer.classList.toggle('collapsed');
    
    // Toggle the arrow icon
    if (filterContainer.classList.contains('collapsed')) {
        toggleIcon.style.transform = 'rotate(-90deg)';
    } else {
        toggleIcon.style.transform = 'rotate(0deg)';
    }
});

// Check window width on load and resize
window.addEventListener('load', adjustFiltersVisibility);
window.addEventListener('resize', adjustFiltersVisibility);

// Filter functionality
const filterBtn = document.querySelector('.filter-btn');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const priceInputs = document.querySelectorAll('.price-input');
const carCards = document.querySelectorAll('.car-card');

// Apply filters when button is clicked
filterBtn.addEventListener('click', applyFilters);

function applyFilters() {
    // Get selected brands
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());
    
    // Get selected types
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());
    
    // Get selected years
    const selectedYears = Array.from(document.querySelectorAll('input[name="year"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());
    
    // Get price range
    const minPrice = parseInt(document.querySelectorAll('.price-input')[0].value) || 0;
    const maxPrice = parseInt(document.querySelectorAll('.price-input')[1].value) || Infinity;
    
    // Loop through all car cards
    carCards.forEach(card => {
        const title = card.querySelector('.car-title').textContent.toLowerCase();
        const price = parseInt(card.querySelector('.car-price').textContent.replace(/[^0-9]/g, ''));
        
        // Check brand filter
        let matchesBrand = selectedBrands.length === 0; // If no brands selected, all match
        
        for (const brand of selectedBrands) {
            if (title.includes(brand)) {
                matchesBrand = true;
                break;
            }
        }
        
        // Check type filter
        let matchesType = selectedTypes.length === 0; // If no types selected, all match
        
        for (const type of selectedTypes) {
            if (title.includes(type)) {
                matchesType = true;
                break;
            }
        }
        
        // Check year filter (simplified for demo)
        let matchesYear = selectedYears.length === 0; // If no years selected, all match
        
        if (selectedYears.length > 0) {
            const year = parseInt(title.match(/\d{4}/)[0]);
            
            for (const yearRange of selectedYears) {
                if (yearRange === '2020+' && year >= 2020) {
                    matchesYear = true;
                    break;
                } else if (yearRange === '2015-2019' && year >= 2015 && year <= 2019) {
                    matchesYear = true;
                    break;
                } else if (yearRange === '2010-2014' && year >= 2010 && year <= 2014) {
                    matchesYear = true;
                    break;
                } else if (yearRange === '2005-2009' && year >= 2005 && year <= 2009) {
                    matchesYear = true;
                    break;
                } else if (yearRange === 'older' && year <= 2004) {
                    matchesYear = true;
                    break;
                }
            }
        }
        
        // Check price filter
        const matchesPrice = price >= minPrice && price <= maxPrice;
        
        // Show/hide card based on all filters
        if (matchesBrand && matchesType && matchesYear && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Reset filters functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add a reset button if it doesn't exist
    if (!document.querySelector('.reset-btn')) {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'filter-btn reset-btn';
        resetBtn.style.marginTop = '10px';
        resetBtn.style.backgroundColor = '#999';
        resetBtn.textContent = 'Reset Filters';
        
        // Insert it after the apply button
        filterBtn.parentNode.insertBefore(resetBtn, filterBtn.nextSibling);
        
        // Add event listener
        resetBtn.addEventListener('click', resetFilters);
    }
});

function resetFilters() {
    // Uncheck all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear price inputs
    priceInputs.forEach(input => {
        input.value = '';
    });
    
    // Show all car cards
    carCards.forEach(card => {
        card.style.display = 'block';
    });
}