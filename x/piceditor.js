
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
 var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        var tempCtx = tempCanvas.getContext('2d');
        var imageInput = document.getElementById('imageInput');
        var imageInputSecond = document.getElementById('imageInputSecond');
        var uploadButton = document.getElementById('uploadButton');
        var uploadButtonSecond = document.getElementById('uploadButtonSecond');
        var image = null;
        var imageSecond = null;
        var imageWidth, imageHeight;
        var imageX = 0, imageY = 0; // مختصات تصویر اول
        var imageWidthSecond, imageHeightSecond;
        var imageXSecond = 100, imageYSecond = 100; // مختصات تصویر دوم
        var draggingResize = false;
        var draggingMove = false;
        var draggingResizeSecond = false;
        var draggingMoveSecond = false;
        var handleResize = document.getElementById('resize-handle');
        var handleMove = document.getElementById('move-handle');
        var handleResizeSecond = document.getElementById('resize-handle-second');
        var handleMoveSecond = document.getElementById('move-handle-second');
        var offsetX, offsetY;
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
		
		
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

   
let originalHTML = '';

        // افزودن رویداد به دکمه آپلود
        uploadButton.addEventListener('click', function() {
            if (imageInput.files.length > 0) {
                var file = imageInput.files[0];
                var reader = new FileReader();

                reader.onload = function(event) {
                    image = new Image();
                    image.onload = function() {
                        imageWidth = image.width;
                        imageHeight = image.height;
                        drawImages();
                        updateHandlesPosition();
                    };
                    image.src = event.target.result;
                };

                reader.readAsDataURL(file);
            } else {
                alert('لطفا یک تصویر را انتخاب کنید.');
            }
        });

        uploadButtonSecond.addEventListener('click', function() {
            if (imageInputSecond.files.length > 0) {
                var file = imageInputSecond.files[0];
                var reader = new FileReader();

                reader.onload = function(event) {
                    imageSecond = new Image();
                    imageSecond.onload = function() {
                        imageWidthSecond = imageSecond.width;
                        imageHeightSecond = imageSecond.height;
                        drawImages();
                        updateHandlesPosition();
                    };
                    imageSecond.src = event.target.result;
                };

                reader.readAsDataURL(file);
            } else {
                alert('لطفا یک تصویر را انتخاب کنید.');
            }
        });

        // به روز رسانی موقعیت دستگیره‌ها
        function updateHandlesPosition() {
            if (image) {
                handleResize.style.top = (imageY + imageHeight) + 'px';
                handleResize.style.left = (imageX + imageWidth - 20) + 'px';
                handleMove.style.top = (imageY) + 'px';
                handleMove.style.left = (imageX) + 'px';
            }

            if (imageSecond) {
                handleResizeSecond.style.top = (imageYSecond + imageHeightSecond) + 'px';
                handleResizeSecond.style.left = (imageXSecond + imageWidthSecond - 20) + 'px';
                handleMoveSecond.style.top = (imageYSecond) + 'px';
                handleMoveSecond.style.left = (imageXSecond) + 'px';
            }
        }

        // رسم تصاویر با اعمال افکت بلور بر روی تصویر اول
        function drawImages() {
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            if (image) {
                tempCtx.filter = 'blur(' + parseInt(document.getElementById('blur').value) + 'px)';
                tempCtx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
                tempCtx.filter = 'none';
            }

            if (imageSecond) {
                tempCtx.drawImage(imageSecond, imageXSecond, imageYSecond, imageWidthSecond, imageHeightSecond);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(tempCanvas, 0, 0);
        }

        // رویدادهای ماوس
        handleResize.addEventListener('mousedown', function(event) {
            draggingResize = true;
            offsetX = event.clientX - handleResize.offsetLeft;
            offsetY = event.clientY - handleResize.offsetTop;
        });

        handleMove.addEventListener('mousedown', function(event) {
            draggingMove = true;
            offsetX = event.clientX - handleMove.offsetLeft;
            offsetY = event.clientY - handleMove.offsetTop;
        });

        handleResizeSecond.addEventListener('mousedown', function(event) {
            draggingResizeSecond = true;
            offsetX = event.clientX - handleResizeSecond.offsetLeft;
            offsetY = event.clientY - handleResizeSecond.offsetTop;
        });

        handleMoveSecond.addEventListener('mousedown', function(event) {
            draggingMoveSecond = true;
            offsetX = event.clientX - handleMoveSecond.offsetLeft;
            offsetY = event.clientY - handleMoveSecond.offsetTop;
        });

        document.addEventListener('mousemove', function(event) {
            if (draggingResize) {
                var x = event.clientX - offsetX;
                var y = event.clientY - offsetY;

                // به روز رسانی ابعاد تصویر اول
                imageWidth = x - imageX + 20;
                imageHeight = y - imageY;

                drawImages();
                updateHandlesPosition();
            } else if (draggingMove) {
                var x = event.clientX - offsetX;
                var y = event.clientY - offsetY;

                // به روز رسانی مختصات تصویر اول
                imageX = x - 10;
                imageY = y - 10;

                drawImages();
                updateHandlesPosition();
            } else if (draggingResizeSecond) {
                var x = event.clientX - offsetX;
                var y = event.clientY - offsetY;

                // به روز رسانی ابعاد تصویر دوم
                imageWidthSecond = x - imageXSecond + 20;
                imageHeightSecond = y - imageYSecond;

                drawImages();
                updateHandlesPosition();
            } else if (draggingMoveSecond) {
                var x = event.clientX - offsetX;
                var y = event.clientY - offsetY;

                // به روز رسانی مختصات تصویر دوم
                imageXSecond = x - 10;
                imageYSecond = y - 10;

                drawImages();
                updateHandlesPosition();
            }
        });

        document.addEventListener('mouseup', function() {
            draggingResize = false;
            draggingMove = false;
            draggingResizeSecond = false;
            draggingMoveSecond = false;
        });

        // رویدادهای تغییر تنظیمات
        document.getElementById('blur').addEventListener('input', function() {
            var blur = this.value;
            document.getElementById('blurValue').innerText = blur + 'px';
            drawImages();
        });

        var saveButton = document.getElementById('saveButton');

        saveButton.addEventListener('click', function() {
            var dataURL = canvas.toDataURL('image/jpeg', 0.5); // کیفیت تصویر را می‌توانید تنظیم کنید
            var link = document.createElement('a');
            link.href = dataURL;
            link.download = 'a.jpg';
            link.click();
        });