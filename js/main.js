// ==================== Тёмная тема ====================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Проверка системных настроек
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Загрузка сохранённой темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
} else if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙';
} else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
}

// Переключение темы
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        }
    });
}

// ==================== Бургер-меню ====================
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        burgerBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', !isExpanded);
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });
}

// ==================== Валидация формы подписки ====================
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        const errorDiv = document.getElementById('email-error');
        const email = emailInput.value.trim();
        
        // Простая валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            errorDiv.textContent = 'Пожалуйста, введите email';
            emailInput.style.borderColor = '#ef4444';
        } else if (!emailRegex.test(email)) {
            errorDiv.textContent = 'Введите корректный email (пример: name@domain.com)';
            emailInput.style.borderColor = '#ef4444';
        } else {
            errorDiv.textContent = '';
            emailInput.style.borderColor = '';
            // Имитация отправки
            alert(`Спасибо за подписку, ${email}! Вы будете получать наши новости.`);
            subscribeForm.reset();
        }
    });
    
    // Очистка ошибки при вводе
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            document.getElementById('email-error').textContent = '';
            emailInput.style.borderColor = '';
        });
    }
}

// ==================== Плавная прокрутка для якорей ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#/') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== Ленивая загрузка изображений ====================
// Браузеры уже поддерживают loading="lazy", но добавим Observer для старых
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== Клавиатурная навигация ====================
document.addEventListener('keydown', (e) => {
    // Закрыть мобильное меню по Escape
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
});