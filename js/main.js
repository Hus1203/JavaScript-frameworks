(function() {
    // ==================== ТЁМНАЯ ТЕМА ====================
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const root = document.documentElement;
    
    function updateThemeIcons(isDark) {
        const desktopIcon = themeToggle?.querySelector('i');
        if (desktopIcon) {
            desktopIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = isDark ? 
                '<i class="fa-solid fa-sun"></i> Светлая тема' : 
                '<i class="fa-solid fa-moon"></i> Тёмная тема';
        }
    }
    
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme === 'dark');
    }
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark') {
            setTheme('dark');
        } else if (savedTheme === 'light') {
            setTheme('light');
        } else if (prefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    }
    
    // ==================== МОБИЛЬНОЕ МЕНЮ ====================
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const closeMenuBtn = document.getElementById('close-mobile-menu');
    
    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
    
    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    }
    
    if (burgerBtn) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
// ==================== ФОРМА ПОДПИСКИ ====================
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    const emailInput = document.getElementById('email');
    const consentCheckbox = subscribeForm.querySelector('input[type="checkbox"]'); // ← Чекбокс согласия
    const errorDiv = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput?.value.trim();
        
        // 1. Валидация email
        if (!email) {
            if (errorDiv) errorDiv.textContent = 'Введите email';
            emailInput?.focus();
            return;
        }
        if (!emailRegex.test(email)) {
            if (errorDiv) errorDiv.textContent = 'Некорректный email';
            emailInput?.focus();
            return;
        }
        
        // 2. Валидация согласия на обработку данных ← НОВОЕ
        if (consentCheckbox && !consentCheckbox.checked) {
            if (errorDiv) errorDiv.textContent = 'Необходимо согласие на обработку персональных данных';
            consentCheckbox?.focus(); // Фокус на чекбокс
            // Визуально подсветим чекбокс ошибкой
            consentCheckbox?.classList.add('uk-form-danger');
            setTimeout(() => consentCheckbox?.classList.remove('uk-form-danger'), 2000);
            return;
        }
        
        // 3. Если всё ок — сбрасываем ошибки и отправляем
        if (errorDiv) errorDiv.textContent = '';
        consentCheckbox?.classList.remove('uk-form-danger');
        
        alert('Спасибо за подписку!');
        subscribeForm.reset();
    });
    
    // Очистка ошибок при вводе email
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (errorDiv) errorDiv.textContent = '';
        });
    }
    
    // Очистка ошибки при клике на чекбокс ← НОВОЕ
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', () => {
            if (errorDiv && consentCheckbox.checked) {
                errorDiv.textContent = '';
            }
            consentCheckbox.classList.remove('uk-form-danger');
        });
    }
}
    
    // ==================== ПЛАВНАЯ ПРОКРУТКА ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '#/') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    initTheme();
})();

