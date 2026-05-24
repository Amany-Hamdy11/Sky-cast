const form = document.getElementById("predictForm");
const resultContent = document.getElementById("resultContent");
const cleanBtn = document.getElementById("cleanBtn");

function getPredictionApiUrl(city, day) {
  const query = `city=${encodeURIComponent(city)}&day=${day}`;
  // const isLocalFile = window.location.protocol === "file:";
  // const isLocalHost =
  //   window.location.hostname === "localhost" ||
  //   window.location.hostname === "127.0.0.1";

  // if (isLocalFile || isLocalHost) {
  //   return `http://127.0.0.1:5000/predict?${query}`;
  // }

  // return `/api/predict?${query}`;
  return `http://127.0.0.1:5000/predict?${query}`;
}
 

// function getPredictionApiUrl(city) {
//   const query = `city=${encodeURIComponent(city)}`;
//   const isLocalFile = window.location.protocol === "file:";
//   const isLocalHost =
//     window.location.hostname === "localhost" ||
//     window.location.hostname === "127.0.0.1";

//   if (isLocalFile || isLocalHost) {
//     return `http://127.0.0.1:5500/api_server?${query}`;
//   }

//   return `/api/api_server?${query}`;
// }

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = document.getElementById("city").value.trim();
  const day = document.getElementById("day").value;

  resultContent.innerHTML = '<div class="loading">Loading prediction...</div>';

  try {
    const response = await fetch(getPredictionApiUrl(city,day));
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    const isRain = data.rain_prediction === 1;
    const rainText = isRain ? "Rain" : "No Rain";
    const rainClass = isRain ? "rain-text" : "no-rain-text";
    const rainIcon = isRain? "🌧️"
      : `
        <span class="weather-group">
          <span class="sun">☀️</span>
          <span class="cloud">☁️</span>
        </span>
      `;

    resultContent.innerHTML = `
      <div class="result-content">
        <div class="result-card">
          <div class="result-label">Rain Prediction</div>
          <div class="result-value ${rainClass}">
            ${rainIcon}
            <span>${rainText}</span>
          </div>
        </div>

        <div class="result-card">
          <div class="result-label">Temperature Prediction</div>
          <div class="result-value temp-text">
            <span class="temp-icon">🌡️</span>
            <span>${data.temperature_prediction}°C</span>
          </div>
        </div>
      </div>

      <div class="meta-line">
        City: ${data.city} | Date: ${data.date}
      </div>
    `;
  } catch (error) {
    const message =
      error && error.message === "Failed to fetch"
        ? "Could not reach the weather API. If you are testing locally, start the local API server. If this is deployed, check that the Vercel API route was deployed successfully."
        : error.message;

    resultContent.innerHTML = `<div class="error">${message}</div>`;
  }
});

cleanBtn.addEventListener("click", function () {
  resultContent.innerHTML = '<div class="loading">Enter city and day, then click Predict.</div>';
});
