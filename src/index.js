import Notiflix from 'notiflix';
import InfiniteScroll from 'infinite-scroll';

import { fetchPictures } from './fetchPictures';
import { appendMarkupPhoto } from './appendMarkupPhoto';
import { simplelightbox } from './simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';

export const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  window: document.querySelector('window'),
};

refs.form.addEventListener('submit', onSubmit);

const url = 'https://pixabay.com/api/?key=34706301-fa7c25ab6ec07e5fc9fe6ac6d';
let searchImage;
let page = 1;

const infiniteScroll = new InfiniteScroll(refs.gallery, {
  responseType: 'text',
  history: false,
  path: function () {
    return `${url}&q=${searchImage}&image_type=photo&orientation=horizontal&safesearch=true&page=${++page}&per_page=40`;
  },
  status: '.scroll-status',
  checkLastPage: true,
  onInit: function () {
    this.on('load', appendImages);
  },
});

function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  searchImage = e.target[0].value;

  if (searchImage.length === 0) {
    refs.gallery.innerHTML = '';
  }

  fetchPictures(searchImage).then(appendImages).catch(errorImage);
}

function appendImages(images) {
  const files = images.hits;
  let totalHits = images.totalHits;
  console.log(totalHits);
  if (files.length >= 1) {
    files.map(file => {
      appendMarkupPhoto(file);
      if (searchImage.length === 0) {
        refs.gallery.innerHTML = '';
      }
    });
  } else {
    refs.gallery.innerHTML = '';
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  simplelightbox();

  infiniteScroll.loadNextPage();
}

function errorImage(error) {
  console.log(error);
}
