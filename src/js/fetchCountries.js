const BASE_URL = 'https://restcountries.com/v2';

function fetchOneCountry(name) {
    const url = `${BASE_URL}/name/${name}`;
    return fetch(url).then(response => {
        return response.json();
    });
}

export default { fetchOneCountry };
