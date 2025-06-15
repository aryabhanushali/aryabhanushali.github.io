document.addEventListener('DOMContentLoaded', function() {
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



document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const description = card.getAttribute('data-description');

        // Create modal container if it doesn't already exist
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

            // Close button
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
            });

            // Description text
            const descText = document.createElement('div');
            descText.id = 'modalDescription';

            modal.appendChild(descText);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
        }

        // Set and show the description
        document.getElementById('modalDescription').innerText = description;
        modal.style.display = 'block';
    });
});


    // Skills Network Visualization
    const skillsCanvas = document.getElementById('skillsCanvas');
    if (skillsCanvas) {
        const ctx = skillsCanvas.getContext('2d');

        // Set canvas size
        function resizeSkillsCanvas() {
            skillsCanvas.width = skillsCanvas.offsetWidth;
            skillsCanvas.height = skillsCanvas.offsetHeight;
        }

        resizeSkillsCanvas();
        window.addEventListener('resize', resizeSkillsCanvas);

        class SkillNode {
            constructor(x, y, skill) {
                this.x = x;
                this.y = y;
                this.skill = skill;
                this.radius = 30;
                this.connections = [];
                this.hovered = false;
                this.targetX = x;
                this.targetY = y;
                this.vx = 0;
                this.vy = 0;
                this.scale = 1;
            }

            draw() {
                // Draw connections
                this.connections.forEach(conn => {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(conn.x, conn.y);
                    ctx.strokeStyle = this.hovered || conn.hovered ?
                        'rgba(56, 161, 105, 0.3)' : 'rgba(56, 161, 105, 0.1)';
                    ctx.lineWidth = this.hovered || conn.hovered ? 2 : 1;
                    ctx.stroke();
                });

                // Save context for scaling
                ctx.save();

                // Apply scale transformation
                ctx.translate(this.x, this.y);
                ctx.scale(this.scale, this.scale);
                ctx.translate(-this.x, -this.y);

                // Draw node
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

                // Gradient fill
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                );

                gradient.addColorStop(0, this.hovered ? '#48bb78' : '#68d391');
                gradient.addColorStop(1, this.hovered ? '#38a169' : '#48bb78');

                ctx.fillStyle = gradient;
                ctx.fill();

                // Add glow effect when hovered
                if (this.hovered) {
                    ctx.shadowColor = '#38a169';
                    ctx.shadowBlur = 20;
                    ctx.fill();
                }

                // Draw skill name
                ctx.fillStyle = 'white';
                ctx.font = '14px Quicksand';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.skill, this.x, this.y);

                // Restore context
                ctx.restore();
            }

            isPointInside(x, y) {
                const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
                return distance <= this.radius;
            }

            update() {
                // Add some movement
                this.x += this.vx;
                this.y += this.vy;

                // Damping
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Move towards target
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;
                this.vx += dx * 0.01;
                this.vy += dy * 0.01;

                // Update scale for hover effect
                if (this.hovered) {
                    this.scale = Math.min(this.scale + 0.1, 1.2);
                } else {
                    this.scale = Math.max(this.scale - 0.1, 1);
                }
            }
        }

        // Create skill nodes
        const nodes = [];
        const skills = [
            'Python', 'PyTorch', 'Deep Learning', 'Neural Networks',
            'Computer Vision', 'NLP', 'JavaScript', 'C++',
            'Git', 'Docker', 'AWS', 'Linux'
        ];

        // Position nodes in a circular layout
        const centerX = skillsCanvas.width / 2;
        const centerY = skillsCanvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.7;

        skills.forEach((skill, index) => {
            const angle = (index * Math.PI * 2) / skills.length;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const node = new SkillNode(x, y, skill);
            nodes.push(node);
        });

        // Add connections between nodes
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                if (Math.random() < 0.3) { // 30% chance of connection
                    node.connections.push(otherNode);
                    otherNode.connections.push(node);
                }
            });
        });

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, skillsCanvas.width, skillsCanvas.height);

            // Update and draw nodes
            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            requestAnimationFrame(animate);
        }

        // Handle mouse interaction
        skillsCanvas.addEventListener('mousemove', (e) => {
            const rect = skillsCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            nodes.forEach(node => {
                node.hovered = node.isPointInside(x, y);
            });
        });

        // Start animation
        animate();
    }
});

// 🚀 NASA APOD fetch
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

loadAPOD(); // 👈 Call it when DOM is ready

document.addEventListener("DOMContentLoaded", () => {
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
});

function toggleInterest(card) {
    card.classList.toggle('open');
}



