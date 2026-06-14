// مفاتيح تجريبية مخزنة مؤقتاً لمحاكاة سيرفر النينجا قبل الربط الفعلي
const mockNinjaServerKeys = {
    "NINJA-HAMAD-2026": { valid: true, message: "مرحباً بك يا حمد! تم التفعيل بنجاح." },
    "NINJA-EXPIRED-99": { valid: false, message: "عذراً، هذا المفتاح انتهت صلاحيته!" }
};

function verifyKey() {
    const keyInput = document.getElementById('licenseInput').value.trim();
    const msgDiv = document.getElementById('msg');
    
    if (!keyInput) {
        msgDiv.style.color = '#ff4757';
        msgDiv.innerText = '⚠️ الرجاء إدخال مفتاح الترخيص أولاً!';
        return;
    }
    
    msgDiv.style.color = '#eccc68';
    msgDiv.innerText = '⏳ جاري الاتصال بسيرفر النينجا والتحقق...';
    
    // محاكاة تأخير السيرفر لمدة ثانية واحدة لإعطاء طابع احترافي
    setTimeout(() => {
        if (mockNinjaServerKeys[keyInput]) {
            const keyStatus = mockNinjaServerKeys[keyInput];
            
            if (keyStatus.valid) {
                msgDiv.style.color = '#2ed573';
                msgDiv.innerText = keyStatus.message;
                
                // الانتقال للواجهة الرئيسية بعد ثانية ونصف
                setTimeout(() => {
                    document.getElementById('activationPage').classList.add('hidden');
                    document.getElementById('mainPage').classList.remove('hidden');
                }, 1500);
                
            } else {
                msgDiv.style.color = '#ff4757';
                msgDiv.innerText = '❌ ' + keyStatus.message;
            }
        } else {
            msgDiv.style.color = '#ff4757';
            msgDiv.innerText = '❌ مفتاح الترخيص غير صحيح أو غير موجود بالسيرفر!';
        }
    }, 1200);
}

function lockApp() {
    // إغلاق التطبيق والعودة لصفحة التفعيل
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('activationPage').classList.remove('hidden');
    document.getElementById('licenseInput').value = '';
    document.getElementById('msg').innerText = '';
}
