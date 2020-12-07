window.addEventListener('load', () => { 
    const searchCity = document.querySelector(".c-search");
    const searchIcon = document.querySelector('.s-btn');
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSpan = document.querySelector('.temperature span');
    const infoMsg = document.querySelector(".infoMsg");

    // Event listener
    searchIcon.addEventListener('click', getCity);

    // Function
    function getCity (event) {
        event.preventDefault();
        const city = searchCity.value;
        // use different one.
        const API_KEY = 'd79833c05a478f4a18930dd92e8b6d12';

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
        console.log(api);

        fetch(api)
        // get response and convert it to json
            .then(response => {
                return response.json();
            })
            // then data
            .then(data => {
                console.log(data);
                if (data.cod == "404") {
                    // function reset () {
                    //     let error = data.message;
                    //     let ERROR = error.toUpperCase()
                    //     infoMsg.innerHTML = `"${searchCity.value.toUpperCase(searchCity.value)}" ${ERROR}`;
                    //     searchCity.value = "";
                    // }

                } else {
                    const { main, description, icon } = data.weather[0];
                    const { temp } = data.main;
                    const { speed, deg} = data.wind;
                    const { sunrise, sunset } = data.sys;
                    let sr = new Date(sunrise*1000);
                    console.log(sr);
                    let ss = new Date(sunset*1000);
                    console.log(ss);

                    // var ssr = new Date(sr);
                    // var srr = new Date(ss);
                    // var options = {
                    // hour: 'numeric',
                    // minute: 'numeric',
                    // hour12: true
                    // };
                    // var timeString = ssr.toLocaleString('en-US', options);
                    // console.log(timeString);
                    // var timeString1 = srr.toLocaleString('en-US', options);
                    // console.log(timeString1);
                    
                    if (temperatureSpan.textContent != "°F") {
                        let temperatureSpan = document.querySelector(".temperature span");
                        temperatureSpan.textContent = "°F";
                        // temperatureSpan.innerHTML = "°F";
                    }

                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    let celsius = (temp - 32) * (5 / 9);
                    locationIcon.innerHTML = `<img src=http://openweathermap.org/img/wn/${icon}@4x.png>`;
                    
                    // Change F to C
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
                }
                searchCity.value = "";
            })
    }


    

    
});