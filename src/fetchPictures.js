export default class ImageSearchOnRequest {
  constructor() {
    this.page = 1;
    this.searchPictures;
  }

  async fetchPictures() {
    const url =
      'https://pixabay.com/api/?key=34706301-fa7c25ab6ec07e5fc9fe6ac6d';

    const response = await fetch(
      `${url}&q=${this.searchPictures}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    const pictures = await response.json();
    return pictures;
  }

  get query() {
    return this.searchPictures;
  }

  set query(newQuery) {
    this.searchPictures = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
