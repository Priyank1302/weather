window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let humid = document.getElementById('humidity');
    let feel = document.getElementById('feels');
    const temperatureSpan = document.querySelector('.temperature span');
    const im = document.querySelector('.im');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(long, lat, position);



            const key = 'f5c5aaadaa51497f9d4195709203107';

            const api = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}`;
            fetch(api).then(response => {
                return response.json();
            }).then(data => {


                let str = `<img src="${data['current'].condition.icon}">`;
                im.innerHTML = str;
                console.log(data);

                temperatureDegree.textContent = data['current'].temp_f; //tempdegree variable h jisme temp-degree class ka phla element h usme humne ye condition daali h

                temperatureDescription.textContent = `${data['current'].condition.text}`; //is variable me temp-des class ka 1st element h usme mene daal dia h condition
                locationTimezone.textContent = `${data['location'].region} / ${data['location'].country}`;
                humid.textContent = `Humidity in Air is ${data['current'].humidity}`

                temperatureSection.addEventListener('click', () => {

                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = data['current'].temp_c;
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = data['current'].temp_f;

                    }

                });



            })
        });


    }



});