  const apikey = "c1e3243ea2ae0355a9a74e9e6626cb36";
            const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
            const searchbox = document.querySelector(".search input");
            const searchbtn = document.querySelector(".search button");
            const weatherIcon = document.querySelector(".weather-icon");
            const weatherStatement = document.querySelector(".weather-statement");

            async function checkweather(city) {
                const response = await fetch(apiurl + city + `&appid=${apikey}`);
                if (response.status == 404) {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                    return;
                } else {
                    document.querySelector(".error").style.display = "none";
                }

                var data = await response.json();


                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temperature").innerHTML = data.main.temp + " °C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


                if (data.weather[0].main === "Clouds") {
                    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; 
                    weatherStatement.textContent = "It's cloudy today.";
                } else if (data.weather[0].main === "Clear") {
                    weatherIcon.src = "sun.png.webp";
                    weatherStatement.textContent = "It's clear and sunny!";
                } else if (data.weather[0].main === "Rain") {
                    weatherIcon.src = "rain.png";
                    weatherStatement.textContent = "It's raining. Don't forget your umbrella!";
                } else if (data.weather[0].main === "Drizzle") {
                    weatherIcon.src = "drizzle.png.webp";
                    weatherStatement.textContent = "Light drizzle outside.";
                } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Haze") {
                    weatherIcon.src = "mist.png.webp";
                    weatherStatement.textContent = "It's misty or hazy.";
                } else {
                    weatherStatement.textContent = "";
                }
                document.querySelector(".weather").style.display = "block";


            }

            searchbtn.addEventListener("click", () => {
                checkweather(searchbox.value);
            });

            
            searchbox.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    checkweather(searchbox.value);
                }
            });