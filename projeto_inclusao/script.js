/* =====================================================
   TECNOLOGIA PARA TODOS
   SCRIPT.JS
   ===================================================== */


/* ================= ELEMENTOS ================= */

const body = document.body;

const accessibilityDrawer =
    document.getElementById("accessibilityDrawer");

const drawerOverlay =
    document.getElementById("drawerOverlay");

const openAccessibility =
    document.getElementById("openAccessibility");

const closeAccessibility =
    document.getElementById("closeAccessibility");

const resetAccessibility =
    document.getElementById("resetAccessibility");

const fontIncrease =
    document.getElementById("fontIncrease");

const fontDecrease =
    document.getElementById("fontDecrease");

const fontSizeValue =
    document.getElementById("fontSizeValue");

const toggleDyslexia =
    document.getElementById("toggleDyslexia");

const toggleSpacing =
    document.getElementById("toggleSpacing");

const readingProgress =
    document.getElementById("readingProgress");

const backToTop =
    document.getElementById("backToTop");

const mobileMenuButton =
    document.getElementById("btnMobileMenu");

const mainNav =
    document.getElementById("mainNav");


/* ================= CONFIGURAÇÕES ================= */

let fontSize = 100;

const defaultSettings = {
    theme: "light",
    fontSize: 100,
    dyslexia: false,
    spacing: false
};


/* ================= INICIALIZAÇÃO ================= */

document.addEventListener("DOMContentLoaded", () => {

    loadSettings();

    updateFontSize();

    updateReadingProgress();

    updateBackToTop();

});


/* ================= LOCAL STORAGE ================= */

function saveSettings() {

    const settings = {
        theme:
            body.classList.contains("dark-theme")
                ? "dark"
                : body.classList.contains("high-contrast")
                    ? "contrast"
                    : "light",

        fontSize: fontSize,

        dyslexia:
            body.classList.contains("dyslexia-mode"),

        spacing:
            body.classList.contains("spacing-mode")
    };

    localStorage.setItem(
        "accessibilitySettings",
        JSON.stringify(settings)
    );
}


function loadSettings() {

    const saved =
        localStorage.getItem(
            "accessibilitySettings"
        );

    if (!saved) {
        applyTheme("light");
        return;
    }

    try {

        const settings =
            JSON.parse(saved);

        applyTheme(
            settings.theme || "light"
        );

        fontSize =
            settings.fontSize || 100;

        body.classList.toggle(
            "dyslexia-mode",
            settings.dyslexia === true
        );

        body.classList.toggle(
            "spacing-mode",
            settings.spacing === true
        );

        updateToggleButtons();

    } catch (error) {

        console.error(
            "Erro ao carregar configurações:",
            error
        );

        applyTheme("light");
    }
}


/* ================= PAINEL DE ACESSIBILIDADE ================= */

function openDrawer() {

    accessibilityDrawer.classList.add("open");

    drawerOverlay.classList.add("active");

    accessibilityDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    closeAccessibility.focus();
}


function closeDrawer() {

    accessibilityDrawer.classList.remove("open");

    drawerOverlay.classList.remove("active");

    accessibilityDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    openAccessibility.focus();
}


if (openAccessibility) {

    openAccessibility.addEventListener(
        "click",
        openDrawer
    );

}


if (closeAccessibility) {

    closeAccessibility.addEventListener(
        "click",
        closeDrawer
    );

}


if (drawerOverlay) {

    drawerOverlay.addEventListener(
        "click",
        closeDrawer
    );

}


/* Fechar com ESC */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            accessibilityDrawer.classList.contains("open")
        ) {

            closeDrawer();

        }

    }
);


/* ================= TEMAS ================= */

const themeButtons =
    document.querySelectorAll(
        "[data-theme]"
    );


themeButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;

                applyTheme(theme);

                saveSettings();

            }
        );

    }
);


function applyTheme(theme) {

    body.classList.remove(
        "dark-theme",
        "high-contrast"
    );

    if (theme === "dark") {

        body.classList.add(
            "dark-theme"
        );

    }

    if (theme === "contrast") {

        body.classList.add(
            "high-contrast"
        );

    }

    updateThemeButtons();
}


function updateThemeButtons() {

    themeButtons.forEach(
        (button) => {

            button.classList.remove(
                "active"
            );

            const theme =
                button.dataset.theme;

            if (
                theme === "light" &&
                !body.classList.contains(
                    "dark-theme"
                ) &&
                !body.classList.contains(
                    "high-contrast"
                )
            ) {

                button.classList.add(
                    "active"
                );

            }

            if (
                theme === "dark" &&
                body.classList.contains(
                    "dark-theme"
                )
            ) {

                button.classList.add(
                    "active"
                );

            }

            if (
                theme === "contrast" &&
                body.classList.contains(
                    "high-contrast"
                )
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );
}


/* ================= TAMANHO DA FONTE ================= */

if (fontIncrease) {

    fontIncrease.addEventListener(
        "click",
        () => {

            if (fontSize < 150) {

                fontSize += 10;

                updateFontSize();

                saveSettings();

            }

        }
    );

}


if (fontDecrease) {

    fontDecrease.addEventListener(
        "click",
        () => {

            if (fontSize > 80) {

                fontSize -= 10;

                updateFontSize();

                saveSettings();

            }

        }
    );

}


function updateFontSize() {

    body.style.setProperty(
        "--font-size",
        fontSize / 100
    );

    if (fontSizeValue) {

        fontSizeValue.textContent =
            `${fontSize}%`;

    }

}


/* ================= FONTE PARA DISLEXIA ================= */

if (toggleDyslexia) {

    toggleDyslexia.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "dyslexia-mode"
            );

            updateToggleButtons();

            saveSettings();

        }
    );

}


/* ================= ESPAÇAMENTO ================= */

if (toggleSpacing) {

    toggleSpacing.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "spacing-mode"
            );

            updateToggleButtons();

            saveSettings();

        }
    );

}


function updateToggleButtons() {

    if (toggleDyslexia) {

        toggleDyslexia.classList.toggle(
            "active",
            body.classList.contains(
                "dyslexia-mode"
            )
        );

    }

    if (toggleSpacing) {

        toggleSpacing.classList.toggle(
            "active",
            body.classList.contains(
                "spacing-mode"
            )
        );

    }

    updateThemeButtons();

}


/* ================= RESET ================= */

if (resetAccessibility) {

    resetAccessibility.addEventListener(
        "click",
        () => {

            fontSize =
                defaultSettings.fontSize;

            body.classList.remove(
                "dark-theme",
                "high-contrast",
                "dyslexia-mode",
                "spacing-mode"
            );

            applyTheme(
                defaultSettings.theme
            );

            updateFontSize();

            updateToggleButtons();

            localStorage.removeItem(
                "accessibilitySettings"
            );

        }
    );

}


/* ================= LEITURA EM VOZ ALTA ================= */

const readButtons =
    document.querySelectorAll(
        ".read-aloud"
    );


let currentSpeech = null;


readButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.dataset.speechTarget;

                const target =
                    document.getElementById(
                        targetId
                    );

                if (!target) {
                    return;
                }

                if (
                    "speechSynthesis" in window
                ) {

                    window.speechSynthesis.cancel();

                    currentSpeech =
                        new SpeechSynthesisUtterance(
                            target.textContent
                        );

                    currentSpeech.lang =
                        "pt-BR";

                    currentSpeech.rate =
                        0.95;

                    currentSpeech.pitch =
                        1;

                    window.speechSynthesis.speak(
                        currentSpeech
                    );

                    button.textContent =
                        "⏹ Parar leitura";

                    currentSpeech.onend =
                        () => {

                            button.textContent =
                                "🔊 Ouvir artigo";

                        };

                }

            }
        );

    }
);


/* ================= SIMULADOR DE VISÃO ================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );

const visionImage =
    document.getElementById(
        "visionImage"
    );


filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;

                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                visionImage.classList.remove(
                    "protanopia",
                    "deuteranopia",
                    "tritanopia",
                    "achromatopsia"
                );

                if (
                    filter !== "normal"
                ) {

                    visionImage.classList.add(
                        filter
                    );

                }

            }
        );

    }
);


/* ================= MENU MOBILE ================= */

if (
    mobileMenuButton &&
    mainNav
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle(
                    "mobile-open"
                );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            mobileMenuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        }
    );


    /* Fechar menu ao clicar em um link */

    const navLinks =
        mainNav.querySelectorAll(
            "a"
        );

    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }
            );

        }
    );


    /* Fechar menu ao aumentar a tela */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                mainNav.classList.remove(
                    "mobile-open"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* ================= PROGRESSO DE LEITURA ================= */

window.addEventListener(
    "scroll",
    updateReadingProgress
);


function updateReadingProgress() {

    if (!readingProgress) {
        return;
    }

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {

        readingProgress.style.width =
            "0%";

        return;

    }

    const percentage =
        (scrollTop / documentHeight) * 100;

    readingProgress.style.width =
        `${percentage}%`;

}


/* ================= BOTÃO VOLTAR AO TOPO ================= */

window.addEventListener(
    "scroll",
    updateBackToTop
);


function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }

}


/* ================= FECHAR DRAWER COM TAB ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Tab" ||
            !accessibilityDrawer.classList.contains(
                "open"
            )
        ) {
            return;
        }

        const focusableElements =
            accessibilityDrawer.querySelectorAll(
                "button, a, input, select, textarea"
            );

        if (!focusableElements.length) {
            return;
        }

        const firstElement =
            focusableElements[0];

        const lastElement =
            focusableElements[
                focusableElements.length - 1
            ];

        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {

            event.preventDefault();

            lastElement.focus();

        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {

            event.preventDefault();

            firstElement.focus();

        }

    }
);


/* ================= CONSOLE ================= */

console.log(
    "Tecnologia para Todos carregado com sucesso!"
);