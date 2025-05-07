document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('nav ul li a, .inline-link');

    // Show Home section by default
    document.querySelector('#home').classList.add('active');

    // Section switching (navbar + inline links)
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Project card expand/collapse logic
    const cardsContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Prevent re-expanding if already expanded
            if (card.classList.contains('expanded')) return;

            // Save original cards
            const originalCards = [...cards];

            // Clear the container and apply expanded layout
            cardsContainer.innerHTML = '';
            cardsContainer.classList.add('projects-expanded');

            // Create expanded card
            const expandedCard = card.cloneNode(true);
            expandedCard.classList.add('expanded');

            // Create collapsed stack for other cards
            const collapsedStack = document.createElement('div');
            collapsedStack.classList.add('collapsed-stack');

            originalCards.forEach(c => {
                if (c !== card) {
                    const clone = c.cloneNode(true);
                    clone.classList.add('collapsed');
                    collapsedStack.appendChild(clone);
                }
            });

            // Add Back button
            const backButton = document.createElement('button');
            backButton.textContent = 'Back';
            backButton.className = 'back-button';
            expandedCard.appendChild(backButton);

            backButton.addEventListener('click', () => {
                cardsContainer.classList.remove('projects-expanded');
                cardsContainer.innerHTML = '';
                originalCards.forEach(c => cardsContainer.appendChild(c));
                addCardListeners(); // reattach click listeners
            });

            // Add expanded and collapsed to DOM
            cardsContainer.appendChild(expandedCard);
            cardsContainer.appendChild(collapsedStack);
        });
    });

    // Helper to reattach listeners after reset
    function addCardListeners() {
        const freshCards = document.querySelectorAll('.card');
        freshCards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('expanded')) return;

                const originalCards = [...freshCards];
                cardsContainer.innerHTML = '';
                cardsContainer.classList.add('projects-expanded');

                const expandedCard = card.cloneNode(true);
                expandedCard.classList.add('expanded');

                const collapsedStack = document.createElement('div');
                collapsedStack.classList.add('collapsed-stack');

                originalCards.forEach(c => {
                    if (c !== card) {
                        const clone = c.cloneNode(true);
                        clone.classList.add('collapsed');
                        collapsedStack.appendChild(clone);
                    }
                });

                const backButton = document.createElement('button');
                backButton.textContent = 'Back';
                backButton.className = 'back-button';
                expandedCard.appendChild(backButton);

                backButton.addEventListener('click', () => {
                    cardsContainer.classList.remove('projects-expanded');
                    cardsContainer.innerHTML = '';
                    originalCards.forEach(c => cardsContainer.appendChild(c));
                    addCardListeners();
                });

                cardsContainer.appendChild(expandedCard);
                cardsContainer.appendChild(collapsedStack);
            });
        });
    }
});
