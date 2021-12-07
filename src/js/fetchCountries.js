
export function fetchCountries(name) {
        const count = name.trim();   
        const request = `https://restcountries.com/v3.1/name/${count}?fields=name,capital,population,flags,languages`;
        return fetch(request).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }          
            return response.json();
        });    
        };

// export {
//     fetchCountries,
// }