document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const dropdown = document.querySelector('.dropdown');
  const menuIconOpen = document.querySelector('.menu-icon-open');
  const menuIconClose = document.querySelector('.menu-icon-close');

  menuIcon.addEventListener('click', () => {
    const isOpen = dropdown.classList.toggle('show-dropdown');
    menuIconOpen.style.display = isOpen ? 'none' : 'block';
    menuIconClose.style.display = isOpen ? 'block' : 'none';

    // Alterna visibilidade do botão "Cadastrar"
    const mainLogin = document.getElementById("nav-login");
    const dropdownLogin = document.getElementById("nav-login-dropdown");
    if (mainLogin && dropdownLogin) {
      mainLogin.style.display = isOpen ? 'none' : 'inline-block';
      dropdownLogin.style.display = isOpen ? 'inline-block' : 'none';
    }
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