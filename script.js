// ======================================
// 1. توحيد ارتفاع فقرات المشاريع (Equal Height for Project Paragraphs)
// ======================================
function setEqualHeight() {
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectItems.length === 0) return;

    let maxHeight = 0;
    const projectParagraphs = [];

    projectItems.forEach(item => {
        const paragraph = item.querySelector('p');
        if (paragraph) {
            paragraph.style.height = 'auto'; 
            
            projectParagraphs.push(paragraph);
            
            const currentHeight = paragraph.clientHeight; 
            
            if (currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }
        }
    });

    if (maxHeight > 0) {
        projectParagraphs.forEach(paragraph => {
            paragraph.style.height = `${maxHeight + 10}px`;
        });
    }
}

// تشغيل الدالة عند تحميل الصفحة
window.addEventListener('load', setEqualHeight);

// تشغيلها مرة أخرى في حال تغيير حجم الشاشة (لتصحيح الأبعاد في التصميم المتجاوب)
window.addEventListener('resize', setEqualHeight);


// ======================================
// 2. التمرير السلس (Smooth Scrolling)
// ======================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').length > 1) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ======================================
// 3. التحقق من نموذج الاتصال (Professional Form Validation)
// ======================================
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // إعادة تهيئة الرسالة وإخفائها قبل التحقق
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all the required fields.');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isValid && !emailPattern.test(email)) {
             alert('Please enter a valid email address.');
             isValid = false;
        }

        if (isValid) {
            // عرض رسالة النجاح الأنيقة
            formMessage.textContent = 'Thank you for your message, ' + name + '! I will get back to you soon.';
            formMessage.classList.add('success');
            
            // إعادة ضبط النموذج بعد ثانيتين لإعطاء المستخدم فرصة لرؤية الرسالة
            setTimeout(() => {
                contactForm.reset();
                formMessage.classList.remove('success');
            }, 2000); 
        }
    });
}