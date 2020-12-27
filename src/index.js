import './styles.css';
import fetchCountries from './fetchCountries.js';
import countryListItemsTemplate from './tamplate/countryListItem.hbs';
import countriesListTemplate from './tamplate/countrieList.hbs';
import PNotify from '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import'@pnotify/core/dist/BrightTheme.css';
import '../node_modules/lodash';


import {
  error,
  success,
  info,
  defaults,
  defaultModules,
  Stack,
} from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

const myStack = new Stack({
  dir1: 'up',
  dir2: 'left',
  firstpos1: 100,
  firstpos2: 50,
  maxStrategy: 'close',
  //   positioned: false,
});
defaults.mode = 'light';
defaults.delay = 2000;
defaults.stack = myStack;
defaultModules.set(PNotifyMobile, {});

export { error, success, info };

const refs = {
  searchForm: document.querySelector('#search-form'),
  countryList: document.querySelector('#country-list'),
  searchInput: document.querySelector('.search__input'),
};

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

refs.searchForm.addEventListener(
  'input',
  _.debounce(e => {
    searchFormInputHandler(e);
  }, 500),
);

function searchFormInputHandler(e) {
  const searchQuery = e.target.value;

  clearListItems();

  fetchCountries(searchQuery).then(data => {
    const markup = buildListItemMarkup(data);
    const renderCountriesList = buildCountriesList(data);
    if (!data) {
      return;
    } else if (data.length > 10) {
      // PNotify.default.styling = 'material';
      // console.log(PNotify.defaults.styling)
      success({
        title: 'Success!',
        text: 'Look at the countries on your request',
      });
    } else if (data.length >= 2 && data.length <= 10) {
      insertListItem(renderCountriesList);
    } else if (data.length === 1) {
      insertListItem(markup);
    } else {
      error({
        title: 'Sorry',
        text: 'Country does not exist!',
      });
    }
  });
}

function insertListItem(items) {
  refs.countryList.insertAdjacentHTML('beforeend', items);
}

function buildCountriesList(items) {
  return countriesListTemplate(items);
}

function buildListItemMarkup(items) {
  return countryListItemsTemplate(items);
}

function clearListItems() {
  refs.countryList.innerHTML = '';
}