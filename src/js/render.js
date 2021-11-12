import countryCard from '../catalog/state.hbs';
import countryList from '../catalog/statelist.hbs';
import debounce from 'lodash.debounce';

import { error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

import getRefs from './getRefs.js';
import API from '../js/fetchCountries.js';

const refs = getRefs();

refs.searchField.addEventListener('input', debounce(onSearch, 2500));

function onSearch(event) {
  console.log(event.target.value);
  const searchKey = event.target.value;
  API.fetchOneCountry(searchKey).then(render);
  };

function renderCountryCard(country) {
  const markup = countryCard(country);
  console.log(markup);
  
  refs.cardContainer.innerHTML = markup;
}

function renderCountryList(value) {
  const markupList = countryList(value);
  console.log(markupList);
  refs.cardContainer.innerHTML = markupList;
}

function render(value) {
  console.log(value.length);
  if (value.length === 1) {
    renderCountryCard(value);
  } else if (value.length > 1 && value.length < 11) {
    renderCountryList(value);
  } else if (!value.length) {
    refs.cardContainer.innerHTML = '';
    onError(`Будь ласка спробуйте ще раз.`)
  } else {
    onError(`Будь ласка, введіть більш конкретний запит.`)
  }
}

export function onError(message) {
  return error({
    text: message,
    delay: 2000,
    closer: false,
    title: '',
    icon: false,
    width: '250px',
    sticker: false,
     })
}