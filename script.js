document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('nav ul li a, .inline-link');

    document.querySelector('#home').classList.add('active');

    const typewriterText = "I’m currently exploring projects that bridge brain science and AI, advance model interpretability, and push the boundaries of neuroscience, machine learning, and human-centered design.";
    const typewriterTarget = document.getElementById('typewriter-text');
    let index = 0;

    function typeWriter() {
        if (index < typewriterText.length) {
            typewriterTarget.textContent += typewriterText.charAt(index);
            index++;
            setTimeout(typeWriter, 35);
        }
    }

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

            if (targetId === 'projects' && typewriterTarget) {
                typewriterTarget.textContent = '';
                index = 0;
                typeWriter();
            }
        });
    });

    if (typewriterTarget) {
        typeWriter();
    }

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
            videoWrapper.innerHTML = `<iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
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

    // BrainCanvas (Home hero)
    const brainCanvas = document.getElementById('brainCanvas');
    if (brainCanvas) {
        const ctx = brainCanvas.getContext('2d');
        brainCanvas.width = window.innerWidth / 2;
        brainCanvas.height = 500;

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
                if (this.x + this.size > brainCanvas.width || this.x - this.size < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > brainCanvas.height || this.y - this.size < 0) {
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
                let x = Math.random() * (brainCanvas.width - size * 2);
                let y = Math.random() * (brainCanvas.height - size * 2);
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
            ctx.clearRect(0, 0, brainCanvas.width, brainCanvas.height);
            particlesArray.forEach(particle => particle.update());
            connect();
        }
        init();
        animate();

        brainCanvas.addEventListener('mousemove', (event) => {
            particlesArray.push(new Particle(event.offsetX, event.offsetY, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 2, '#68d391'));
            if (particlesArray.length > 150) particlesArray.splice(0, 1);
        });
    }

    // NeuralCanvas (Projects background)
    const neuralCanvas = document.getElementById('neuralCanvas');
    if (neuralCanvas) {
        const ctx = neuralCanvas.getContext('2d');

    function resizeCanvas() {
        neuralCanvas.width = neuralCanvas.offsetWidth;
        neuralCanvas.height = neuralCanvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);



        const nodes = [];
        const nodeCount = 40;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * neuralCanvas.width,
                y: Math.random() * neuralCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        function animateNetwork() {
            ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);

            for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.strokeStyle = 'rgba(56,161,105,0.3)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#38a169';
                ctx.fill();

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > neuralCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > neuralCanvas.height) node.vy *= -1;
            });

            requestAnimationFrame(animateNetwork);
        }

        animateNetwork();
    }

    window.toggleMore = function() {
        const moreText = document.getElementById('more-text');
        const button = document.querySelector('.more-button');
        if (moreText.style.display === 'none') {
            moreText.style.display = 'block';
            button.innerText = 'See Less ↑';
        } else {
            moreText.style.display = 'none';
            button.innerText = 'See More ↓';
        }
    };
});
