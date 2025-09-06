const button = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-input');
const cityName = document.querySelector('#city-name');
const cityTime = document.querySelector('#city-time');
const cityTemp = document.querySelector('#city-temp');
const weatherCard = document.querySelector('#weather-card');
let API_KEY=//your api Key;

async function getData(cityName) {
  try {
    const weatherData = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`
    );
    if (!weatherData.ok) throw new Error("Invalid city");
    return await weatherData.json();
  } catch (error) {
    return null;
  }
}

button.addEventListener('click', async () => {
  const value = cityInput.value.trim();
  if (!value) {
    alert("Enter a valid city name");
    return;
  }

  const result = await getData(value);

  if (!result || result.error) {
    alert("Give valid city name");
    weatherCard.style.display = "none";
    cityInput.value="";
    return;
  }

  cityName.innerText = `${result.location.name}, ${result.location.country}`;
  cityTime.innerText = `Local Time: ${result.location.localtime}`;
  cityTemp.innerText = `${result.current.temp_c}°C`;

  weatherCard.style.display = "block";
  cityInput.value="";
});
