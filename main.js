// Mobile / desktop hamburger navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');

        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('open')) {
            spans[0].style.transform = 'translateY(6px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });

    navMenu.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            navToggle.querySelectorAll('span').forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    reveals.forEach(el => observer.observe(el));
} else {
    reveals.forEach(el => el.classList.add('visible'));
}


// Tap-to-reveal support for service cards on touch devices
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length) {
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('show-details');
        });
    });
}


// Mobile tap support for gallery hover pairs
document.querySelectorAll('.gallery-pair').forEach(function(card) {
    card.addEventListener('click', function() {
        card.classList.toggle('active');
    });
});


// Gallery show/hide toggle
const galleryGrid = document.querySelector('.gallery-grid');
const galleryToggleBtn = document.getElementById('galleryToggleBtn');

if (galleryGrid && galleryToggleBtn) {
    galleryToggleBtn.addEventListener('click', () => {
        const expanded = galleryGrid.classList.toggle('show-all');
        galleryToggleBtn.textContent = expanded
            ? 'Show fewer photos'
            : 'Show more project photos';
    });
}

// Services tabs toggle
const serviceTabs = document.querySelectorAll('.services-tab');
const servicePanels = document.querySelectorAll('.services-panel');

if (serviceTabs.length && servicePanels.length) {
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-panel');
            serviceTabs.forEach(t => t.classList.remove('active'));
            servicePanels.forEach(panel => {
                if (panel.getAttribute('data-panel') === target) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
            tab.classList.add('active');
        });
    });
}

// Typing effect for director headings
document.addEventListener('DOMContentLoaded', () => {
  const typeHeadings = document.querySelectorAll('.type-heading');
  typeHeadings.forEach((el, index) => {
    const fullText = el.getAttribute('data-type-text');
    if (!fullText) return;
    el.textContent = '';
    const delayBefore = 400 + index * 400; // stagger
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        el.textContent = fullText.slice(0, i + 1);
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
        }
      }, 80);
    }, delayBefore);
  });
});

// Projects stats counter + reveal on scroll
document.addEventListener('DOMContentLoaded', () => {
  const statSection = document.querySelector('.projects-stats');
  const statItems = document.querySelectorAll('.projects-stats .stat-item');
  const statNumbers = document.querySelectorAll('.projects-stats .stat-number');
  if (!statSection) return;

  const easeOutQuad = t => t * (2 - t);

  const runCounters = () => {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      if (!target) return;
      let frame = 0;
      const duration = 150; // frames
      const startText = num.textContent.replace(/[^0-9]/g, '');
      const start = parseInt(startText || '0', 10);

      const suffix = num.textContent.replace(/[0-9]/g, '');
      const tick = () => {
        frame++;
        const progress = easeOutQuad(Math.min(frame / duration, 1));
        const current = Math.round(start + (target - start) * progress);
        num.textContent = current.toLocaleString() + suffix;
        if (frame < duration) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    });
  };

  let hasAnimated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statItems.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 120);
        });
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statSection);
});

// Reveal flip cards on scroll
document.addEventListener('DOMContentLoaded', () => {
  const flipCards = document.querySelectorAll('.projects-flip-grid .flip-card');
  if (!flipCards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  flipCards.forEach(card => observer.observe(card));
});



// Projects accordion interaction
document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.project-accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.project-accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('project-accordion-item--active');

      // close all
      accordionItems.forEach(i => {
        i.classList.remove('project-accordion-item--active');
        const h = i.querySelector('.project-accordion-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      // reopen clicked if it was not active
      if (!isActive) {
        item.classList.add('project-accordion-item--active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
