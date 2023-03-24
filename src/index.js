import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const refs = {
    input:document.querySelector('input'),
    btn:document.querySelector('button'),
}

// let inputValue ;

refs.input.addEventListener('input', onInput);
refs.btn.addEventListener('submit', onSubmit);


function onInput(){
    inputValue =  refs.input.value.trim();
}

function fetchCountries(){
    return fetch('https://pixabay.com/api/?key=34706301-fa7c25ab6ec07e5fc9fe6ac6d&q=cat&image_type=photo&orientation=horizontal&safesearch=true')
    .then(res=> res.json)
}
function onSubmit(e){
    e.preventDefault();

}
fetchCountries(inputValue).then(photo=>console.log(photo));


