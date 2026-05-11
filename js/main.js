// Nav scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  const currentPage = document.body.dataset.page;
  document.querySelector(`[data-page-link="${currentPage}"]`)?.classList.add('active');

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // Tabs
  function switchTab(id, button) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id)?.classList.add('active');
    button.classList.add('active');
  }

  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => switchTab(button.dataset.tab, button));
  });

  // WhatsApp
  function handleSubmit(source = document) {
    const name = source.querySelector('input[placeholder="Nama Lengkap"]')?.value || '-';
    const phone = source.querySelector('input[placeholder="No. Telepon / WhatsApp"]')?.value || '-';
    const service = source.querySelector('input[placeholder*="Jenis Layanan"]')?.value || '-';
    const msg = source.querySelector('textarea')?.value || '-';
    const text = encodeURIComponent(
      `Halo Harapan Jaya,\n\nNama: ${name}\nTelepon: ${phone}\nLayanan: ${service}\nPesan: ${msg}`
    );
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank');
  }

  document.querySelector('.contact-card .btn-submit')?.addEventListener('click', (event) => {
    handleSubmit(event.currentTarget.closest('.contact-card'));
  });

  function openWaModal() {
    document.getElementById('waModal')?.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeWaModal() {
    document.getElementById('waModal')?.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  function initWaFloat() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <button class="wa-float" type="button">Hubungi WA</button>
      <div class="wa-modal" id="waModal" aria-hidden="true">
        <div class="wa-modal-panel" role="dialog" aria-modal="true" aria-labelledby="waModalTitle">
          <div class="wa-modal-head">
            <h3 id="waModalTitle">Kirim Pesan</h3>
            <button class="wa-modal-close" type="button">Tutup</button>
          </div>
          <div class="contact-form-row">
            <input type="text" placeholder="Nama Lengkap">
          </div>
          <div class="contact-form-row">
            <input type="text" placeholder="No. Telepon / WhatsApp">
          </div>
          <div class="contact-form-row">
            <input type="text" placeholder="Jenis Layanan (Rent Car / Workshop / Biro / Towing)">
          </div>
          <div class="contact-form-row">
            <textarea rows="4" placeholder="Pesan atau detail kebutuhan Anda..."></textarea>
          </div>
          <button class="btn-submit wa-modal-submit" type="button">Kirim via WhatsApp →</button>
        </div>
      </div>
    `;

    document.body.append(...wrapper.children);

    document.querySelector('.wa-float')?.addEventListener('click', openWaModal);
    document.querySelector('.wa-modal-close')?.addEventListener('click', closeWaModal);
    document.querySelector('.wa-modal-submit')?.addEventListener('click', (event) => {
      handleSubmit(event.currentTarget.closest('.wa-modal-panel'));
    });
    document.getElementById('waModal')?.addEventListener('click', (event) => {
      if (event.target.id === 'waModal') {
        closeWaModal();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeWaModal();
      }
    });
  }

  initWaFloat();

  document.querySelectorAll('[data-testimonial-dir]').forEach((button) => {
    button.addEventListener('click', () => {
      const track = document.getElementById('testimonialTrack');
      const firstCard = track?.querySelector('.testimonial-card');

      if (!track || !firstCard) {
        return;
      }

      const direction = Number(button.dataset.testimonialDir);
      track.scrollBy({
        left: direction * (firstCard.getBoundingClientRect().width + 1),
        behavior: 'smooth',
      });
    });
  });

  // Hamburger (mobile)
  document.getElementById('ham')?.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
  });
