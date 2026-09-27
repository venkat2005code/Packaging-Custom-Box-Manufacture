document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- RTL/LTR Toggle ---
    const dirToggleBtn = document.getElementById('dir-toggle');
    if (dirToggleBtn) {
        // Initialize state based on html[dir]
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        dirToggleBtn.textContent = currentDir.toUpperCase();

        dirToggleBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            
            document.documentElement.setAttribute('dir', newDir);
            
            // The button should display the mode it is currently in, as requested:
            // "show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
            dirToggleBtn.textContent = newDir.toUpperCase();
        });
    }

    // --- Light/Dark Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update button icon/text if necessary
            themeToggleBtn.innerHTML = newTheme === 'light' ? '<span class="icon"><i class="ph ph-moon"></i></span>' : '<span class="icon"><i class="ph ph-sun"></i></span>';
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});
