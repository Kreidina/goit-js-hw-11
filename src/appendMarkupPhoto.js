import { refs } from '.';

export async function appendMarkupPhoto(file) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = file;

  const galleryMarkup = `
    <div class="photo-card">
  <a href = ${largeImageURL} class = 'link'>
  <img class = 'img' src="${webformatURL}" alt="${tags}" loading="lazy" />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
`;
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}
