// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Toggle do menu principal
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('ativo');
      menuToggle.textContent = navLinks.classList.contains('ativo') ? '✕' : '☰';
    });
    
    // Fechar menu ao clicar em um link (mobile)
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('ativo');
          menuToggle.textContent = '☰';
          
          // Fechar submenus abertos
          dropdowns.forEach(drop => {
            drop.classList.remove('active');
          });
        }
      });
    });
  }
  
  // Dropdown para mobile (touch)
  if (dropdowns.length > 0) {
    dropdowns.forEach(dropdown => {
      const dropdownLink = dropdown.querySelector('a');
      
      dropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          // Fecha outros dropdowns
          dropdowns.forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('active');
            }
          });
          
          // Abre/fecha o dropdown atual
          dropdown.classList.toggle('active');
        }
      });
    });
    
    // Fecha dropdowns ao clicar fora
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
        dropdowns.forEach(drop => {
          drop.classList.remove('active');
        });
      }
    });
  }
  
  // Redimensionamento da janela
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Reset no mobile
      if (navLinks) {
        navLinks.classList.remove('ativo');
        menuToggle.textContent = '☰';
      }
      
      dropdowns.forEach(drop => {
        drop.classList.remove('active');
      });
    }
  });
});