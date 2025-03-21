document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const dropdown = document.querySelector('.dropdown');
    const menuIconOpen = document.querySelector('.menu-icon-open');
    const menuIconClose = document.querySelector('.menu-icon-close');

    menuIcon.addEventListener('click', () => {
        dropdown.classList.toggle('show-dropdown');
        menuIconOpen.style.display = dropdown.classList.contains('show-dropdown') ? 'none' : 'block';
        menuIconClose.style.display = dropdown.classList.contains('show-dropdown') ? 'block' : 'none';
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        document.querySelector('.menu-icon-close').click();
      });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-icon') && !e.target.closest('.dropdown')) {
            dropdown.classList.remove('show-dropdown');
            menuIconOpen.style.display = 'block';
            menuIconClose.style.display = 'none';
        }
    });
});