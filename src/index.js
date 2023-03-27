import Notiflix from 'notiflix';
import ImageSearchOnRequest from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { appendMarkupPhoto } from './appendMarkupPhoto';

import './css/styles.css';

export const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  window: document.querySelector('window'),
  btnLoadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

const imageSearchOnRequest = new ImageSearchOnRequest();

let totalHits;

async function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  imageSearchOnRequest.query = e.currentTarget.searchQuery.value;
  removeLoadMore();

  if (imageSearchOnRequest.query.length === 0) {
    refs.gallery.innerHTML = '';
  }
  imageSearchOnRequest.resetPage();
  displayedImagesCount = 0;

  try {
    const images = await imageSearchOnRequest.fetchPictures();
    await appendImages(images);
  } catch (error) {
    console.error(error);
  }
}

let displayedImagesCount = 0;

async function appendImages(images) {
  const files = images.hits;
  totalHits = images.totalHits;

  displayedImagesCount += files.length;
  const incrementP = await imageSearchOnRequest.incrementPage();

  if (imageSearchOnRequest.query.length > 0) {
    addBtnLoadMore();
  }
  if (files.length >= 1) {
    for (let file of files) {
      await appendMarkupPhoto(file);

      if (imageSearchOnRequest.query.length === 0) {
        return (refs.gallery.innerHTML = '');
      }
    }
  } else {
    removeLoadMore();
    refs.gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  if (displayedImagesCount >= totalHits && displayedImagesCount !== 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    removeLoadMore();
  }

  simpl();
}

async function addBtnLoadMore() {
  refs.btnLoadMore.classList.add('show');
}
async function removeLoadMore() {
  refs.btnLoadMore.classList.remove('show');
}
async function onLoadMore() {
  try {
    const images = await imageSearchOnRequest.fetchPictures();
    await appendImages(images);
  } catch (error) {
    console.error(error);
  }
}

function simpl() {
  let selector = document.querySelectorAll('.photo-card a');
  if (selector) {
    const lightbox = new SimpleLightbox(selector, {
      onSlideChange: () => {
        lightbox.refresh();
      },
    });
  } else {
    console.error('Invalid selector');
    return null;
  }
}
