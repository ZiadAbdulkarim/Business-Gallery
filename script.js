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
        // إضافة 10px لتوفير مساحة إضافية بسيطة أسفل النص الأطول
        projectParagraphs.forEach(paragraph => {
            paragraph.style.height = `${maxHeight + 10}px`;
        });
    }
}

// تشغيل الدالة عند تحميل الصفحة وتغيير الحجم
window.addEventListener('load', setEqualHeight);
window.addEventListener('resize', setEqualHeight);


// ======================================
// 2. التمرير السلس (Smooth Scrolling)
// ======================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && href !== '#') {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ======================================
// 3. معالجة وإرسال نموذج الاتصال إلى Formspree
// ======================================
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');
const emailInput = document.getElementById('email');
const replyToInput = document.getElementById('email-reply-to');

// دالة تحديث حقل الرد (Reply-To) اللازم لـ Formspree
function updateReplyTo() {
    if (replyToInput && emailInput) {
        replyToInput.value = emailInput.value;
    }
}
if (emailInput) {
    emailInput.addEventListener('input', updateReplyTo);
    // التأكد من تطبيق القيمة عند التحميل الأولي للصفحة
    window.addEventListener('load', updateReplyTo);
}


if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // **التحقق الأولي (Validation):**
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;
        formMessage.textContent = '';
        formMessage.className = 'form-message'; // إعادة تهيئة

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === '' || email === '' || message === '' || !emailPattern.test(email)) {
            formMessage.textContent = 'Please check the required fields and enter a valid email address.';
            formMessage.classList.add('error'); // يمكنك إضافة ستايل لرسالة الخطأ
            isValid = false;
            return; // إيقاف التنفيذ إذا كان غير صالح
        }

        // **إرسال النموذج إلى Formspree (باستخدام Fetch API)**
        if (isValid) {
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessage.textContent = 'Thank you ' + name + ' I will contact you in less than 24 hours.';
                    formMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    // معالجة أخطاء Formspree أو أخطاء الشبكة
                    formMessage.textContent = 'Oops! There was an issue submitting your form. Please try again.';
                    formMessage.classList.add('error');
                }
            } catch (error) {
                // معالجة أخطاء الاتصال
                formMessage.textContent = 'A connection error occurred. Please check your network and try again.';
                formMessage.classList.add('error');
            }

            // إخفاء الرسالة بعد 8 ثوانٍ (بتأثير التلاشي)
            setTimeout(() => {
                // الخطوة 1: البدء في التلاشي عبر إزالة كلاس النجاح/الخطأ الذي يضبط opacity: 1
                formMessage.classList.remove('success', 'error');

                // الخطوة 2: بعد انتهاء فترة التلاشي (التي ستُضبط في CSS على 0.4s)، نقوم بمسح النص
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 500); // 500ms تكفي لضمان انتهاء التلاشي
            }, 8000);
        }
    });
}
