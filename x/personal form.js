  const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    const accordionButtons = document.querySelectorAll(".accordion button");
    accordionButtons.forEach(button => {
      button.addEventListener("click", function () {
        const panel = this.nextElementSibling;
        
        if (panel.classList.contains("open")) {
          panel.classList.remove("open");
        } else {
          document.querySelectorAll(".panel").forEach(p => p.classList.remove("open"));
          panel.classList.add("open");
        }
      });
    });


// تابع برای باز و بسته کردن پنل‌های آکاردئونی
function toggleAccordion(event) {
    const content = event.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

const scriptURL = "https://script.google.com/macros/s/AKfycbwSEoj3Qw1DCxF5tQICivkUowAUT1tpV32VkkAWTMn8b5nbJ1kJV6iXG-sGqu273vmR/exec";

function collectCheckboxValues() {
    var fixedText1 = "https://srswebsite.github.io/P/"; // متن ثابت اول
    var fixedText2 = "/index.html"; // متن ثابت دوم
    var variableText = document.getElementById("variableInput2").value; // متن متغیر از فیلد ورودی
    var finalText = fixedText1 + variableText + fixedText2; // ترکیب متن ثابت اول، متن متغیر و متن ثابت دوم
    
    // جمع‌آوری مقادیر چک باکس‌ها
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedOptions = Array.from(checkboxes).map(cb => cb.value).join(", "); // تبدیل به رشته

    // گرفتن مقادیر عنوان پروژه و مختصات
    var projectTitle = document.getElementById("projectTitle").value;
	var projectTitle_a = document.getElementById("projectTitle_a").value;
	var projectTitle_b = document.getElementById("projectTitle_b").value;
	var projectTitle_c = document.getElementById("projectTitle_c").value;
	var projectTitle_d = document.getElementById("projectTitle_d").value;
    var projectCoordinates = document.getElementById("projectCoordinates").value;

    // قرار دادن متن نهایی و گزینه‌های انتخاب شده در فیلدهای مخفی
    document.getElementById("combinedText2").value = finalText;
    document.getElementById("categories").value = selectedOptions;

    // ساخت یک شیء FormData برای ارسال داده‌ها
    var formData = new FormData(document.getElementById("myForm"));
    formData.set('projectTitle', projectTitle);
	formData.set('projectTitle_a', projectTitle_a);
	formData.set('projectTitle_b', projectTitle_b);
	formData.set('projectTitle_c', projectTitle_c);
	formData.set('projectTitle_d', projectTitle_d);
    formData.set('projectCoordinates', projectCoordinates);
}


// افزودن رفتار به فرم
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").onsubmit = function(event) {
        // جلوگیری از ارسال فرم به صورت پیش‌فرض
        event.preventDefault();
        
        collectCheckboxValues(); // جمع‌آوری مقادیر چک باکس‌ها
        
        // تنظیم اکشن فرم
        this.action = scriptURL;

        // ارسال فرم
        this.submit();

        // نمایش پیام موفقیت
        alert("اطلاعات با موفقیت ارسال شد!");
    };
})

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;

        // Toggle the "show" class to trigger the animation
        content.classList.toggle('show');

        // Adjust the max-height dynamically based on content height
        if (content.classList.contains('show')) {
            content.style.maxHeight = content.scrollHeight + "px"; // تنظیم حداکثر ارتفاع به ارتفاع واقعی محتوا
        } else {
            content.style.maxHeight = null; // بازنشانی حداکثر ارتفاع
        }
    });
});
function loadSite() {
    var fixedText1 = "https://srswebsite.github.io/P/"; // متن ثابت اول
    var fixedText2 = "/index.html"; // متن ثابت دوم
    var variableText = document.getElementById("variableInput").value; // متن متغیر

    // ترکیب متن ثابت اول، متن متغیر و متن ثابت دوم
    var finalText = fixedText1 + variableText + fixedText2;

    // قرار دادن لینک کامل در فیلد مخفی
    document.getElementById("combinedText").value = finalText;

    // نمایش لینک کامل در آیفریم
    var siteFrame = document.getElementById("unique-siteFrame");
    siteFrame.src = finalText;
}
 function loadFixedLink() {
            var fixedLink = "map.html"; // لینک ثابت

            // نمایش لینک ثابت در آیفریم
            var siteFrame = document.getElementById("unique-siteFrame");
            siteFrame.src = fixedLink;
        }
