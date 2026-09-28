document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // 2. Highlight link menu aktif saat di-scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${sectionId}`
          );
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Animasi muncul (reveal) dengan IntersectionObserver
  const cards = document.querySelectorAll('.card-reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach((card) => card.classList.add('visible'));
  }

  // 4. Modal Detail Proyek
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalClose = document.querySelector('.modal-close');
  const projectButtons = document.querySelectorAll('.project-button');

  const openModal = (title, image, desc) => {
    modalTitle.textContent = title;
    modalImage.src = image;
    modalDescription.textContent = desc;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  projectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const { title, image, description } = btn.dataset;
      openModal(title, image, description);
    });
  });

  modalClose?.addEventListener('click', closeModal);

  // Tutup modal jika klik di luar box putih/area hitam
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Tutup modal dengan tombol Escape keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Penanganan Form Kontak
  const contactForm = document.getElementById('form-kontak');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Terima kasih, ${name}! Pesan Anda telah berhasil dikirim.`);
    contactForm.reset();
  });
});