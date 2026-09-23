document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. GAVETA DE ACESSIBILIDADE =================
    const drawer = document.getElementById('accessibilityDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const openBtn = document.getElementById('openAccessibility');
    const closeBtn = document.getElementById('closeAccessibility');

    function toggleDrawer(open) {
        if (!drawer || !overlay) return;

        drawer.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        drawer.setAttribute('aria-hidden', !open);

        if (openBtn) {
            openBtn.setAttribute('aria-expanded', open);
        }

        if (open) {
            // Mover o foco para dentro do painel para facilitar navegação via teclado
            closeBtn ? closeBtn.focus() : drawer.focus();
        } else {
            // Retornar o foco ao botão que abriu o painel
            openBtn ? openBtn.focus() : null;
        }
    }

    if (openBtn) openBtn.addEventListener('click', () => toggleDrawer(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));
    if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));

    // Fechar com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
            toggleDrawer(false);
        }
    });


    // ================= 2. MENU MOBILE =================
    const btnMobileMenu = document.getElementById('btnMobileMenu');
    const mainNav = document.getElementById('mainNav');

    if (btnMobileMenu && mainNav) {
        btnMobileMenu.addEventListener('click', () => {
            const isExpanded = btnMobileMenu.getAttribute('aria-expanded') === 'true';
            btnMobileMenu.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('mobile-open', !isExpanded);
        });

        // Fechar menu mobile ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                btnMobileMenu.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('mobile-open');
            });
        });
    }


    // ================= 3. CONTROLE DE TEMAS =================
    const themeButtons = document.querySelectorAll('[data-theme]');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            
            // Marca o botão ativo para leitores de tela
            themeButtons.forEach(btn => btn.removeAttribute('aria-current'));
            button.setAttribute('aria-current', 'true');
        });
    });


    // ================= 4. CONTROLE DE FONTE E LEITURA =================
    let fontScale = 100;
    const fontDecreaseBtn = document.getElementById('fontDecrease');
    const fontIncreaseBtn = document.getElementById('fontIncrease');
    const fontSizeDisplay = document.getElementById('fontSizeValue');

    function updateFontSize(newScale) {
        fontScale = Math.min(Math.max(newScale, 80), 150); // Limita entre 80% e 150%
        document.documentElement.style.fontSize = `${(fontScale / 100) * 100}%`;
        if (fontSizeDisplay) {
            fontSizeDisplay.textContent = `${fontScale}%`;
        }
    }

    if (fontDecreaseBtn) {
        fontDecreaseBtn.addEventListener('click', () => updateFontSize(fontScale - 10));
    }
    if (fontIncreaseBtn) {
        fontIncreaseBtn.addEventListener('click', () => updateFontSize(fontScale + 10));
    }

    // Toggle de Dislexia
    const toggleDyslexia = document.getElementById('toggleDyslexia');
    if (toggleDyslexia) {
        toggleDyslexia.addEventListener('click', () => {
            const isPressed = toggleDyslexia.getAttribute('aria-pressed') === 'true';
            toggleDyslexia.setAttribute('aria-pressed', !isPressed);
            document.body.classList.toggle('font-dyslexic', !isPressed);
        });
    }

    // Toggle de Espaçamento
    const toggleSpacing = document.getElementById('toggleSpacing');
    if (toggleSpacing) {
        toggleSpacing.addEventListener('click', () => {
            const isPressed = toggleSpacing.getAttribute('aria-pressed') === 'true';
            toggleSpacing.setAttribute('aria-pressed', !isPressed);
            document.body.classList.toggle('extra-spacing', !isPressed);
        });
    }

    // Restaurar Configurações Originais
    const resetBtn = document.getElementById('resetAccessibility');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.documentElement.removeAttribute('data-theme');
            updateFontSize(100);
            
            if (toggleDyslexia) {
                toggleDyslexia.setAttribute('aria-pressed', 'false');
                document.body.classList.remove('font-dyslexic');
            }
            if (toggleSpacing) {
                toggleSpacing.setAttribute('aria-pressed', 'false');
                document.body.classList.remove('font-spacing');
            }
        });
    }


    // ================= 5. BARRA DE PROGRESSO & BOTÃO VOLTAR AO TOPO =================
    const progressBar = document.getElementById('readingProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;

        if (progressBar && totalHeight > 0) {
            const progress = (currentScroll / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', currentScroll > 300);
        }
    });


    // ================= 6. SIMULADOR DE VISÃO (FILTROS) =================
    const filterButtons = document.querySelectorAll('.filter-button');
    const visionImage = document.getElementById('visionImage');

    if (filterButtons.length > 0 && visionImage) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                switch (filter) {
                    case 'protanopia':
                        visionImage.style.filter = 'grayscale(40%) sepia(40%) hue-rotate(-20deg)';
                        break;
                    case 'deuteranopia':
                        visionImage.style.filter = 'hue-rotate(90deg) brightness(0.9)';
                        break;
                    case 'tritanopia':
                        visionImage.style.filter = 'hue-rotate(180deg) saturate(1.2)';
                        break;
                    case 'achromatopsia':
                        visionImage.style.filter = 'grayscale(100%)';
                        break;
                    default:
                        visionImage.style.filter = 'none';
                }
            });
        });
    }


    // ================= 7. LEITURA DE TEXTO (SÍNTESE DE VOZ) =================
    const speechButtons = document.querySelectorAll('.read-aloud');

    if ('speechSynthesis' in window) {
        speechButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-speech-target');
                const targetEl = document.getElementById(targetId);

                if (!targetEl) return;

                // Se já estiver lendo, para a leitura
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    button.innerHTML = '<span aria-hidden="true">🔊</span> Ouvir artigo';
                    return;
                }

                const textToRead = targetEl.innerText;
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'pt-BR';
                utterance.rate = 0.95; // Velocidade confortável

                utterance.onstart = () => {
                    button.innerHTML = '<span aria-hidden="true">⏹</span> Parar leitura';
                };

                utterance.onend = () => {
                    button.innerHTML = '<span aria-hidden="true">🔊</span> Ouvir artigo';
                };

                utterance.onerror = () => {
                    button.innerHTML = '<span aria-hidden="true">🔊</span> Ouvir artigo';
                };

                window.speechSynthesis.speak(utterance);
            });
        });
    } else {
        speechButtons.forEach(btn => {
            btn.style.display = 'none'; // Oculta o botão se o navegador não oferecer suporte
        });
    }

});