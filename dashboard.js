const weatherByDay = {
  sun: {
    city: "Assiut",
    temp: "24°C",
    condition: "Partly Cloudy",
    icon: "../img/clouds.png",
    wind: "8 km/h",
    uv: 5.5,
    sunrise: "6:12 AM",
    sunset: "5:48 PM",
    hours: [
      ["Now", "../img/clouds.png", "24°"],
      ["9 AM", "../img/sunny.png", "25°"],
      ["11 AM", "../img/sunny.png", "28°"],
      ["1 PM", "../img/sun.png", "31°"],
      ["3 PM", "../img/clouds.png", "30°"],
      ["5 PM", "../img/foggy.png", "27°"],
      ["7 PM", "../img/night.png", "23°"],
    ],
    temperature: [55, 72, 88, 76],
    humidity: [48, 54, 43, 57],
    rain: [12, 18, 10, 8],
  },
  mon: {
    city: "Assiut",
    temp: "22°C",
    condition: "Windy",
    icon: "../img/weather-app.png",
    wind: "14 km/h",
    uv: 4.3,
    sunrise: "6:11 AM",
    sunset: "5:49 PM",
    hours: [
      ["Now", "../img/weather-app.png", "22°"],
      ["9 AM", "../img/clouds.png", "23°"],
      ["11 AM", "../img/sunny.png", "25°"],
      ["1 PM", "../img/sun.png", "27°"],
      ["3 PM", "../img/foggy.png", "26°"],
      ["5 PM", "../img/clouds.png", "24°"],
      ["7 PM", "../img/night.png", "21°"],
    ],
    temperature: [50, 60, 78, 68],
    humidity: [40, 44, 41, 49],
    rain: [8, 10, 6, 5],
  },
  tue: {
    city: "Assiut",
    temp: "19°C",
    condition: "Rain Showers",
    icon: "../img/heavy-rain.png",
    wind: "11 km/h",
    uv: 2.6,
    sunrise: "6:10 AM",
    sunset: "5:49 PM",
    hours: [
      ["Now", "../img/heavy-rain.png", "19°"],
      ["9 AM", "../img/heavy-rain.png", "20°"],
      ["11 AM", "../img/clouds.png", "21°"],
      ["1 PM", "../img/sunny.png", "22°"],
      ["3 PM", "../img/heavy-rain.png", "21°"],
      ["5 PM", "../img/heavy-rain.png", "20°"],
      ["7 PM", "../img/clouds.png", "18°"],
    ],
    temperature: [38, 46, 54, 48],
    humidity: [72, 80, 76, 83],
    rain: [62, 78, 68, 84],
  },
  wed: {
    city: "Assiut",
    temp: "21°C",
    condition: "Cloudy",
    icon: "../img/clouds.png",
    wind: "7 km/h",
    uv: 3.4,
    sunrise: "6:09 AM",
    sunset: "5:50 PM",
    hours: [
      ["Now", "../img/clouds.png", "21°"],
      ["9 AM", "../img/clouds.png", "22°"],
      ["11 AM", "../img/clouds.png", "23°"],
      ["1 PM", "../img/foggy.png", "24°"],
      ["3 PM", "../img/foggy.png", "23°"],
      ["5 PM", "../img/clouds.png", "22°"],
      ["7 PM", "../img/night.png", "20°"],
    ],
    temperature: [44, 55, 61, 57],
    humidity: [60, 63, 59, 66],
    rain: [20, 26, 18, 24],
  },
  thu: {
    city: "Assiut",
    temp: "26°C",
    condition: "Sunny",
    icon: "../img/sunny.png",
    wind: "6 km/h",
    uv: 6.8,
    sunrise: "6:08 AM",
    sunset: "5:51 PM",
    hours: [
      ["Now", "../img/sunny.png", "26°"],
      ["9 AM", "../img/sunny.png", "27°"],
      ["11 AM", "../img/sun.png", "30°"],
      ["1 PM", "../img/sun.png", "33°"],
      ["3 PM", "../img/sunny.png", "32°"],
      ["5 PM", "../img/clouds.png", "29°"],
      ["7 PM", "../img/night.png", "24°"],
    ],
    temperature: [62, 80, 92, 84],
    humidity: [30, 35, 28, 32],
    rain: [4, 6, 3, 2],
  },
  fri: {
    city: "Assiut",
    temp: "20°C",
    condition: "Storm Risk",
    icon: "../img/thunderstorm.png",
    wind: "18 km/h",
    uv: 3.1,
    sunrise: "6:08 AM",
    sunset: "5:52 PM",
    hours: [
      ["Now", "../img/thunderstorm.png", "20°"],
      ["9 AM", "../img/thunderstorm.png", "21°"],
      ["11 AM", "../img/heavy-rain.png", "22°"],
      ["1 PM", "../img/heavy-rain.png", "23°"],
      ["3 PM", "../img/thunderstorm.png", "22°"],
      ["5 PM", "../img/heavy-rain.png", "20°"],
      ["7 PM", "../img/clouds.png", "18°"],
    ],
    temperature: [42, 50, 56, 49],
    humidity: [74, 78, 82, 76],
    rain: [70, 88, 80, 92],
  },
  sat: {
    city: "Assiut",
    temp: "23°C",
    condition: "Calm Evening",
    icon: "../img/night.png",
    wind: "5 km/h",
    uv: 4.8,
    sunrise: "6:07 AM",
    sunset: "5:52 PM",
    hours: [
      ["Now", "../img/night.png", "23°"],
      ["9 AM", "../img/sunny.png", "24°"],
      ["11 AM", "../img/sun.png", "27°"],
      ["1 PM", "../img/weather-app.png", "29°"],
      ["3 PM", "../img/clouds.png", "28°"],
      ["5 PM", "../img/foggy.png", "25°"],
      ["7 PM", "../img/night.png", "22°"],
    ],
    temperature: [52, 66, 79, 70],
    humidity: [46, 50, 48, 55],
    rain: [10, 14, 8, 12],
  },
};
//Api
const CURRENT_WEATHER_API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=27.18096&longitude=31.18368&current_weather=true";

const dayButtons = document.querySelectorAll(".day-chip");
const cityName = document.getElementById("cityName");
const mainTemp = document.getElementById("mainTemp");
const mainCondition = document.getElementById("mainCondition");
const hoursContainer = document.getElementById("hoursContainer");
const temperatureChart = document.getElementById("temperatureChart");
const humidityChart = document.getElementById("humidityChart");
const rainChart = document.getElementById("rainChart");
const windValue = document.getElementById("windValue");
const uvValue = document.getElementById("uvValue");
const uvGaugeFill = document.getElementById("uvGaugeFill");
const sunriseValue = document.getElementById("sunriseValue");
const sunsetValue = document.getElementById("sunsetValue");

function getWeatherVisual(weatherCode, isDay) {
  if (weatherCode === 0) {
    return {
      condition: isDay ? "Clear Sky" : "Clear Night",
      icon: isDay ? "../img/sunny.png" : "../img/night.png",
    };
  }

  if ([1, 2, 3].includes(weatherCode)) {
    return {
      condition: "Partly Cloudy",
      icon: isDay ? "../img/clouds.png" : "../img/night.png",
    };
  }

  if ([45, 48].includes(weatherCode)) {
    return {
      condition: "Foggy",
      icon: "../img/foggy.png",
    };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return {
      condition: "Rain Showers",
      icon: "../img/heavy-rain.png",
    };
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return {
      condition: "Thunderstorm",
      icon: "../img/thunderstorm.png",
    };
  }

  return {
    condition: isDay ? "Weather Update" : "Night Weather",
    icon: isDay ? "../img/weather-app.png" : "../img/night.png",
  };
}

function createHourCard(hour, index) {
  const card = document.createElement("div");
  card.className = index === 0 ? "hour active" : "hour";
  card.innerHTML = `${hour[0]}<img class="hour-icon" src="${hour[1]}" alt="weather icon"><strong>${hour[2]}</strong>`;
  return card;
}

function createBar(height, className) {
  const bar = document.createElement("div");
  bar.className = `bar ${className}`;
  bar.style.height = `${height}%`;
  return bar;
}

function renderChart(container, values, className) {
  container.innerHTML = "";
  values.forEach((value) => {
    container.appendChild(createBar(value, className));
  });
}

function renderHours(hours) {
  hoursContainer.innerHTML = "";
  hours.forEach((hour, index) => {
    hoursContainer.appendChild(createHourCard(hour, index));
  });
}

function setActiveDay(dayKey) {
  dayButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.day === dayKey);
  });
}

function renderDay(dayKey) {
  const weather = weatherByDay[dayKey];
  if (!weather) {
    return;
  }

  cityName.textContent = weather.city;
  mainTemp.textContent = weather.temp;
  mainCondition.innerHTML = `
    <img class="weather-icon" src="${weather.icon}" alt="${weather.condition}">
    ${weather.condition}
  `;
  windValue.textContent = weather.wind;
  uvValue.textContent = weather.uv.toFixed(1);
  uvGaugeFill.style.width = `${Math.min((weather.uv / 10) * 100, 100)}%`;
  sunriseValue.textContent = weather.sunrise;
  sunsetValue.textContent = weather.sunset;

  renderHours(weather.hours);
  renderChart(temperatureChart, weather.temperature, "temp");
  renderChart(humidityChart, weather.humidity, "humidity");
  renderChart(rainChart, weather.rain, "rain");
  setActiveDay(dayKey);
}

async function loadCurrentWeather() {
  try {
    const response = await fetch(CURRENT_WEATHER_API_URL);
    if (!response.ok) {
      throw new Error("Current weather request failed.");
    }

    const data = await response.json();
    const currentWeather = data.current_weather;
    if (!currentWeather) {
      return;
    }

    const visual = getWeatherVisual(
      currentWeather.weathercode,
      currentWeather.is_day === 1
    );

    const activeDay = document.querySelector(".day-chip.active");
    const activeKey = activeDay ? activeDay.dataset.day : "sun";
    const activeWeather = weatherByDay[activeKey];

    mainTemp.textContent = `${Math.round(currentWeather.temperature)}°C`;
    mainCondition.innerHTML = `
      <img class="weather-icon" src="${visual.icon}" alt="${visual.condition}">
      ${visual.condition}
    `;
    windValue.textContent = `${currentWeather.windspeed} km/h`;

    if (activeWeather && activeWeather.hours.length > 0) {
      activeWeather.temp = `${Math.round(currentWeather.temperature)}°C`;
      activeWeather.condition = visual.condition;
      activeWeather.icon = visual.icon;
      activeWeather.wind = `${currentWeather.windspeed} km/h`;
      activeWeather.hours[0] = [
        "Now",
        visual.icon,
        `${Math.round(currentWeather.temperature)}°`,
      ];

      renderHours(activeWeather.hours);
    }
  } catch (error) {
    console.error("Failed to load current weather:", error);
  }
}

dayButtons.forEach((button) => {
  button.addEventListener("click", function () {
    renderDay(button.dataset.day);
  });
});

renderDay("sun");
loadCurrentWeather();
