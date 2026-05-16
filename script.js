document.addEventListener('DOMContentLoaded', function () {

    // ===========================================================
    // TOP NAV — show after scrolling past the hero
    // ===========================================================
    const hero = document.getElementById('hero');
    const topNav = document.querySelector('.top-nav');

    if (hero && topNav && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                topNav.classList.toggle('visible', !entry.isIntersecting);
            });
        }, { threshold: 0.25 });
        navObserver.observe(hero);
    } else if (topNav) {
        topNav.classList.add('visible');
    }

    // ===========================================================
    // FULL-SCREEN PANEL — open / close
    // ===========================================================
    const panel = document.getElementById('panel');
    const backdrop = document.getElementById('panelBackdrop');
    const panelClose = document.getElementById('panelClose');
    const panelSections = document.querySelectorAll('.panel-section');
    let apodLoaded = false;

    function openPanel(sectionName) {
        if (!sectionName) return;

        panelSections.forEach(s => {
            s.classList.toggle('active', s.dataset.section === sectionName);
        });

        panel.classList.add('open');
        backdrop.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        document.body.classList.add('panel-open');

        panel.scrollTo({ top: 0, behavior: 'instant' });

        if (sectionName === 'notepad' && !apodLoaded) {
            // Defensive: APOD lives inside About in this build, but harmless to keep
            apodLoaded = true;
        }
        if (sectionName === 'about' && !apodLoaded) {
            loadAPOD();
            apodLoaded = true;
        }
    }

    function closePanel() {
        panel.classList.remove('open');
        backdrop.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('panel-open');
        document.getElementById('desk')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Hotspots + any nav link with data-object → open matching panel
    document.querySelectorAll('[data-object]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            openPanel(el.dataset.object);
        });
    });

    panelClose?.addEventListener('click', closePanel);
    backdrop?.addEventListener('click', closePanel);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            closePanel();
        }
    });

    document.querySelectorAll('[data-nav="desk"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            closePanel();
            document.getElementById('desk')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ===========================================================
    // PROJECT MODAL — tile click opens full description
    // ===========================================================
    const projectModal = document.getElementById('projectModal');
    const modalCat = document.getElementById('modalCat');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalDesc = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalGithub = document.getElementById('modalGithub');

    function openProjectModal(tile) {
        const title = tile.dataset.title || tile.querySelector('h4')?.textContent || '';
        const cat = tile.querySelector('.tile-cat')?.textContent || '';
        const meta = tile.dataset.meta || '';
        const desc = tile.dataset.description || '';
        const tech = tile.dataset.tech || '';
        const github = tile.dataset.github || '';

        modalCat.textContent = cat;
        modalCat.style.display = cat ? 'inline-block' : 'none';
        modalTitle.innerHTML = title;
        modalMeta.innerHTML = meta;
        modalMeta.style.display = meta ? 'block' : 'none';
        modalDesc.textContent = desc;

        modalTech.innerHTML = '';
        if (tech) {
            tech.split('·').forEach(t => {
                const span = document.createElement('span');
                span.textContent = t.trim();
                modalTech.appendChild(span);
            });
        }

        if (github) {
            modalGithub.href = github;
            modalGithub.classList.add('visible');
        } else {
            modalGithub.classList.remove('visible');
        }

        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
    }

    function closeProjectModal() {
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
    }

    document.querySelectorAll('.project-tile').forEach(tile => {
        tile.addEventListener('click', () => openProjectModal(tile));
    });

    document.querySelectorAll('[data-modal-close]').forEach(el => {
        el.addEventListener('click', closeProjectModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('open')) {
            closeProjectModal();
        }
    });

    // ===========================================================
    // NASA APOD — lazy loaded (lives inside About Me panel)
    // ===========================================================
    async function loadAPOD() {
        const apodText = document.getElementById('apod-text');
        const apodImage = document.getElementById('apod-image');
        if (!apodText) return;

        try {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=IupLNotpfMdB26WfJggOQa4Ky7aW1jAa2LzH3dXy');
            const data = await response.json();
            apodText.innerText = data.title + ': ' + data.explanation.substring(0, 240) + '...';
            if (data.media_type === 'image' && data.url) {
                apodImage.src = data.url;
                apodImage.style.display = 'block';
            }
        } catch (err) {
            apodText.innerText = 'NASA APOD is currently unavailable.';
        }
    }

    // Deep-link: ?section=education etc.
    const params = new URLSearchParams(window.location.search);
    const initialSection = params.get('section');
    if (initialSection) {
        setTimeout(() => openPanel(initialSection), 400);
    }
});
