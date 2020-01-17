const axios = require("axios");

axios
  .get(
    "http://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca&units=metric&APPID=92069bf957d02bc300f09ef3edd27e75"
  )
  .then(response => {
    const data = response.data;
    const temperature = data.main.temp;
    const pressure = data.main.pressure;
    const condition = data.weather[0].description;
    console.log(
      `There are ${temperature} in Cluj-Napoca, the pressure is ${pressure} and there is ${condition}.`
    );
  });
