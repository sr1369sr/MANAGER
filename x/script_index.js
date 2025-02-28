const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
  
  
  sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

   
let originalHTML = '';


// تابع برای باز و بسته کردن پنل‌های آکاردئونی
function toggleAccordion(event) {
    const content = event.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
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


    // تابع برای بارگذاری صفحات در آیفریم منحصربه‌فرد
    function loadPage(pageUrl) {
      const iframe = document.getElementById('unique-iframe');
      iframe.src = pageUrl;
    }
	
	 sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
