function toggleTab(event, tabId) {
      const tabButton = event.target;
      const tabContent = document.getElementById(tabId);

      if (tabButton.classList.contains('active')) {
        tabButton.classList.remove('active');
        tabContent.style.opacity = '0';
        tabContent.style.transform = 'translateY(-20px)';
        tabContent.style.maxHeight = '0';
      } else {
        const activeButton = document.querySelector('.tab-button.active');
        const activeContent = document.querySelector('.tab-content[style*="max-height"]');

        if (activeButton) {
          activeButton.classList.remove('active');
          activeContent.style.opacity = '0';
          activeContent.style.transform = 'translateY(-20px)';
          activeContent.style.maxHeight = '0';
        }

        tabButton.classList.add('active');
        tabContent.style.opacity = '1';
        tabContent.style.transform = 'translateY(0)';
        tabContent.style.maxHeight = '500px';
      }
    }