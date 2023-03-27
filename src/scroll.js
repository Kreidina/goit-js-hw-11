import { refs } from '.';

function smoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', smoothScrolling);
refs.gallery.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  window.removeEventListener('scroll', smoothScrolling);
}
