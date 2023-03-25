import SimpleLightbox from 'simplelightbox';

export function simplelightbox() {
  const photoLink = document.querySelectorAll('.photo-card a');
  if (photoLink) {
    let gallery = new SimpleLightbox(photoLink);
    gallery.on('show.simplelightbox').refresh();
  }
}
