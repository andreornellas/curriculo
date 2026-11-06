/**
 * ==========================================================================
 * CURRÍCULO INTERATIVO - ANDRÉ ORNELLAS
 * JavaScript Vanilla (Padrão Moderno)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

/**
 * Alterna entre os temas Claro e Escuro
 */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme-pref', targetTheme);
    updateThemeUI(targetTheme);
}

/**
 * Atualiza o ícone e o texto do botão de alternância de tema
 * @param {string} theme - 'light' ou 'dark'
 */
function updateThemeUI(theme) {
    const label = document.getElementById('theme-label');
    const icon = document.getElementById('theme-icon');
    
    if (!label || !icon) return;

    if (theme === 'dark') {
        label.textContent = 'Modo Claro';
        icon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    } else {
        label.textContent = 'Modo Escuro';
        icon.innerHTML = '<path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-5.4-5.4c0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
    }
}

/**
 * Inicializa o tema baseado nas preferências do usuário ou do sistema
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme-pref');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeUI(initialTheme);
}

/**
 * Copia um texto para a área de transferência e exibe um feedback visual (Toast)
 * @param {string} text - Texto a ser copiado
 * @param {string} label - Descrição do item copiado (ex: 'E-mail')
 */
function copyText(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copiado para a área de transferência!`);
        }).catch(() => {
            fallbackCopyText(text, label);
        });
    } else {
        fallbackCopyText(text, label);
    }
}

/**
 * Fallback de cópia para navegadores legados ou contextos sem https
 */
function fallbackCopyText(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(`${label} copiado para a área de transferência!`);
    } catch (err) {
        showToast(`Copiado: ${text}`);
    }
    document.body.removeChild(tempInput);
}

/**
 * Exibe a notificação Toast temporária
 * @param {string} message - Mensagem a ser exibida
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    const textElem = document.getElementById('toast-text');
    
    if (!toast || !textElem) return;
    
    textElem.textContent = message;
    toast.classList.add('visible');
    
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('visible');
    }, 2500);
}

