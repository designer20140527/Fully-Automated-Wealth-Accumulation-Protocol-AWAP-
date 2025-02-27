document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const progressFill = document.querySelector('.progress-fill');
    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');
    let currentIndex = 1;

    // 更新卡片状态和位置
    function updateCards(newIndex) {
        const isMobile = window.innerWidth <= 768;
        cards.forEach(card => {
            const cardIndex = parseInt(card.dataset.index);
            card.classList.remove('active');
            
            if (cardIndex === newIndex) {
                card.classList.add('active');
                if (isMobile) {
                    card.style.display = 'block';
                } else {
                    card.style.transform = 'translateX(0) scale(1)';
                    card.style.opacity = '1';
                    card.style.zIndex = '2';
                }
            } else {
                if (isMobile) {
                    card.style.display = 'none';
                } else {
                    if (cardIndex < newIndex) {
                        card.style.transform = `translateX(-${(newIndex - cardIndex) * 120}%) scale(${0.8 - (newIndex - cardIndex) * 0.1})`;
                    } else {
                        card.style.transform = `translateX(${(cardIndex - newIndex) * 120}%) scale(${0.8 - (cardIndex - newIndex) * 0.1})`;
                    }
                    card.style.opacity = '0.5';
                    card.style.zIndex = '1';
                }
            }
        });

        // 更新进度条
        progressFill.style.width = `${(newIndex / cards.length) * 100}%`;
    }

    // 为每个卡片添加点击事件
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const newIndex = parseInt(card.dataset.index);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateCards(currentIndex);
            }
        });
    });

    // 添加鼠标悬停效果
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.cursor = 'pointer';
            if (!card.classList.contains('active')) {
                card.style.opacity = '0.8';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.opacity = '0.5';
            }
        });
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            cards.forEach(card => {
                if (!card.classList.contains('active')) {
                    card.style.display = 'none';
                }
            });
        } else {
            cards.forEach(card => {
                card.style.display = 'block';
            });
            updateCards(currentIndex);
        }
    });

    // 添加箭头按钮事件
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentIndex > 1 ? currentIndex - 1 : cards.length;
            currentIndex = newIndex;
            updateCards(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = currentIndex < cards.length ? currentIndex + 1 : 1;
            currentIndex = newIndex;
            updateCards(currentIndex);
        });
    }

    // 在移动端隐藏箭头按钮
    function updateArrowsVisibility() {
        const arrows = document.querySelector('.mobile-nav-arrows');
        if (arrows) {
            arrows.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
        }
    }

    updateArrowsVisibility();
    window.addEventListener('resize', updateArrowsVisibility);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 监听滚动，添加渐入动画
const sections = document.querySelectorAll('.about-section, .rewards-section, .numbers-section, .why-section, .how-section, .tokenomics-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
}); 