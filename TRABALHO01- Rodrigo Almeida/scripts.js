// Ao iniciar a pagina bate na api, pega os nomes dos paises e preenche o select
window.onload = function() {
    getAllCountries();
};

var countriesApiBseUrl = "https://restcountries.com/v2/";
let allCountries;

// Pega os paises
function getAllCountries(){
    let selectCountries = getElement("select-countries");
    fetch(`${countriesApiBseUrl}/all?fields=name`)
    .then((resp) => resp.json())
    .then(function(data) {
        allCountries = data;
        console.log(data);
        populateSelectCountries(data, selectCountries);
    })
    .catch((error) => {
        console.log("Error: " + error);
    });
}

// Ao clicar no select de paises busca os dados do pais
function selectCountries(){
    let selectCountries = getElement("select-countries");
    let countries = allCountries.find(element => {
        if(element.name == selectCountries.value) 
            return element;
    });
    console.log(countries);
    getCoutriesByName(countries.name);
}

// Popula o select com o nome do pais
function populateSelectCountries(countries, selectCountries){
    countries.forEach(value => {
        var option = document.createElement('option');
        option.value = value.name;
        option.innerHTML = value.name;
        selectCountries.appendChild(option);
    });
}

// Busca o pais pelo nome
function getCoutriesByName(countriesName){
    fetch(`${countriesApiBseUrl}/name/${countriesName}?fullText=true`)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data);
        populateDataCountries(data[0]);
    })
    .catch((error) => {
        console.log("Error: " + error);
    });
}

// Popula os dados do pais
function populateDataCountries(countries){
    let countriesflag = getElement("countries-flag");
    let countriesName = getElement("countries-name");
    let countriesCapital = getElement("countries-capital");
    let countriesContinent = getElement("countries-continent");
    let countriesPopulation = getElement("countries-population");
    let countriesArea = getElement("countries-area");
    // let countriesCurrenci = getElement("countries-currenci");
    // let countriesLanguages = getElement("countries-languages");

    countriesflag.setAttribute("src", countries.flag);
    countriesName.innerHTML = `Nome: ${countries.name} | Nome Nativo: ${countries.nativeName}`;
    countriesCapital.innerHTML = `Capital: ${countries.capital}`;
    countriesContinent.innerHTML = `Continente: ${countries.region}`;
    countriesPopulation.innerHTML = `População: ${countries.population}`;
    countriesArea.innerHTML = `Área: ${countries.area}`;
    //ficou faltando a moedas e as linguagens, não estava conseguindo fazer
}

function getElement(elementId){
    return document.getElementById(elementId);
}





// function getCurrenci(dadosMoeda) {
    
// }