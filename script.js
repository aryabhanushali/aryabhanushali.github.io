document.addEventListener('DOMContentLoaded', function () {
    // === Navigation & Section Handling ===
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('nav ul li a, .inline-link');

    const hash = window.location.hash || '#home';
    const targetSection = document.querySelector(hash);
    if (targetSection) {
        sections.forEach(section => section.classList.remove('active'));
        targetSection.classList.add('active');
    }

    const typewriterText = "I'm currently exploring projects that bridge brain science and AI, advance model interpretability, and push the boundaries of neuroscience, machine learning, and human-centered design.";
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
        link.addEventListener('click', function (e) {
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

    // === Brain Canvas Animation (Home) ===
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
                if (this.x + this.size > brainCanvas.width || this.x - this.size < 0) this.directionX = -this.directionX;
                if (this.y + this.size > brainCanvas.height || this.y - this.size < 0) this.directionY = -this.directionY;
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
            particlesArray.forEach(p => p.update());
            connect();
        }

        init();
        animate();

        brainCanvas.addEventListener('mousemove', (e) => {
            particlesArray.push(new Particle(e.offsetX, e.offsetY, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 2, '#68d391'));
            if (particlesArray.length > 150) particlesArray.splice(0, 1);
        });
    }

    // === Neural Canvas (Projects Section) ===
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

    // === Modal for Project Descriptions with Backdrop ===
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const description = card.getAttribute('data-description');

            let backdrop = document.getElementById('modalBackdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.id = 'modalBackdrop';
                backdrop.style.position = 'fixed';
                backdrop.style.inset = '0';
                backdrop.style.background = 'rgba(0, 0, 0, 0.4)';
                backdrop.style.backdropFilter = 'blur(2px)';
                backdrop.style.zIndex = '9998';
                document.body.appendChild(backdrop);
            }
            backdrop.style.display = 'block';
            backdrop.addEventListener('click', () => {
                const modal = document.getElementById('projectModal');
                if (modal) modal.style.display = 'none';
                backdrop.style.display = 'none';
            });

            let modal = document.getElementById('projectModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'projectModal';
                modal.style.position = 'fixed';
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                modal.style.background = 'white';
                modal.style.padding = '20px';
                modal.style.borderRadius = '12px';
                modal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                modal.style.maxWidth = '600px';
                modal.style.width = '90%';
                modal.style.zIndex = '9999';
                modal.style.fontFamily = 'Quicksand, sans-serif';
                modal.style.lineHeight = '1.5';
                modal.style.overflowY = 'auto';
                modal.style.maxHeight = '80vh';

                const descText = document.createElement('div');
                descText.id = 'modalDescription';

                const closeBtn = document.createElement('button');
                closeBtn.innerText = 'Close';
                closeBtn.style.marginTop = '20px';
                closeBtn.style.padding = '10px 16px';
                closeBtn.style.background = '#38a169';
                closeBtn.style.color = 'white';
                closeBtn.style.border = 'none';
                closeBtn.style.borderRadius = '6px';
                closeBtn.style.cursor = 'pointer';
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    backdrop.style.display = 'none';
                });

                modal.appendChild(descText);
                modal.appendChild(closeBtn);
                document.body.appendChild(modal);
            }

            document.getElementById('modalDescription').innerText = description;
            modal.style.display = 'block';
        });
    });

    // === "See More" Button Toggle ===
    window.toggleMore = function () {
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

    // === Tab Buttons (if used) ===
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-tab");

            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            tabContents.forEach(content => {
                content.classList.remove("active");
                if (content.id === target) {
                    content.classList.add("active");
                }
            });
        });
    });

    // === NASA APOD Fetch ===
    async function loadAPOD() {
        try {
            const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=IupLNotpfMdB26WfJggOQa4Ky7aW1jAa2LzH3dXy");
            const data = await response.json();
            const apodText = document.getElementById("apod-text");
            const apodImage = document.getElementById("apod-image");
            apodText.innerText = data.title + ": " + data.explanation.substring(0, 200) + "...";
            apodImage.src = data.url;
            apodImage.style.display = "block";
        } catch (e) {
            document.getElementById("apod-text").innerText = "NASA APOD is currently unavailable 🚀";
        }
    }

    loadAPOD();
});
