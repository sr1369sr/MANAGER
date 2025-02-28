const saveButton = document.getElementById('save-btn');
const htmlContent = document.getElementById('html-content');
const fileInput = document.getElementById('file-input');
const txtFileInput = document.getElementById('txt-file-input');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const previewFrame = document.getElementById('preview-frame');
const clearButton = document.getElementById('clear-btn');
const scriptLink = "https://script.google.com/macros/s/AKfycbzul-qoTBTopUFU1twuJXCLkFt5stK-00f7LTJDjxXo7Icz2OrPLVXixnhBFmSGtLT1CA/exec";

    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

   
let originalHTML = '';

// Load the selected HTML file
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/html') {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalHTML = e.target.result;
            htmlContent.value = originalHTML;
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid HTML file.');
    }
});

saveButton.addEventListener('click', async () => {
    const zip = new JSZip();

    // اضافه کردن فایل index.html
    const content = htmlContent.value;
    zip.file("index.html", content);

    // دریافت فایل‌ها از پوشه Content1
    const folderInput = document.getElementById('folder-input');
    const files = folderInput.files;

    // اضافه کردن فایل‌ها و پوشه‌ها به ZIP با حفظ ساختار
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // حفظ ساختار پوشه
        const filePath = file.webkitRelativePath;
        zip.file(filePath, file);
    }

    // ایجاد فایل ZIP
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // ذخیره فایل ZIP
    saveAs(zipBlob, "p.zip");
});

// Show preview in iframe
document.getElementById('preview-btn').addEventListener('click', () => {
    previewFrame.srcdoc = htmlContent.value;
});

// دکمه حرکت قبل بعد
let history = [];
let historyIndex = -1;
const maxHistory = 50; // تعداد تغییرات حداکثری که ذخیره می‌شود

htmlContent.addEventListener('input', () => {
    // وقتی کاربر متنی را وارد می‌کند، تغییرات را در تاریخچه ذخیره می‌کنیم
    // محدود کردن تعداد تاریخچه‌های ذخیره‌شده
    if (historyIndex < history.length - 1) {
        // اگر در وسط تغییرات هستیم و کاربر از Undo/Redo استفاده کرده، حذف می‌کنیم
        history = history.slice(0, historyIndex + 1);
    }

    // اضافه کردن وضعیت جدید به تاریخچه
    history.push(htmlContent.value);

    // اگر تعداد تاریخچه از حد مجاز بیشتر شد، اولین تغییر را حذف می‌کنیم
    if (history.length > maxHistory) {
        history.shift(); // حذف اولین مورد در آرایه
    }

    // به‌روزرسانی ایندکس تاریخچه
    historyIndex = history.length - 1;
});







// لیست کلمات برای جایگزینی
const wordsToReplace = [
    'عنوان1',
    'عنوان2',
    'عنوان3',
    'عنوان4',
    'عنوان5',
	'عنوان6',
	'عنوان7',
	'عنوان8',
	'عنوان9',
	'عنوان10',
	'عنوان11',
	'عنوان12',
    'متن1',
    'متن2',
    'متن3',
    'متن4',
    'متن5',
	'لینک1',
	'لینک2',
	'لینک3',
];

// تابع جایگزینی متن
function replaceText(wordIndex) {
    const uniqueReplaceInput = document.getElementById('unique-replace-input');
    const htmlContent = document.getElementById('html-content');
    const originalText = wordsToReplace[wordIndex]; // متن اصلی
    const newText = uniqueReplaceInput.value; // متن جدید

    // جایگزینی متن در محتوای HTML
    const updatedContent = htmlContent.value.replace(new RegExp(originalText, 'g'), newText);
    htmlContent.value = updatedContent;

    // به‌روزرسانی پیش‌نمایش
    document.getElementById('preview-frame').srcdoc = htmlContent.value;

    // به‌روزرسانی تاریخچه
    let history = window.history || [];
    let historyIndex = window.historyIndex || -1;
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(htmlContent.value);
    if (history.length > 50) {
        history.shift();
    }
    historyIndex = history.length - 1;
    window.history = history;
    window.historyIndex = historyIndex;
}

// ایجاد دکمه‌ها برای هر کلمه
for (let i = 0; i < wordsToReplace.length; i++) {
    const button = document.createElement('button');
    button.textContent = `جایگزین ${wordsToReplace[i]}`;
    button.onclick = () => replaceText(i);
    document.getElementById('replace-buttons').appendChild(button); // دکمه‌ها را به بخش مربوطه اضافه می‌کند
}

// Function to load HTML content from a file
function loadHtmlFile(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            htmlContent.value = data; // Set the content of the textarea
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Load Slide 01
document.getElementById('load-slide01').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide01.html');
});

// Load Slide 02
document.getElementById('load-slide02').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide02.html');
});
// Load Slide 03
document.getElementById('load-slide03').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide03.html');
});
// Load Slide 04
document.getElementById('load-slide04').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide04.html');
});
// Load Slide 05
document.getElementById('load-slide05').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide05.html');
});
// Load Slide 06
document.getElementById('load-slide06').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide06.html');
});
// Load Slide 07
document.getElementById('load-slide07').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide07.html');
});
// Load Slide 08
document.getElementById('load-slide08').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide08.html');
});
// Load Slide 09
document.getElementById('load-slide09').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide09.html');
});
// Load Slide 010
document.getElementById('load-slide010').addEventListener('click', () => {
    loadHtmlFile('Content/sliders/slide010.html');
});
// Load sample 01
document.getElementById('load-sample01').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (1).html');
});
// Load sample 02
document.getElementById('load-sample02').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (2).html');
});
// Load sample 03
document.getElementById('load-sample03').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (3).html');
});
// Load sample 04
document.getElementById('load-sample04').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (4).html');
});
// Load sample 05
document.getElementById('load-sample05').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (5).html');
});
// Load sample 06
document.getElementById('load-sample06').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (6).html');
});
// Load sample 07
document.getElementById('load-sample07').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (7).html');
});
// Load sample 08
document.getElementById('load-sample08').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (8).html');
});
// Load sample 09
document.getElementById('load-sample09').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (9).html');
});
// Load sample 010
document.getElementById('load-sample010').addEventListener('click', () => {
    loadHtmlFile('Content/A&B/index (10).html');
});
// Load cart 01
document.getElementById('load-cart01').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (1).html');
});
// Load cart 02
document.getElementById('load-cart02').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (2).html');
});
// Load cart 03
document.getElementById('load-cart03').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (3).html');
});
// Load cart 04
document.getElementById('load-cart04').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (4).html');
});
// Load cart 05
document.getElementById('load-cart05').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (5).html');
});
// Load cart 06
document.getElementById('load-cart06').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (6).html');
});
// Load cart 07
document.getElementById('load-cart07').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (7).html');
});
// Load cart 08
document.getElementById('load-cart08').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (8).html');
});
// Load cart 09
document.getElementById('load-cart09').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (9).html');
});
// Load cart 010
document.getElementById('load-cart010').addEventListener('click', () => {
    loadHtmlFile('Content/Cartes/index (10).html');
});

// Clear the editor and preview
clearButton.addEventListener('click', () => {
    htmlContent.value = '';
    previewFrame.srcdoc = '';
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
	
	 function downloadFolder() {
      window.open(scriptLink, "_blank");
    }