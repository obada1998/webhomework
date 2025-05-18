document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBio = document.getElementById('toggleBio');
    const hiddenBio = document.getElementById('hiddenBio');
    
    if (toggleBio && hiddenBio) {
        toggleBio.addEventListener('click', () => {
            const isExpanded = hiddenBio.classList.toggle('content-expanded');
            toggleBio.textContent = isExpanded ? 'Show Less' : 'Show More';
            toggleBio.setAttribute('aria-expanded', isExpanded);
            
            if (isExpanded) {
                const bioBottom = hiddenBio.getBoundingClientRect().bottom;
                const viewportHeight = window.innerHeight;
                if (bioBottom > viewportHeight) {
                    window.scrollBy({
                        top: bioBottom - viewportHeight + 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        
        const validateRadios = () => {
            const isChecked = [...genderRadios].some(radio => radio.checked);
            genderRadios.forEach(radio => {
                radio.classList.toggle('is-invalid', !isChecked);
            });
            return isChecked;
        };

        const validateInput = (input) => {
            if (input.type === 'radio') return;
            
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
            }
        };

        const validateForm = () => {
            let isValid = form.checkValidity();
            
            if (document.querySelector('input[name="gender"][required]')) {
                isValid = isValid && validateRadios();
            }
            
            return isValid;
        };

        form.querySelectorAll('.form-control, input[type="radio"]').forEach(input => {
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('change', () => validateInput(input)); // For radios
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (validateForm()) {
                form.classList.remove('was-validated');
                form.reset();
                successMessage.classList.remove('d-none');
                
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
            } else {
                form.classList.add('was-validated');
                if (document.querySelector('input[name="gender"][required]')) {
                    validateRadios();
                }
            }
        }, false);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const updateButton = document.getElementById('updateProject');
    let isAlternate = false;

    if (updateButton) {
        updateButton.addEventListener('click', () => {
            const dynamicElements = {
                image: document.getElementById('dynamicImage'),
                title: document.getElementById('dynamicTitle'),
                text: document.getElementById('dynamicText'),
                tech: document.getElementById('dynamicTech')
            };

            if (!isAlternate) {
                dynamicElements.image.src = 'images/4.jpg';
                dynamicElements.title.textContent = 'Mobile Chat Interface';
                dynamicElements.text.textContent = 'Cross-platform mobile implementation of AI chatbot with machine learning.';
                updateButton.textContent = 'View Renting Car System';
            } else {
                dynamicElements.image.src = 'images/2.jpg';
                dynamicElements.title.textContent = 'Renting Car System';
                dynamicElements.text.textContent = 'Flexible automated car rental platform with real-time GPS tracking.';
                updateButton.textContent = 'View Mobile Chat Interface';
            }
            
            isAlternate = !isAlternate;
        });
    }
});

$(document).ready(function() {
    $('#toggleSection').click(function() {
        $('#hiddenMessage').slideToggle(500);
    });

    $('#showImageBtn').click(function() {
        $('#fadeImage').stop(true).fadeIn(1000);
    });

    $('#hideImageBtn').click(function() {
        $('#fadeImage').stop(true).fadeOut(1000);
    });

    $('#fadeImage').click(function() {
        $(this).stop(true).fadeToggle(1000);
    });

    $('#loadContent').click(function() {
        $('#ajaxResult').html('<div class="spinner-border text-light" role="status"></div>');
        
        $.get('quote.txt')
            .done(function(data) {
                const quotes = data.split('\n').filter(quote => quote.trim() !== '');
                const randomIndex = Math.floor(Math.random() * quotes.length);
                $('#ajaxResult').html(`<p class="lead mb-0">"${quotes[randomIndex]}"</p>`);
            })
            .fail(function() {
                $('#ajaxResult').html('<p class="text-danger">Failed to load quotes. Please try again later!</p>');
            });
    });
});

$(document).ready(function() {
    $('#nameInput').on('keyup', function() {
        const name = $(this).val().trim();
        const greeting = name ? `Hello ${name}` : "Hello";
        $('#liveGreeting').text(greeting);
    });

    $('#colorChangeBox').hover(
        function() { 
            $(this).addClass('hover-effect');
        },
        function() { 
            $(this).removeClass('hover-effect');
        }
    );

    $('#animateButton').click(function() {
        $('#animationTarget')
            .addClass('bounce-effect')
            .on('animationend', function() {
                $(this).removeClass('bounce-effect');
            });
    });

    $('#animationTarget').click(function() {
        $(this).animate({
            borderRadius: '75%',
            opacity: 0.5,
            fontSize: '2em'
        }, 1500).animate({
            borderRadius: '100%',
            opacity: 1,
            fontSize: '1em'
        }, 1500);
    });
});