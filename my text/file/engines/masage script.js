// تعریف URL اکشن به صورت امن
const scriptURL = "https://script.google.com/macros/s/AKfycbwQIgQ3GyKgjDb6Uau8u8ovqkZY3NLWuq1YQEYjRGe1Ar23aTlM2W-CGFqS4woLz-rPSQ/exec";

// تابع برای دریافت آدرس IP
async function getIPAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    document.getElementById('ipAddress').value = data.ip;
}

// تابع برای دریافت موقعیت جغرافیایی
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
            document.getElementById('location').value = location;
        });
    }
}

// تابع برای دریافت اطلاعات مرورگر
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    document.getElementById('browserInfo').value = userAgent;
}

// افزودن رفتار به فرم
document.getElementById("myForm").onsubmit = async function (event) {
    event.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم

    // دریافت داده‌های فرم
    const formData = new FormData(this);

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("اطلاعات با موفقیت ارسال شد!");
        } else {
            alert("خطا در ارسال اطلاعات!");
        }
    } catch (error) {
        alert("خطای شبکه!");
        console.error(error);
    }
};

// اجرای توابع برای جمع‌آوری اطلاعات
getIPAddress();
getLocation();
getBrowserInfo();
