document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('nav ul li a, .inline-link');

    document.querySelector('#home').classList.add('active');

    // Section navigation
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    const projectsSection = document.querySelector('#projects .card-container');
    const allCardsHTML = projectsSection.innerHTML;

    function expandCard(card) {
        const originalCards = document.querySelectorAll('#projects .card');
        projectsSection.innerHTML = '';
        projectsSection.classList.add('projects-expanded');

        const expandedCard = card.cloneNode(true);
        expandedCard.classList.add('expanded');

        const description = card.getAttribute('data-description');
        if (description) {
            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('expanded-description');
            descriptionElement.textContent = description;
            expandedCard.appendChild(descriptionElement);
        }

        const videoUrl = card.getAttribute('data-video');
        if (videoUrl) {
            const videoWrapper = document.createElement('div');
            videoWrapper.classList.add('demo-video');
            videoWrapper.innerHTML = `
        <iframe width="100%" height="315" src="${videoUrl}"
                frameborder="0" allowfullscreen></iframe>`;
    expandedCard.appendChild(videoWrapper);
}



        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = 'back-button';
        expandedCard.appendChild(backButton);

        backButton.addEventListener('click', () => {
            projectsSection.classList.remove('projects-expanded');
            projectsSection.innerHTML = allCardsHTML;
            addCardListeners();
        });

        const collapsedStack = document.createElement('div');
        collapsedStack.classList.add('collapsed-stack');

        originalCards.forEach(c => {
            if (c !== card) {
                const clone = c.cloneNode(true);
                clone.classList.add('collapsed');
                collapsedStack.appendChild(clone);
            }
        });

        projectsSection.appendChild(expandedCard);
        projectsSection.appendChild(collapsedStack);
    }

    function addCardListeners() {
        const freshCards = document.querySelectorAll('#projects .card');
        freshCards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('expanded')) return;
                expandCard(card);
            });
        });
    }

    addCardListeners();

    // 💥 Brain / neural network animation
    const canvas = document.getElementById('brainCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth / 2;
        canvas.height = 500;

        let particlesArray = [];

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < 100; i++) {
                let size = Math.random() * 2 + 1;
                let x = Math.random() * (canvas.width - size * 2);
                let y = Math.random() * (canvas.height - size * 2);
                let directionX = (Math.random() - 0.5) * 2;
                let directionY = (Math.random() - 0.5) * 2;
                let color = '#38a169';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#68d391';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(particle => particle.update());
            connect();
        }

        init();
        animate();

        canvas.addEventListener('mousemove', (event) => {
            particlesArray.push(new Particle(event.offsetX, event.offsetY, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 2, '#68d391'));
            if (particlesArray.length > 150) particlesArray.splice(0, 1);
        });
    }
});


function toggleMore() {
    const moreText = document.getElementById('more-text');
    const button = document.querySelector('.more-button');
    if (moreText.style.display === 'none') {
        moreText.style.display = 'block';
        button.innerText = 'See Less ↑';
    } else {
        moreText.style.display = 'none';
        button.innerText = 'See More ↓';
    }
}

