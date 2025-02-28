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

  const apiUrl = 'https://script.google.com/macros/s/AKfycbwuVtsnhbwYHhkpidwR-d6Lx-DWM3GkZkF9PNhfP2QZD57v28z3bVG61AaEsOTjcHIY8A/exec'; // آدرس وب اپ شما
        let currentFolderId = "1SFv5Cxc1M7wSzFKnuC9scTETa9pLrYzg"; // شناسه پوشه اصلی
		const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
		
		sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });


        // آپلود فایل
        function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files; // حالا اینجا چند فایل می‌گیریم
    if (files.length === 0) {
        alert('لطفاً یک یا چند فایل انتخاب کنید.');
        return;
    }

    // برای هر فایل یک آپلود جداگانه انجام بده
    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onloadend = function() {
            const base64data = reader.result.split(',')[1];

            const formData = new FormData();
            formData.append('action', 'upload');
            formData.append('fileData', base64data);
            formData.append('fileName', file.name);

            fetch(apiUrl, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert('فایل با موفقیت آپلود شد.');
                loadFileList();
            })
            .catch(error => {
                alert('خطا در آپلود فایل.');
            });
        };

        reader.readAsDataURL(file);
    });
}

  // تابع برای رفرش کردن آیفریم
    function refreshIframe() {
        var iframe = document.getElementById('driveIframe');
        var src = iframe.src;
        iframe.src = ''; // ابتدا آیفریم را خالی می‌کنیم
        iframe.src = src; // دوباره آدرس قبلی را به آیفریم می‌دهیم
    }
	
        // ایجاد پوشه جدید
        function createFolder() {
            const folderName = document.getElementById("folderNameInput").value;
            if (folderName) {
                const formData = new FormData();
                formData.append('action', 'createFolder');
                formData.append('folderName', folderName);

                fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    alert("پوشه جدید با موفقیت ایجاد شد.");
                    loadFileList();
                })
                .catch(error => {
                    alert("خطا در ایجاد پوشه.");
                });
            } else {
                alert("لطفاً نام پوشه را وارد کنید.");
            }
        }

        // بارگذاری لیست فایل‌ها
        function loadFileList() {
            const formData = new FormData();
            formData.append('action', 'getFileList');

            fetch(apiUrl, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => displayFiles(data))
            .catch(error => {
                alert('خطا در بارگذاری فایل‌ها.');
            });
        }

        // نمایش لیست فایل‌ها و پوشه‌ها
        function displayFiles(files) {
            const fileList = document.getElementById("fileList");
            const currentPath = document.getElementById("currentPath");
            fileList.innerHTML = ""; // پاک کردن محتوای قبلی

            // به‌روزرسانی مسیر جاری
            currentPath.textContent = "مسیر جاری: " + (files.path || "/");

            if (files.items.length === 0) {
                fileList.innerHTML = "<p>هیچ فایلی یافت نشد.</p>";
            } else {
                files.items.forEach(file => {
                    const div = document.createElement("div");
                    div.innerHTML = `
                        <p>${file.name} - ${file.size || ""} ${file.lastUpdated || ""}</p>
                        ${
                            file.isFolder
                                ? `<button onclick="openFolder('${file.id}')">باز کردن پوشه</button>
                                   <button onclick="deleteItem('${file.id}', true)">حذف</button>
                                   <button onclick="renameItem('${file.id}', true)">تغییر نام</button>`
                                : `<button onclick="deleteItem('${file.id}', false)">حذف</button>
                                   <button onclick="renameItem('${file.id}', false)">تغییر نام</button>
                                   <button onclick="downloadFile('${file.id}')">دانلود</button>`
                        }
                    `;
                    fileList.appendChild(div);
                });
            }
        }

        // باز کردن پوشه
        function openFolder(folderId) {
            currentFolderId = folderId;
            loadFileList();
        }

        // حذف فایل یا پوشه
        function deleteItem(itemId, isFolder) {
            const formData = new FormData();
            formData.append('action', isFolder ? 'deleteFolder' : 'deleteFile');
            formData.append('itemId', itemId);

            fetch(apiUrl, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert(isFolder ? "پوشه با موفقیت حذف شد." : "فایل با موفقیت حذف شد.");
                loadFileList();
            })
            .catch(error => {
                alert('خطا در حذف آیتم.');
            });
        }
	function renameItem(itemId, isFolder) {
    const newName = prompt("نام جدید را وارد کنید:");
    if (newName) {
        const formData = new FormData();
        formData.append('action', 'renameItem');
        formData.append('itemId', itemId);
        formData.append('newName', newName);
        formData.append('isFolder', isFolder);

        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("نام با موفقیت تغییر یافت.");
                loadFileList();
            } else {
                alert("خطا در تغییر نام: " + data.error);
            }
        })
        .catch(error => {
            alert("خطای شبکه هنگام تغییر نام.");
        });
    }
}
function downloadFile(fileId) {
    const formData = new FormData();
    formData.append('action', 'getFileUrl');
    formData.append('fileId', fileId);

    fetch(apiUrl, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // هدایت کاربر به لینک دانلود
            window.open(data.url, '_blank');
        } else {
            alert("خطا در دریافت لینک دانلود: " + data.error);
        }
    })
    .catch(error => {
        alert("خطای شبکه هنگام دریافت لینک دانلود.");
    });
}


        // بارگذاری لیست فایل‌ها هنگام بارگذاری صفحه
        loadFileList();