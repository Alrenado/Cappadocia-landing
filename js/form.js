// Async font load with default swap

if ('fonts' in document) {
    document.fonts.load('1em Balqis').then(function () {
        document.documentElement.classList.add('balqis-loaded');
    });
    document.fonts.load('1em Roboto-Condensed-Light').then(function () {
        document.documentElement.classList.add('roboto-light-loaded');
    });
    document.fonts.load('1em Roboto-Condensed-Regular').then(function () {
        document.documentElement.classList.add('roboto-regular-loaded');
    });
}





// Lazy loading by scroll

document.addEventListener("DOMContentLoaded", function() {
    const lazyBackgrounds = document.querySelectorAll(".lazy-background");
    const lazySvgElements = document.querySelectorAll(".lazy-svg");

    const loadBackground = (element) => {
        const bgWebp = element.getAttribute("data-bg-webp");
        const bgPng = element.getAttribute("data-bg-png");

        const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

        if (webpSupported) {
            element.style.backgroundImage = `url('${bgWebp}')`;
        } else {
            element.style.backgroundImage = `url('${bgPng}')`;
        }

        element.classList.remove("lazy-background");
    };

    const activeSlide = document.querySelector(".carousel-item.active .lazy-background");
    if (activeSlide) {
        loadBackground(activeSlide);
    }
// Lazy loading for my FAVORITE block

    const headerFirst = document.querySelector('.header-content-h1-first');
    const headerSub = document.querySelector('.header-content-h1-sub');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                headerFirst.classList.remove('hidden');
                headerSub.classList.remove('hidden');
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(headerFirst);
    observer.observe(headerSub);

// Lazy loading by scroll - carousel preload on next slide

    $('#text-block-first_carousel').on('slide.bs.carousel', function(event) {
        const nextSlide = event.relatedTarget.querySelector(".lazy-background");
        if (nextSlide) {
            loadBackground(nextSlide);
        }
    });

    $('#text-block-second_carousel').on('slide.bs.carousel', function(event) {
        const nextSlide = event.relatedTarget.querySelector(".lazy-background");
        if (nextSlide) {
            loadBackground(nextSlide);
        }
    });

    $('#text-block-third_carousel').on('slide.bs.carousel', function(event) {
        const nextSlide = event.relatedTarget.querySelector(".lazy-background");
        if (nextSlide) {
            loadBackground(nextSlide);
        }
    });

    const lazyLoad = () => {
        lazyBackgrounds.forEach((element) => {
            if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
                loadBackground(element);
            }
        });
    };

    window.addEventListener("scroll", lazyLoad);
    lazyLoad();


    const lazyLoadSvg = () => {
        lazySvgElements.forEach((element) => {
            if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
                const bgSvg = element.getAttribute("data-bg-svg");
                element.style.backgroundImage = `url('${bgSvg}')`;
                element.classList.add('loaded-background-svg');
                element.classList.remove("lazy-background-svg");
            }
        });
    };

    // window.addEventListener("scroll", lazyLoad);
    window.addEventListener("scroll", lazyLoadSvg);
    window.addEventListener("resize", lazyLoadSvg);

    lazyLoadSvg();
    lazyLoad();

});

// Smooth text visibility

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const elements = document.querySelectorAll('.hidden');

    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Fourth block parallax

document.addEventListener("mousemove", parallax);

function parallax(e) {
    const screenWidth = window.innerWidth;
    if (screenWidth > 767){
        this.querySelectorAll('.text-block-fourth-text_container-parallax_item').forEach(item => {
            const speed = item.getAttribute('data-speed');

            const x = (window.innerWidth - e.pageX * speed) / 90;
            const y = (window.innerHeight - e.pageY * speed) / 70;

            item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        })
    }
}
// Nav overlay

const navbarCollapse = document.querySelector('#navbarSupportedContent');
const overlay = document.querySelector('#overlay');
const navLinks = document.querySelectorAll('.nav-link');
const burgerButton = document.querySelector('.navbar-toggler');

burgerButton.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
        console.log("Меню скрыто");
        overlay.classList.remove('active');
    } else {
        console.log("Меню показано");
        overlay.classList.add('active');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log("Меню скрыто");
        overlay.classList.remove('active');
        navbarCollapse.classList.remove('show');
    });
});

// Nav goTo

const goToFormButton = document.querySelector('#go-to-form-btn');
const goToTrip = document.querySelector('#trip-btn');
const goToHotel = document.querySelector('#hotel-btn');
const goToPrice = document.querySelector('#price-btn');
const goToFooter = document.querySelector('#footer-btn');

const form = document.querySelector('#form');
const trip = document.querySelector('#trip');
const hotel = document.querySelector('#hotel');
const price = document.querySelector('#price');
const footer = document.querySelector('#footer');

goToFormButton.addEventListener('click', function (e) {
    e.preventDefault();
    form.scrollIntoView({
        behavior: 'smooth', block: 'center'
    });
});

goToTrip.addEventListener('click', function (e) {
    e.preventDefault();
    trip.scrollIntoView({
        behavior: 'smooth', block: 'center'
    });
});

goToHotel.addEventListener('click', function (e) {
    e.preventDefault();
    hotel.scrollIntoView({
        behavior: 'smooth', block: 'center'
    });
});

goToPrice.addEventListener('click', function (e) {
    e.preventDefault();
    price.scrollIntoView({
        behavior: 'smooth', block: 'center'
    });
});

goToFooter.addEventListener('click', function (e) {
    e.preventDefault();
    footer.scrollIntoView({
        behavior: 'smooth', block: 'center'
    });
});

// Validation

const validation = new JustValidate('#myForm');
console.log(validation);
validation
    .addField('#nameInput', [
        {
            rule: 'required',
            errorMessage: 'Ім\'я є обов\'язковим!',
        },
        {
            rule: 'customRegexp',
            value: /^[A-Za-zА-Яа-яЁё\s]+$/,
            errorMessage: 'Ім\'я може містити лише літери та пробіли.',
        },
    ])
    .addField('#telInput', [
        {
            rule: 'required',
            errorMessage: 'Телефон є обов\'язковим!',
        },
        {
            rule: 'customRegexp',
            value: /^\+?[0-9\s\-]+$/,
            errorMessage: 'Телефон повинен містити лише цифри, пробіли, тире або знак +.',
        },
    ])
    .onSuccess((event) => {
        console.log('its work!');
        event.target.reset();
    });