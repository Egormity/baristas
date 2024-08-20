const bodyEl = document.querySelector('body');

const navEl = document.querySelector('.nav');

const testimonialContEl = document.querySelector('.testimonials__container');
const testimonialCardsEl = document.querySelectorAll('.testimonials__card');

const navReservationEl = document.querySelector('.nav__reservation');
const reservationEl = document.querySelector('.reservation');
const reservationCloseEl = document.querySelector('.reservation__close');
const reservationContEl = document.querySelector('.reservation__container');
const reservationInputs = document.querySelectorAll('.reservation__input');

const sectionHome = document.getElementById('home');

const navItems = document.querySelectorAll('.nav__item');
const navSections = document.querySelectorAll('.nav-element');

const headerImage = document.querySelector('.header__image');

const navIconTopEl = document.querySelector('.nav__icon--top');
const navIconMiddleEl = document.querySelector('.nav__icon--middle');
const navIconBottomEl = document.querySelector('.nav__icon--bottom');
const navIconContainerEl = document.querySelector('.nav__icon--container');
const navContainerEl = document.querySelector('.nav__container');

function testimonials() {
  testimonialCardsEl.forEach((card, i) => {
    const leftOrRight = (i + 1) % 2 === 0 ? 'right' : 'left';
    const sphere = `<div class="testimonials__sphere testimonials__sphere--${leftOrRight}" style=""></div>`;
    const arrow = `<i class="fa-solid fa-sort-up testimonials__arrow testimonials__arrow--${leftOrRight}" style=""></i>`;

    card.insertAdjacentHTML('afterbegin', sphere);
    card.insertAdjacentHTML('afterbegin', arrow);
  });
}

function reservation() {
  hideReservation();

  function showReservation() {
    // HIDE ON BUTTON
    reservationEl.classList.remove('u-hidden');
    reservationContEl.style.transform = 'scale(100%)';

    // HIDE ON ESCAPE
    bodyEl.addEventListener('keydown', e => {
      if (e.key === 'Escape') hideReservation();
    });

    // HIDE WHEN CLICKED OUT OF WINDOW
    window.addEventListener('click', e => {
      if (e.target === reservationEl) hideReservation();
    });

    // CHANGE TEXT COLOR
    reservationInputs.forEach(input => {
      input.addEventListener('click', () => (input.style.color = '#fff'));
    });
  }

  function hideReservation() {
    reservationEl.classList.add('u-hidden');
    reservationContEl.style.transform = 'scale(50%)';

    // CHANGE TEXT COLOR
    reservationInputs.forEach(input => (input.style.color = '#999'));
  }

  navReservationEl.addEventListener('click', showReservation);
  reservationCloseEl.addEventListener('click', hideReservation);
}

function headerBg() {
  const bgs = [
    'url(images/happy-waitress.jpg)',
    'url(images/happy-loving-couple.jpg)',
    'url(images/sincere-laugh.jpg)',
  ];

  let count = 0;

  const min = 1;
  const max = 1.25;
  let scale = min;

  function changeBg() {
    scale === min ? (scale = max) : (scale = min);
    headerImage.style.transform = `scale(${scale})`;

    headerImage.style.backgroundImage = bgs.at(count);
    bgs[count + 1] ? count++ : (count = 0);

    setTimeout(changeBg, 7500);
  }

  changeBg();
}

function navNaviagation() {
  function stickyNav(entries, observer) {
    const [entry] = entries;

    if (entry.target === sectionHome && !entry.isIntersecting)
      navEl.classList.add('nav__show');
    if (entry.target === sectionHome && entry.isIntersecting)
      navEl.classList.remove('nav__show');

    function clearActive() {
      navItems.forEach(el => el.classList.remove('nav__active'));
    }

    navItems.forEach(el => {});

    if (entry.isIntersecting) {
      clearActive();

      navSections.forEach(section => {
        if (entry.target === section) {
          document
            .getElementById(`nav__item--${section.id}`)
            .classList.add('nav__active');
        }
      });
    }
  }

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.1,
    rootMargin: '-0px 0px -50% 0px',
  });

  navSections.forEach(el => headerObserver.observe(el));
  // headerObserver.observe(sectionHome);
}

function navIcon() {
  navIconContainerEl.addEventListener('click', () => {
    if (!navIconMiddleEl.classList.contains('u-hidden')) {
      navIconTopEl.classList.toggle('nav__icon--top--move');
      navIconBottomEl.classList.toggle('nav__icon--bottom--move');
      setTimeout(() => {
        navIconMiddleEl.classList.toggle('u-hidden');
        navIconTopEl.classList.toggle('nav__icon--top--rotate');
        navIconBottomEl.classList.toggle('nav__icon--bottom--rotate');
      }, 250);
    } else {
      navIconTopEl.classList.toggle('nav__icon--top--rotate');
      navIconBottomEl.classList.toggle('nav__icon--bottom--rotate');
      setTimeout(() => {
        navIconMiddleEl.classList.toggle('u-hidden');
        navIconTopEl.classList.toggle('nav__icon--top--move');
        navIconBottomEl.classList.toggle('nav__icon--bottom--move');
      }, 250);
    }

    navContainerEl.classList.toggle('nav__container--active');
  });
}

function init() {
  testimonials();
  reservation();
  headerBg();
  navNaviagation();
  navIcon();
}

init();
