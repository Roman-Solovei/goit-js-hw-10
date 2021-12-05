import './css/styles.css';
import countryList from '../src/templatesManyCoutry.hbs';
import articlesOneCountry from '../src/templatesOneCountry.hbs';
// import '@pnotify/core/dist/BrightTheme.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');

let countryListMarkup = document.querySelector(".country-list");

let countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 1000;

const baseUrl = 'https://restcountries.com/v3.1/name/';

const countryInput = document.querySelector('input#search-box');
// console.log(countryInput);
countryInput.addEventListener('input', debounce(countrySearchInputHandler, DEBOUNCE_DELAY));


function countrySearchInputHandler(e) {
    e.preventDefault();
    const searchQuery = e.target.value;

    fetchCountries(searchQuery).then(data => {
        console.log(data)
    //   if (data.length > 10) {
    //       Notify.success("Too many matches found. Please enter a more specific name.");
    //       }
    //    else if (data.status === 404) {
    //     Notify.success("Oops, there is no country with that name");
    //   } else if (data.length === 1) {
    //       buildListMarkup(data, articlesOneCountry);
    //   } else if (data.length <= 10) {
    //       buildListMarkup(data, countryList);
    //   }
  })
  .catch(error => {      
      console.log(error)
  });
};



 function fetchCountries(name) {
    const requestParams = `${name}?fields=name,capital,population,flags,languages`;
    return fetch(baseUrl + requestParams).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        console.log(response)
        return response.json();
    }).then(country => {
            // console.log(country);

        const markup = articlesOneCountry(country);
        console.log(markup);
        const ulEl = document.createElement('markup');
        // countryInfo = markup;
      
    })
        .catch(error => { console.log(error) }
        );
};




// { { /each} }

// fetch("https://jsonplaceholder.typicode.com/users[2.name]").then(
//     (response) => {
//     //   if (!response.ok) {
//     //     throw new Error(response.status);
//     //   }
        
//       return response.json();
//     }
//   ).then(country => {
//     console.log(country);

//     // const markup = countryCadTpl(country)
//     //     console.log(markup);
// });


// ?fields=name.official,capital,population,flags.svg,languages