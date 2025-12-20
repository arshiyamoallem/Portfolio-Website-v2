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
  
  // ✅ Call it immediately (or later if you want to wait for the DOM)
  document.addEventListener('DOMContentLoaded', setupDarkModeToggle);
  

document.addEventListener('DOMContentLoaded', () => {
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

    // Center modal content
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
  });

  // Close modal on X button click
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Close modal when clicking outside modal content (modal background)
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // --- Draggable textarea container inside modal ---
  const draggableContainer = modalContent.querySelector('.draggable-textarea-container');

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  draggableContainer.style.top = '100px';
  draggableContainer.style.left = '20px';
  draggableContainer.style.cursor = 'grab';

  draggableContainer.addEventListener('mousedown', e => {
    e.preventDefault(); // prevent text selection
    isDragging = true;
    const rect = draggableContainer.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    draggableContainer.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;

    let newLeft = e.clientX - dragOffsetX;
    let newTop = e.clientY - dragOffsetY;

    const modalRect = modalContent.getBoundingClientRect();
    const boxRect = draggableContainer.getBoundingClientRect();

    // Clamp movement inside modal content boundaries
    newLeft = Math.min(Math.max(newLeft, modalRect.left), modalRect.right - boxRect.width);
    newTop = Math.min(Math.max(newTop, modalRect.top), modalRect.bottom - boxRect.height);

    // Convert to modalContent relative coords
    const relativeLeft = newLeft - modalRect.left;
    const relativeTop = newTop - modalRect.top;

    draggableContainer.style.left = `${relativeLeft}px`;
    draggableContainer.style.top = `${relativeTop}px`;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      draggableContainer.style.cursor = 'grab';
    }
  });
});