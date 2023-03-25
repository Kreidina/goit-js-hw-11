import { refs } from '.';

let isScrollingAllowed = true;

function smoothScrolling() {
  if (!isScrollingAllowed) return;
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', smoothScrolling);
refs.gallery.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  isScrollingAllowed = false;
  window.removeEventListener('scroll', smoothScrolling);
}
