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

const launchBtn = document.getElementById('#launch-btn');
const nameInput = document.getElementById('#typeName');
const telInput = document.getElementById('#typeTel');

launchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!nameInput.value.match(/[A-Za-zА-Яа-яЁё\s]+/)) {
        alert('Ім\'я може містити лише літери та пробіл.');
        return;
    }
    if (!telInput.value.match(/\+?[0-9\s\-]+/)) {
        alert('Телефон повинен містити лише цифри, пробіли, тире або знак +.');
        return;
    }
    console.log(nameInput.value);

    nameInput.value = '';
    telInput.value = '';
});
