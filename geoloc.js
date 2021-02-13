
function geoLoc () {
        
        let temperatureDescription = document.querySelector(".temperature-description");
        let temperatureDegree = document.querySelector(".temperature-degree");
        let locationTimezone = document.querySelector(".location-timezone");
        let temperatureSection = document.querySelector(".degree-section");
        let locationIcon = document.querySelector('.weather-icon');
        let temperatureSpan = document.querySelector('.tempR');

        // Sunrise and sunset
        const sunr = document.querySelector(".sunrise");
        const suns = document.querySelector(".sunset");


        // console.log("Clicked geoloc icon");
        const geolocIcon = document.querySelector('.l-btn');
        const geoIcon = document.querySelector('.fa-map-marked-alt');
        

        geolocIcon.addEventListener('click', getGeo);
        
        function getGeo(event) {
            event.preventDefault();
            // console.log("geoLoc Fired");
            // red
            geoIcon.classList.add("fa-map-marked-alt-geoloc-red");
            
            // aviod event multi firing.
            geolocIcon.removeEventListener('click', getGeo);

            // remove red color
            setTimeout(()=>{
                geoIcon.classList.remove("fa-map-marked-alt-geoloc-red");
            }, 800);

            // GEO LOCATION
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    // lan lat
                    lon = position.coords.longitude;
                    lat = position.coords.latitude;
                    
                    // use different one.
                    const API_KEY = 'd79833c05a478f4a18930dd92e8b6d12';

                    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
                    // console.log(api);

                    fetch(api)
                    .then(response => {
                        return response.json();
                    })
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
                            const { country } = data.sys;

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
                            locationTimezone.textContent = `${data.name}, ${country}`;
                            let celsius = (temp - 32) * (5 / 9);
                            // switch
                            function switchResult(icon) {
                                switch(icon) {
                                    case "01n":
                                        return "CLEAR_NIGHT";
                                    case "01d":
                                        return "CLEAR_DAY";
                
                                    case "02n":
                                        return "PARTLY_CLOUDY_NIGHT";
                                    case "02d":
                                        // clouds
                                        return "PARTLY_CLOUDY_DAY";
                
                                    case "03n":
                                        return "PARTLY_CLOUDY_NIGHT";
                                    case "03d":
                                        // scattered clouds
                                        return "PARTLY_CLOUDY_DAY";
                                    
                                    case "04n":
                                        return "PARTLY_CLOUDY_NIGHT";
                                    case "04d":
                                        // broken clouds
                                        return "PARTLY_CLOUDY_DAY";
                
                                    case "09n":
                                    case "09d":
                                        // shower rain
                                        return "SLEET";
                                    
                                    case "10n":
                                    case "10d":
                                        // rain
                                        return "RAIN";
                
                                    case "11n":
                                    case "11d":
                                        // thunderstorm
                                        return "RAIN";
                
                                    case "13n":
                                    case "13d":
                                        // snow
                                        return "SNOW";
                
                                    case "50n":
                                    case "50d":
                                        // mist
                                        return "FOG";
                
                                    default :
                                        return ":warning: Error";
                                }
                            }
                            let cli = switchResult(icon);

                            console.log(cli);
                            const currentIconID = cli.replace(/_/g, "-").toLowerCase();
                            console.log(currentIconID);
                            
                            // locationIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
                            var skycons = new Skycons({"color": "white"});
                            skycons.add(document.getElementById('icon1'), Skycons[cli]);
                            skycons.play();

                            const APIKEY = 'b8c4531288d44830bb89c52d47db5542';
                            // new api
                            time_api = `https://api.ipgeolocation.io/astronomy?apiKey=${APIKEY}&lat=${lat}&long=${lon}`;


                            fetch(time_api)
                                .then(Response => {
                                    // console.log(Response);
                                    return Response.json();
                                })
                                .then(time_data => {
                                    // console.log(time_data);
                                    let sunrise = time_data.sunrise;
                                    const sunset = time_data.sunset;
                                    const time = time_data.current_time;
                                    const date = time_data.date;

                                    // Sunrise, sunset, and humidity
                                    let sunriseTime = document.querySelector('.sunrise-time');

                                    let sunsetTime = document.querySelector('.sunset-time');

                                    let humidPerct = document.querySelector('.humid-perct');

                                    let currentTime = document.querySelector('.current-time');

                                    let windSpeed = document.querySelector('.wind-speed');

                                    //// CURRENT TIME ////
                                    let ctime = time.split(".");
                                    let Time = ctime[0];
                                    // console.log(Time);

                                    // DD MM YYYY FORMATING
                                    let ccdate = date.split("-");

                                    let y = ccdate[0];
                                    let m = ccdate[1];
                                    let d = ccdate[2];

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

                                    prepDetails();
                                
                                    // add sunrise time
                                    sunriseTime.innerHTML = sunrise;
                                    // add sunset time
                                    sunsetTime.innerHTML = sunset;
                                    // add humidity value
                                    humidPerct.innerHTML = `${humidity}%`;
                                    currentTime.innerHTML = `${Time} ${d}-${m}-${y}`;
                                    windSpeed.innerHTML = `${wspeed} Km/h`;
                                })
                        }
                    })
                })
            }
        }
        
}