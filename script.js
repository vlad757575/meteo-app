let body = document.querySelector('body');

let search = document.querySelector('search');

// let ville = document.querySelector();
let input = document.getElementById('meteo-input');
let cityChoice;

let form = document.querySelector(".form");
const url = "";


// VARIABLES D'AFFICHAGE

let temperature = document.querySelector('#temperatureId');
let ressenti = document.querySelector('feelslike');
let nuages = document.querySelector('cloud');
let pression = document.querySelector('pressure');
let visibilite = document.querySelector('visibility');
let humidite = document.querySelector('humidity');
let vent = document.querySelector('wind');
let city = document.querySelector('#locationId');

let icone = document.getElementById('#logo-temps');
let img = document.createElement('img');

let temperatureType = "caca";


let imperial = document.querySelector('#fahrenheit');
let metric = document.querySelector('#celcius');



//TYPE OF TEMPERATURE DATA CONDITION 




imperial.addEventListener("click", () => {

    temperatureType = 'imperial';
    console.log(temperatureType + " ca fonctionne");

})

metric.addEventListener('click', () => {
    temperatureType = "metric";
    console.log(temperatureType + " ca fonctionne");
})

console.log(temperatureType);


temperature.textContent = temperatureType;
temperature.style.color = "white";
// console.log(temperatureType);


// GEOLOCALISATION

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {

        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

        // console.log(position);
        let requete = new XMLHttpRequest();
        requete.open('GET', url);
        requete.responseType = 'json';
        requete.send();

        requete.onload = function () {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if (requete.status === 200) {
                    let reponse = requete.response;

                    let temperatureData = reponse.main.temp;
                    let cityData = reponse.name;
                    let countryData = reponse.sys.country;
                    let sensationData = reponse.main.feels_like;
                    let pressureData = reponse.main.pressure;
                    let windData = reponse.wind.speed * 2;
                    let humidityData = reponse.main.humidity;
                    let visibilityData = reponse.visibility;

                    document.querySelector('#temperatureId').textContent = Math.round(temperatureData) + " C°";
                    document.querySelector('#sensationId').textContent = "Sensation : " + Math.round(sensationData) + " C°";
                    document.querySelector('#locationId').textContent = cityData;
                    document.querySelector('#humidity').innerHTML = "<i class=\"fa-sharp fa-solid fa-droplet-percent\"></i> " + "Taux d'humidité : " + humidityData + " %";
                    document.querySelector('#pression').textContent = "Pression : " + pressureData + " mbars";
                    document.querySelector('#visibiliteId').innerHTML = "<i class=\"fa - sharp fa - solid fa - cloud - fog\"></i>" + "Visibilité : " + (visibilityData / 1000) + " km";
                    document.querySelector('#windId').innerHTML = "<i class=\"fa-solid fa-wind\" style=\"color:black;\"></i> " + "Vent : " + (windData * 3.6) + " km/h";
                    console.log(reponse);
                }
                else {
                    alert("Something went wrong, please try later");
                    cityChoice = "Paris";
                    getWeather(cityChoice);
                }
            }
        }
    }, erreur, options)
}

var options = {
    enableHighAccuracy: true
}

function erreur() {
    cityChoice = "Paris";
    getWeather(cityChoice);
}

let changeCity = form.addEventListener('submit', (e) => {
    e.preventDefault();




    cityChoice = input.value;
    getWeather(cityChoice);
    input.value = "";


})


// let changerDeVille = document.querySelector('#meteo-input');
// changerDeVille.addEventListener('submit', () => {
//     cityChoice = input.value;
//     getWeather(cityChoice);
//     input.value = "";
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
// })



function getWeather(cityChoice) {
    // cityChoice = input.getValue();
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityChoice + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
    requete.open('GET', url); // Nous récupérons juste des données
    requete.responseType = 'json'; // Nous attendons du JSON
    requete.send(); // Nous envoyons notre requête

    // Dès qu'on reçoit une réponse, cette fonction est executée
    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;


                let temperatureData = reponse.main.temp;
                let cityData = reponse.name;
                let countryData = reponse.sys.country;
                let sensationData = reponse.main.feels_like;
                let pressureData = reponse.main.pressure;
                let windData = reponse.wind.speed;
                let humidityData = reponse.main.humidity;

                document.querySelector('#temperatureId').textContent = Math.round(temperatureData);
                document.querySelector('#temperatureId').textContent = Math.round(temperatureData) + " C°";
                document.querySelector('#sensationId').textContent = "Sensation : " + Math.round(sensationData) + " C°";

                document.querySelector('#locationId').textContent = cityData;
                document.querySelector('#humidity').innerHTML = "<i class=\"fa-sharp fa-solid fa-droplet-percent\"></i> " + "Taux d'humidité : " + humidityData + " %";
                document.querySelector('#pression').textContent = "Pression : " + pressureData + " mbars";

                document.querySelector('#visibiliteId').innerHTML = "<i class=\"fa - sharp fa - solid fa - cloud - fog\"></i>" + "Visibilité : " + (visibilityData / 1000) + " km";


                document.querySelector('#windId').innerHTML = "<i class=\"fa-solid fa-wind\" style=\"color:black;\"></i> " + "Vent : " + (windData * 3.6) + " km/h";

            }
            else {
                console.log(error);
            }
        }
    }
}



