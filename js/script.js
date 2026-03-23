// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Set current year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Lightweight carousels
document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');

  const scrollByOne = () => {
    const card = track.querySelector('.card');
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width + 24; // 24 gap
    return cardWidth;
  };

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -(scrollByOne() || 300), behavior: 'smooth' });
  });
  next?.addEventListener('click', () => {
    track.scrollBy({ left: (scrollByOne() || 300), behavior: 'smooth' });
  });
});

// Checkout qty & total (very basic demo)
const qtyWrap = document.querySelector('.qty');
const totalField = document.getElementById('orderTotal');
if (qtyWrap && totalField) {
  const input = qtyWrap.querySelector('input');
  const price = 20000;
  const format = (n) => n.toLocaleString('en-KE'); // grouped with commas
  const update = () => (totalField.value = format(price * Number(input.value || 1)));
  qtyWrap.addEventListener('click', (e) => {
    const step = Number(e.target.getAttribute('data-step'));
    if (!isNaN(step)) {
      input.value = Math.max(1, Number(input.value || 1) + step);
      update();
    }
  });
  input.addEventListener('input', update);
  update();
}