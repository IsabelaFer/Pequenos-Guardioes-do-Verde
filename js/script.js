// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Toggle do menu principal
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Impede que o clique se propague
      navLinks.classList.toggle('ativo');
      menuToggle.textContent = navLinks.classList.contains('ativo') ? '✕' : '☰';
      
      // Fecha todos os dropdowns quando o menu principal é aberto/fechado
      dropdowns.forEach(drop => {
        drop.classList.remove('active');
      });
    });
    
    // Fechar menu ao clicar em um link (exceto dropdown)
    const navItems = navLinks.querySelectorAll('a:not(.dropdown > a)');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('ativo');
          menuToggle.textContent = '☰';
        }
      });
    });
  }
  
  // DROPDOWN FUNCIONAL PARA MOBILE - CORRIGIDO
  if (dropdowns.length > 0) {
    dropdowns.forEach(dropdown => {
      const dropdownLink = dropdown.querySelector('a');
      const submenu = dropdown.querySelector('.submenu');
      
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
          
          // Fecha o submenu se estiver aberto e for clicado novamente
          if (dropdown.classList.contains('active')) {
            submenu.style.display = 'block';
          } else {
            submenu.style.display = 'none';
          }
        }
      });
    });
    
    // Fecha dropdowns ao clicar fora (apenas no mobile)
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        const isClickInsideDropdown = e.target.closest('.dropdown');
        const isClickInsideNavLinks = e.target.closest('.nav-links');
        const isClickOnMenuToggle = e.target.closest('.menu-toggle');
        
        // Se clicar fora do menu, fecha tudo
        if (!isClickInsideNavLinks && !isClickOnMenuToggle) {
          navLinks.classList.remove('ativo');
          menuToggle.textContent = '☰';
          dropdowns.forEach(drop => {
            drop.classList.remove('active');
          });
        }
        
        // Se clicar fora do dropdown específico (mas ainda dentro do menu)
        if (!isClickInsideDropdown && isClickInsideNavLinks) {
          dropdowns.forEach(drop => {
            drop.classList.remove('active');
          });
        }
      }
    });
  }
  
  // Submenu hover para desktop
  if (dropdowns.length > 0 && window.innerWidth > 768) {
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', function() {
        this.querySelector('.submenu').style.display = 'block';
      });
      
      dropdown.addEventListener('mouseleave', function() {
        this.querySelector('.submenu').style.display = 'none';
      });
    });
  }
  
  // Redimensionamento da janela
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Reset no mobile - volta ao estado desktop
      if (navLinks) {
        navLinks.classList.remove('ativo');
        menuToggle.textContent = '☰';
        navLinks.style.display = 'flex';
      }
      
      dropdowns.forEach(drop => {
        drop.classList.remove('active');
        const submenu = drop.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = 'none';
        }
      });
    } else {
      // Se voltar para mobile, garante que o menu está oculto
      if (navLinks) {
        navLinks.style.display = 'none';
      }
    }
  });
});