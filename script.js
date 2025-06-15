// === MODAL BACKDROP STYLES ===
const backdropStyles = `
    #modalBackdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        z-index: 9998;
        display: none;
        transition: opacity 0.3s ease;
    }
`;

const styleTag = document.createElement('style');
styleTag.innerHTML = backdropStyles;
document.head.appendChild(styleTag);

// === MAIN SCRIPT ===
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

    if (typewriterTarget) typeWriter();

    // === Modal for Project Descriptions ===
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const description = card.getAttribute('data-description');

            let backdrop = document.getElementById('modalBackdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.id = 'modalBackdrop';
                document.body.appendChild(backdrop);

                backdrop.addEventListener('click', () => {
                    modal.style.display = 'none';
                    backdrop.style.display = 'none';
                });
            }

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
            backdrop.style.display = 'block';
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

    // === Tab Buttons ===
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
