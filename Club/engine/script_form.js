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

const scriptURL = "https://script.google.com/macros/s/AKfycbyQnqPDB8Kst0CIbI2Ww_Sh0ldrOG_iImKEIKG6otIwPh9lKL1sZKrvNt6NJNALE3na/exec";

function collectCheckboxValues() {
    var variableText = document.getElementById("variableInput2").value; // متن متغیر از فیلد ورودی

    // جمع‌آوری مقادیر چک باکس‌ها
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedOptions = Array.from(checkboxes).map(cb => cb.value).join(", ");

    // گرفتن مقادیر عنوان پروژه و مختصات
    var projectTitle = document.getElementById("projectTitle").value;
    var projectCoordinates = document.getElementById("projectCoordinates").value;




    // قرار دادن متن متغیر و گزینه‌های انتخاب شده در فیلدهای مخفی
    document.getElementById("combinedText2").value = variableText;
    document.getElementById("categories").value = selectedOptions;

    // ساخت یک شیء FormData برای ارسال داده‌ها
    var formData = new FormData(document.getElementById("myForm"));
    formData.set('projectTitle', projectTitle);
    formData.set('projectCoordinates', projectCoordinates);
}

// افزودن رفتار به فرم
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("myForm").onsubmit = function (event) {
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
});

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
 
   function loadFixedLink() {
    var fixedLink = "https://docs.google.com/spreadsheets/d/1W0M98rx_S1PxQw3UghUV1rmSBAz4vyJh0EkPN78iSrM/edit?usp=sharing"; // لینک جدول 1

    // نمایش لینک ثابت در آیفریم
    var siteFrame = document.getElementById("unique-siteFrame");
    siteFrame.src = fixedLink;
}

function loadFixedLink2() {
    var fixedLink2 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9r4udI64qCDCby1kdDd1D_6UJwl0rVSOu8eZ9uqvZyaQQBWdXfxUyNHHSTYTJ_SblNvQEe8SQK3BO/pubhtml"; // لینک جدول 2

    // نمایش لینک ثابت در آیفریم
    var siteFrame = document.getElementById("unique-siteFrame");
    siteFrame.src = fixedLink2;
}

function loadFixedLink3() {
    var fixedLink3 = "map.html"; // لینک جدول 3

    // نمایش لینک ثابت در آیفریم
    var siteFrame = document.getElementById("unique-siteFrame");
    siteFrame.src = fixedLink3;
}
