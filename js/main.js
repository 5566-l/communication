/**
 * 5566-l 个人网站 - 交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========== 导航栏滚动效果 ==========
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮当前区域的导航链接
        updateActiveNav();
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section, header');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (!id) return;

            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========== 移动端菜单切换 ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // 汉堡菜单动画
        navToggle.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ========== 滚动入场动画 (Intersection Observer) ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 为作品项、社群卡片和区域标题添加入场动画
    document.querySelectorAll('.work-item, .community-card, .section-title, .section-desc').forEach(el => {
        observer.observe(el);
    });

    // ========== 平滑滚动 (兼容性增强) ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPos = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

});
