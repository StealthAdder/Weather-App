
window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let locationIcon = document.querySelector('.weather-icon');
    const temperatureSpan = document.querySelector('.temperature span');

    // Check to geo location
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;    
            console.log(long);
            console.log(lat);
            // https://api.openweathermap.org/data/2.5/onecall?lat=13.0370466&lon=77.56348609999999&exclude=hourly,daily&appid=33d39445c197200fe76010bc18b04efb
            const API_KEY = '33d39445c197200fe76010bc18b04efb';
            // const API_KEY1 = 'd79833c05a478f4a18930dd92e8b6d12';
            // const proxy = 'https://cors-anywhere.herokuapp.com/';
            // const proxy = ' https://api.allorigins.win/raw?url=';
            // const api = `${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${API_KEY1}`;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;
            console.log(api);

                // fetch the info from API
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const { main, description, icon } = data.weather[0];
                        const { temp } = data.main;
                        console.log(temp);
                        temperatureDegree.textContent = temp;
                        // const descrp = description.toIpp;
                        temperatureDescription.textContent = description;
                        locationTimezone.textContent = data.name;
                            // Formulae
                            let celsius = (temp - 32) * (5 / 9);

                        locationIcon.innerHTML = `<img src=http://openweathermap.org/img/wn/${icon}@4x.png>`

                        // Change Temp to C to F
                        temperatureSection.addEventListener('click', changeTemp);

                        function changeTemp(event) {
                            if (temperatureSpan.textContent === "°F") {
                                temperatureSpan.textContent = "°C";
                                temperatureDegree.textContent = Math.floor(celsius);
                            } else {
                                temperatureSpan.textContent = "°F";
                                temperatureDegree.textContent = temp;
                            }
                        }
                    });
            
                }
        )
    }
});
