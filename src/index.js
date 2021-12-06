import './css/styles.css';
import countryList from '../src/css/templates/templatesCountryList.hbs';
import oneCountry from '../src/css/templates/templatesOneCountry.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');

const refs = {
    countryListMarkup: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
    DEBOUNCE_DELAY: 300,
    countryInput: document.querySelector('input#search-box'),
}

// const countryListMarkup = document.querySelector(".country-list");
// const countryInfo = document.querySelector(".country-info");
// const DEBOUNCE_DELAY = 1000;
// const countryInput = document.querySelector('input#search-box');


refs.countryInput.addEventListener('input', debounce(countrySearch, refs.DEBOUNCE_DELAY));


function countrySearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    clearCountryInfo();

    fetchCountries(searchQuery)
        .then(data => {
        console.dir(data)
      if (data.length > 10) {
          Notify.success("Too many matches found. Please enter a more specific name.");
          }  
      else if (data.length === 1) {
          buildCountryQuery(data, oneCountry);
      } else if (data.length < 10) {
          buildCountryQuery(data, countryList);       
      }
  })
  .catch(error => {      
    //   console.log(error)
      Notify.failure("Oops, there is no country with that name");
  });
};

function fetchCountries(name) {
    const count = name.trim();   
    const request = `https://restcountries.com/v3.1/name/${count}?fields=name,capital,population,flags,languages`;
     return fetch(request).then((response) => {
         if (!response.ok) {
             throw new Error(response.status);
         }
         console.log(response)
         return response.json();
     });    
};


function buildCountryQuery(countries, template) {
    const markup = template(countries);    
    refs.countryListMarkup.insertAdjacentHTML('afterbegin', markup);
};

function clearCountryInfo() {
    refs.countryInfo.innerHTML = '';
    refs.countryListMarkup.innerHTML = '';
};
