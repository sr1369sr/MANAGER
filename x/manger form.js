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

const scriptURL = "https://script.google.com/macros/s/AKfycbxev2GeoPyYQUEhLphZ-e1c7k1ILjupD4zSUoQIx-pWfB76kWIJVITM9OD5z5SlwFNYbw/exec";

function collectCheckboxValues() {
    var fixedText = "https://srswebsite.github.io/P/"; // متن ثابت
    var variableText = document.getElementById("variableInput2").value; // متن متغیر از فیلد ورودی
    var finalText = fixedText + variableText; // ترکیب متن ثابت و متغیر
    
    // جمع‌آوری مقادیر چک باکس‌ها
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedOptions = Array.from(checkboxes).map(cb => cb.value).join(", "); // تبدیل به رشته

    // گرفتن مقادیر عنوان پروژه و مختصات
    var projectTitle = document.getElementById("projectTitle").value;
    var projectCoordinates = document.getElementById("projectCoordinates").value;

    // قرار دادن متن نهایی و گزینه‌های انتخاب شده در فیلدهای مخفی
    document.getElementById("combinedText2").value = finalText;
    document.getElementById("categories").value = selectedOptions;

    // ساخت یک شیء FormData برای ارسال داده‌ها
    var formData = new FormData(document.getElementById("myForm"));
    formData.set('projectTitle', projectTitle);
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
            var fixedText = "https://srswebsite.github.io/P/"; // متن ثابت
            var variableText = document.getElementById("variableInput").value; // متن متغیر

            // ترکیب متن ثابت و متغیر
            var finalText = fixedText + variableText;

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
