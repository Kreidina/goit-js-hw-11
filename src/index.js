import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);


function onSubmit(e) {
  e.preventDefault();
 const searchImage = e.target[0].value;
 
  fetchCountries(searchImage)
    .then(data => {
      const files = data.hits;
      files.map(file => {
        appendMarkupPhoto(file);
      });
    })
    .catch(error => console.log(error));
}

function fetchCountries(search) {
  return fetch(
    `https://pixabay.com/api/?key=34706301-fa7c25ab6ec07e5fc9fe6ac6d&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads`
  ).then(response => response.json());
}

function appendMarkupPhoto(file) {
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
