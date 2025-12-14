// =============================
// MENU MOBILE - FUNCIONA NO EMULADOR E CELULAR
// =============================

document.addEventListener('DOMContentLoaded', function() {
  // ELEMENTOS
  const menuBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  const oficinasBtn = document.querySelector('.dropdown > a');
  let menuAberto = false;
  
  // 1. MENU HAMBURGUER (Funciona com clique/touch)
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      menuAberto = !menuAberto;
      navMenu.classList.toggle('ativo');
      menuBtn.textContent = menuAberto ? '✕' : '☰';
      
      // Se estiver abrindo o menu, fecha os submenus
      if (menuAberto) {
        const submenus = document.querySelectorAll('.submenu.ativo');
        submenus.forEach(sub => sub.classList.remove('ativo'));
      }
    });
  }
  
  // 2. DROPDOWN DAS OFICINAS (Touch/click melhorado)
  if (oficinasBtn) {
    // Para celular real (touch rápido)
    oficinasBtn.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
          const estaAberto = submenu.classList.contains('ativo');
          
          // Fecha outros submenus
          document.querySelectorAll('.submenu.ativo').forEach(sm => {
            if (sm !== submenu) sm.classList.remove('ativo');
          });
          
          // Abre/fecha este
          submenu.classList.toggle('ativo');
          
          // Se estava fechando, não faz nada extra
          if (!estaAberto && submenu.classList.contains('ativo')) {
            // Submenu foi aberto
          }
        }
      }
    });
    
    // Para emulador (touchstart - mais sensível)
    oficinasBtn.addEventListener('touchstart', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
          submenu.classList.toggle('ativo');
        }
      }
    }, { passive: false });
  }
  
  // 3. FECHAR TUDO AO CLICAR EM UM LINK
  const todosLinks = document.querySelectorAll('.nav-links a');
  
  todosLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Apenas para links que NÃO são o dropdown principal
      if (!this.parentElement.classList.contains('dropdown') || 
          (this.parentElement.classList.contains('dropdown') && 
           this.nextElementSibling && 
           this.nextElementSibling.classList.contains('submenu'))) {
        // É o link "Oficinas▾", já tratado acima
        return;
      }
      
      // Para outros links (Início, Galeria, Sobre, ou links do submenu)
      if (window.innerWidth <= 768) {
        // Fecha menu
        if (navMenu) {
          navMenu.classList.remove('ativo');
          menuAberto = false;
        }
        
        // Reseta botão
        if (menuBtn) {
          menuBtn.textContent = '☰';
        }
        
        // Fecha submenus
        document.querySelectorAll('.submenu.ativo').forEach(sub => {
          sub.classList.remove('ativo');
        });
        
        // Aguarda um pouco antes de navegar (para ver a animação)
        setTimeout(() => {
          // Permite a navegação normal
        }, 100);
      }
    });
  });
  
  // 4. FECHAR MENU AO CLICAR FORA (IMPORTANTE!)
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && menuAberto) {
      const clicouNoMenu = e.target.closest('.navbar');
      const clicouNoBotaoMenu = e.target.closest('.menu-toggle');
      
      if (!clicouNoMenu && !clicouNoBotaoMenu) {
        // Fecha tudo
        navMenu.classList.remove('ativo');
        menuBtn.textContent = '☰';
        menuAberto = false;
        
        document.querySelectorAll('.submenu.ativo').forEach(sub => {
          sub.classList.remove('ativo');
        });
      }
    }
  });
  
  // 5. FECHAR SUBMENU AO CLICAR FORA (específico para submenu)
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const clicouNoDropdown = e.target.closest('.dropdown');
      const submenuAberto = document.querySelector('.submenu.ativo');
      
      if (submenuAberto && !clicouNoDropdown) {
        // Clicou fora do dropdown com submenu aberto
        submenuAberto.classList.remove('ativo');
      }
    }
  });
  
  // 6. AJUSTAR AO REDIMENSIONAR
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Modo desktop - reseta tudo
      if (navMenu) {
        navMenu.classList.remove('ativo');
        navMenu.style.display = 'flex';
      }
      if (menuBtn) {
        menuBtn.textContent = '☰';
        menuBtn.style.display = 'none';
      }
      menuAberto = false;
      
      document.querySelectorAll('.submenu.ativo').forEach(sub => {
        sub.classList.remove('ativo');
        sub.style.display = '';
      });
    } else {
      // Modo mobile
      if (menuBtn) {
        menuBtn.style.display = 'block';
      }
      if (navMenu) {
        navMenu.style.display = 'none';
      }
    }
  });
  
  // Configuração inicial
  if (window.innerWidth <= 768 && menuBtn) {
    menuBtn.style.display = 'block';
  }
});

// comentário