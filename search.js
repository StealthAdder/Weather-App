window.addEventListener('load', () => { 
    const searchCity = document.querySelector(".c-search");
    const searchIcon = document.querySelector('.s-btn');
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSpan = document.querySelector('.tempR');

    // Sunrise and sunset
    const sunr = document.querySelector(".sunrise");
    const suns = document.querySelector(".sunset");

    // Event listener
    searchIcon.addEventListener('click', getCity);
    // Function
    function getCity (event) {
        event.preventDefault();
        // removeEventListener the gps
        
        const city = searchCity.value;
        // use different one.
        const API_KEY = 'd79833c05a478f4a18930dd92e8b6d12';

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
        // console.log(api);

        fetch(api)
        // get response and convert it to json
            .then(response => {
                return response.json();
            })
            // then data
            .then(data => {
                // console.log(data);
                if (data.cod == "404") {
                    alert ("City Not Found!");
                    window.location.reload();

                } else {
                    const { main, description, icon } = data.weather[0];
                    const { temp, humidity } = data.main;
                    const { lon, lat } = data.coord;
                    const { speed, deg} = data.wind;

                    // Conversion of speed 
                    const wspeed = Math.round(parseFloat(speed*1.609));

                    if (temperatureSpan.textContent != "°F") {
                        let temperatureSpan = document.querySelector(".tempR");
                        temperatureSpan.textContent = "°F";
                    }

                    const degree = document.querySelector('.degree-section');
                    let tempsync = document.querySelector('.temp-btn');
                    tempsync.innerHTML = `<i class="fa fa-sync-alt fa-x"></i>`;
                    degree.appendChild(tempsync);
    
                    temperatureDegree.textContent = parseFloat(temp);
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;
                    let celsius = (temp - 32) * (5 / 9);
                    locationIcon.innerHTML = `<img src=http://openweathermap.org/img/wn/${icon}@4x.png>`;
                    
                    
                    // new api
                    time_api = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=stealthadder`;

                    fetch(time_api)
                        .then(Response => {
                            // console.log(Response);
                            return Response.json();
                        })
                        .then(time_data => {
                            // console.log(time_data);
                            let sunrise = time_data.sunrise;
                            const sunset = time_data.sunset;
                            const time = time_data.time;

                            // Sunrise, sunset, and humidity
                            let sunriseTime = document.querySelector('.sunrise-time');

                            let sunsetTime = document.querySelector('.sunset-time');

                            let humidPerct = document.querySelector('.humid-perct');

                            let currentTime = document.querySelector('.current-time');

                            let windSpeed = document.querySelector('.wind-speed');
                            
                            //// SUNRISE INSTANCE ////
                            let sunrStr = sunrise.split(" ");
                            // sunriseDate = date of sunrise
                            // sriseTime = sunrise time
                            let sunriseDate = sunrStr[0];
                            let sriseTime = sunrStr[1];


                            //// SUNSET INSTANCE  ////
                            let sunsStr = sunset.split(" ");
                            // sunsetDate = sunset date
                            // ssetTime = sunset time
                            let sunsetDate = sunsStr[0];
                            let ssetTime = sunsStr[1];

                            //// CURRENT TIME ////
                            let ctime = time.split(" ");

                            // Time = time
                            let Time = ctime[1];
                            let cdate = ctime[0];
                            let ccdate = cdate.split("-");

                            let y = ccdate[0];
                            let m = ccdate[1];
                            let d = ccdate[2];
                            
                            // create a function 
                            function prepDetails () {
                                // Def the titles
                                const sTitle = document.querySelector('.s-title');
                                const ssTitle = document.querySelector('.ss-title');
                                const hTitle = document.querySelector('.h-title');
                                const tpTitle = document.querySelector('.tp-title');
                                const cTitle = document.querySelector('.c-title');
                                const wTitle = document.querySelector('.w-title');

                                sTitle.innerHTML = "Sunrise";
                                ssTitle.innerHTML = "Sunset";
                                hTitle.innerHTML = "Humidity";
                                wTitle.innerHTML = "Wind Speed";
                                tpTitle.innerHTML = "Temperature";
                                cTitle.innerHTML = "Current Time";


                                // Def all the spans
                                let sun = document.querySelector('.sun')
                                let moon = document.querySelector('.moon');
                                let tint = document.querySelector('.tint');
                                let clock = document.querySelector('.time-clock');
                                let speez = document.querySelector('.speez');

                                sun.innerHTML = `<i class="fa fa-sun fa-2x"></i>`;
                                moon.innerHTML = `<i class="fa fa-moon fa-2x"></i>`;
                                tint.innerHTML = `<i class="fas fa-tint fa-2x"></i>`;
                                clock.innerHTML = `<i class="far fa-clock fa-2x"></i>`;
                                speez.innerHTML = `<i class="fas fa-location-arrow fa-2x"></i>`;
                            }


                            // Call the prepDetails
                            prepDetails();
                            
                            // add sunrise time
                            sunriseTime.innerHTML = sriseTime;
                            // add sunset time
                            sunsetTime.innerHTML = ssetTime;
                            // add humidity value
                            humidPerct.innerHTML = `${humidity}%`;
                            currentTime.innerHTML = `${Time} ${d}-${m}-${y}`;
                            windSpeed.innerHTML = `${wspeed} Km/h`;
                        })
                }
                searchCity.value = "";  
            })
    }
});