// Utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

document.addEventListener('DOMContentLoaded', () => {
    // Signup from (index.html)
    const signupForm = $('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = $('#username').value.trim();
            const email = $('#email').value.trim();
            const password = $('#password').value.trim();
            if (username && email && password) {
                alert('Signup successful!');
                signupForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    //Reviews page: initialize star rating UI and persist reviews to localStorage
    const reviewsForm = $('#reviews-form');
    if (reviewsForm) {
        const stars = $$('.star');
        let selectedRating = 0;
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                stars.forEach((s, i) => {
                    s.classList.toggle('selected', i < selectedRating);
                });
            });
        });
        reviewsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewText = $('#review-text').value.trim();
            if (selectedRating === 0 || !reviewText) {
                alert('Please provide a rating and review text.');
                return;
            }
            const review = {
                rating: selectedRating,
                text: reviewText,
                date: new Date().toISOString()
            };
            let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            alert('Review submitted successfully!');
            reviewsForm.reset();
            stars.forEach(s => s.classList.remove('selected'));
            selectedRating = 0;
        });
    }
    // Load and display reviews
    const reviewsList = $('#reviews-list');
    if (reviewsList) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach((review) => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    // Contact form (contact.html)
    const contactForm = $('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = $('#contact-name').value.trim();
            const email = $('#contact-email').value.trim();
            const message = $('#contact-message').value.trim();
            if (name && email && message) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    //Support ticket simulation (support.html)
    const supportForm = $('#support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const issue = $('#support-issue').value.trim();
            const details = $('#support-details').value.trim();
            if (issue && details) {
                alert('Support ticket submitted successfully!');
                supportForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});



