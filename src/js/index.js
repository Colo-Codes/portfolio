/*
    By Damian Demasi, August 2021
*/

'use strict';

// SECTION Sticky nav bar

const sectionProjects = document.querySelector('.projects');
const sectionBlogPosts = document.querySelector('.blog-posts');
const sectionAbout = document.querySelector('.about');
const sectionContact = document.querySelector('.contact');
const sectionHeroContainer = document.querySelector('.hero__top-container');
const stickyNav = document.querySelector('.sticky-nav');

const sectionHeroContainerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // show navbar
            stickyNav.classList.remove('hidden');
        } else {
            // Hide navbar
            stickyNav.classList.add('hidden');
        }
    });
});

sectionHeroContainerObserver.observe(sectionHeroContainer);

const sectionActiveObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        const intersectingClass = entry.target.classList[1];
        const linkToActivate = document.getElementById(`nav-${intersectingClass}`);
        if (entry.isIntersecting) {
            // Show active class
            linkToActivate.classList.add('sticky-nav__link--active');
        } else {
            // Hide active class
            linkToActivate.classList.remove('sticky-nav__link--active');
        }
    });
}, { rootMargin: '-100% 0px 0px 0px' });

sectionActiveObserver.observe(sectionProjects);
sectionActiveObserver.observe(sectionBlogPosts);
sectionActiveObserver.observe(sectionAbout);
sectionActiveObserver.observe(sectionContact);

// SECTION Form

const myForm = document.getElementById('message-form');
const successMessage = document.querySelector('.form__success-message');

myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(myForm);

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    }).then(() => {
        const myName = document.getElementById('name');
        const myEmail = document.getElementById('email');
        const myMessage = document.getElementById('message');
        const hidden = successMessage.classList.contains('hidden');

        myName.value = '';
        myEmail.value = '';
        myMessage.value = '';

        if (hidden) {
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        } else {
            successMessage.classList.add('hidden');
        }
    }).catch((error) =>
        console.error(error));
});
