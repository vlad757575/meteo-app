let body = document.querySelector('body');

let search = document.querySelector('search');

// let ville = document.querySelector();

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

let temperatureType;
let cityChoice;

let imperial = document.querySelector('#fahrenheit');
let metric = document.querySelector('#celcius');



// console.log(imperial);

//TYPE OF TEMPERATURE DATA CONDITION 




imperial.addEventListener("click", () => {

    temperatureType = 'metric';
    console.log(temperatureType + "ca fonctionne");

})




metric.addEventListener('click', () => {
    temperatureType = "metric";
    console.log(temperatureType + "ca fonctionne");
})


temperature.textContent = temperatureType;
temperature.style.color = "white";
console.log(temperatureType);


// GEOLOCALISATION

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {

        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';


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
                    let windData = reponse.wind.speed;
                    let humidityData = reponse.main.humidity;

                    console.log(temperatureData);

                    document.querySelector('#temperatureId').textContent = temperatureData + " C°";
                    document.querySelector('#cityId').textContent = cityData;
                }
                else {
                    alert("Something went wrong, please try later");
                }
            }
        }
    }, erreur, options)
}

var options = {
    enableHighAccuracy: true
}

function erreur() {
    cityChoice = "Londres";
    getWeather(cityChoice);
}



function getWeather(cityChoice) {
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

                document.querySelector('#temperatureId').textContent = temperatureData;
                document.querySelector('#locationId').textContent = cityData;
            }
            else {
                console.log(error);
            }
        }
    }
}

