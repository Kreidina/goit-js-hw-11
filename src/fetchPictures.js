const url = 'https://pixabay.com/api/?key=34706301-fa7c25ab6ec07e5fc9fe6ac6d';

export function fetchPictures(search, page = 1) {
  return fetch(
    `${url}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  ).then(response => response.json());
}
