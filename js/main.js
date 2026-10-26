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
            try {
                localStorage.setItem('dir', newDir);
            } catch (e) {}
            
            // The button should display the mode it is currently in:
            dirToggleBtn.textContent = newDir.toUpperCase();
        });
    }

    // --- Light/Dark Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const updateThemeUI = (theme) => {
            // In light mode show moon icon (to switch to dark), in dark mode show sun icon (to switch to light)
            themeToggleBtn.innerHTML = theme === 'light' 
                ? '<span class="icon"><i class="ph ph-moon"></i></span>' 
                : '<span class="icon"><i class="ph ph-sun"></i></span>';
            themeToggleBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        };

        // Initialize state based on current document theme
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        updateThemeUI(initialTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {}
            
            updateThemeUI(newTheme);
        });
    }

    // --- Mobile Navigation Controller ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Create backdrop element if it doesn't exist
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
    }

    const closeMobileNav = () => {
        if (mainNav) mainNav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openMobileNav = () => {
        if (mainNav) mainNav.classList.add('active');
        if (menuToggle) menuToggle.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mainNav.classList.contains('active');
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // Close on backdrop click
        backdrop.addEventListener('click', closeMobileNav);

        // Close when clicking any nav link (except dropdown toggles)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const parentLi = link.closest('.has-dropdown');
                // If it is the top-level link of a dropdown in mobile view, toggle dropdown instead of closing
                if (parentLi && parentLi.querySelector('.nav-link') === link && window.innerWidth <= 1024) {
                    e.preventDefault();
                    parentLi.classList.toggle('open');
                    return;
                }
                closeMobileNav();
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMobileNav();
            }
        });

        // Clean up state if resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && mainNav.classList.contains('active')) {
                closeMobileNav();
            }
        });
    }
});
