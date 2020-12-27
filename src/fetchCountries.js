export default function fetchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}?fields=name;population;flag;languages;capital`)
      .then(response => {
        if (name) {
          return response.json();
        } else {
          return;
        }
      })
      .catch(error => console.log(error));
  }