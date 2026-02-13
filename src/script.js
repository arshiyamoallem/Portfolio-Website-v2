function setupDarkModeToggle() {
    let darkmode = localStorage.getItem('darkmode');
    const themeSwitch = document.getElementById('theme-switch');
  
    const enableDarkmode = () => {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkmode', 'active');
    };
  
    const disableDarkmode = () => {
      document.body.classList.remove('darkmode');
      localStorage.setItem('darkmode', null);
    };
  
    themeSwitch.addEventListener("click", () => {
      darkmode = localStorage.getItem('darkmode');
      darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });
  
    if (darkmode === "active") enableDarkmode();
}

document.addEventListener('DOMContentLoaded', setupDarkModeToggle);

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const topnav = document.querySelector('.topnav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      topnav.classList.toggle('mobile-open');
      const icon = mobileMenuToggle.querySelector('i');
      if (topnav.classList.contains('mobile-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.topnav a:not(#theme-switch):not(#mobile-menu-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          topnav.classList.remove('mobile-open');
          const icon = mobileMenuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
  
  // Smooth scroll for nav links with hash
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const contactBtn = document.getElementById('contactBtn');
  const modal = document.getElementById('contactModal');
  const closeBtn = modal.querySelector('.close-btn');
  const modalContent = modal.querySelector('.modal-content');

  // Show modal on Contact button click
  contactBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });

  // Close modal on X button click
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking outside modal content
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // Handle window resize - close mobile menu if resized above mobile breakpoint
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && topnav.classList.contains('mobile-open')) {
        topnav.classList.remove('mobile-open');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }, 250);
  });
});
