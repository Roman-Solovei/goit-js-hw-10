import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryList from '../src/css/templates/templatesCountryList.hbs';
import oneCountry from '../src/css/templates/templatesOneCountry.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');

const refs = {
    countryListMarkup: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
    DEBOUNCE_DELAY: 300,
    countryInput: document.querySelector('input#search-box'),
};

refs.countryInput.addEventListener('input', debounce(countrySearch, refs.DEBOUNCE_DELAY));

function countrySearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value;
    clearCountryInfo();
    
    if (searchQuery !== '') {
    fetchCountries(searchQuery)
    .then(data => {    
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
      Notify.failure("Oops, there is no country with that name");
    });
    };    
};

function buildCountryQuery(countries, template) {
    const markup = template(countries);    
    refs.countryListMarkup.insertAdjacentHTML('afterbegin', markup);
};

function clearCountryInfo() {
    refs.countryInfo.innerHTML = '';
    refs.countryListMarkup.innerHTML = '';
};
