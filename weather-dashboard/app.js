const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const currentIcon = document.getElementById("currentIcon");
const currentTemp = document.getElementById("currentTemp");
const currentCity = document.getElementById("currentCity");
const currentDescription = document.getElementById("currentDescription");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");

const forecastCards = document.getElementById("forecastCards");
const temperatureChart = document.getElementById("temperatureChart");

const WEATHER_INFO = {
  0: { icon: "☀️", text: "ท้องฟ้าแจ่มใส" },
  1: { icon: "🌤️", text: "แจ่มใสเป็นส่วนใหญ่" },
  2: { icon: "⛅", text: "มีเมฆบางส่วน" },
  3: { icon: "☁️", text: "มีเมฆมาก" },
  45: { icon: "🌫️", text: "มีหมอก" },
  48: { icon: "🌫️", text: "มีหมอกหนา" },
  51: { icon: "🌦️", text: "ฝนปรอยเล็กน้อย" },
  53: { icon: "🌦️", text: "ฝนปรอย" },
  55: { icon: "🌧️", text: "ฝนปรอยหนัก" },
  61: { icon: "🌧️", text: "ฝนเล็กน้อย" },
  63: { icon: "🌧️", text: "ฝนปานกลาง" },
  65: { icon: "🌧️", text: "ฝนหนัก" },
  71: { icon: "🌨️", text: "หิมะเล็กน้อย" },
  73: { icon: "🌨️", text: "หิมะปานกลาง" },
  75: { icon: "❄️", text: "หิมะหนัก" },
  80: { icon: "🌦️", text: "ฝนตกเป็นช่วงๆ" },
  81: { icon: "🌧️", text: "ฝนตกเป็นช่วงๆ" },
  82: { icon: "⛈️", text: "ฝนตกหนักเป็นช่วงๆ" },
  95: { icon: "⛈️", text: "พายุฝนฟ้าคะนอง" },
  96: { icon: "⛈️", text: "พายุฝนฟ้าคะนองและลูกเห็บ" },
  99: { icon: "⛈️", text: "พายุฝนฟ้าคะนองและลูกเห็บ" },
};

function getWeatherInfo(code) {
  return WEATHER_INFO[code] ?? {
    icon: "🌡️",
    text: "ไม่ทราบสภาพอากาศ",
  };
}

function formatDay(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("th-TH", {
    weekday: "short",
  }).format(date);
}

function clearMessages() {
  loading.textContent = "";
  errorMessage.textContent = "";
}

async function searchCity(city) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}` +
    `&count=1&language=th&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Geocoding API request failed");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("ไม่พบชื่อเมือง");
  }

  return data.results[0];
}

async function getWeather(cityInfo) {
  const { latitude, longitude } = cityInfo;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,surface_pressure,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&forecast_days=5&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather API request failed");
  }

  return await response.json();
}

function displayCurrentWeather(cityInfo, data) {
  const current = data.current;
  const info = getWeatherInfo(current.weather_code);

  currentIcon.textContent = info.icon;

  currentTemp.textContent =
    `${Math.round(current.temperature_2m)}°C`;

  currentCity.textContent =
    `${cityInfo.name}, ${cityInfo.country_code}`;

  currentDescription.textContent = info.text;

  humidity.textContent =
    `${Math.round(current.relative_humidity_2m)}%`;

  wind.textContent =
    `${Number(current.wind_speed_10m).toFixed(1)} km/h`;

  pressure.textContent =
    `${Math.round(current.surface_pressure)} hPa`;

  feelsLike.textContent =
    `${Math.round(current.apparent_temperature)}°C`;
}

function displayForecast(data) {
  const daily = data.daily;

  forecastCards.innerHTML = "";

  for (let i = 0; i < daily.time.length; i++) {
    const info = getWeatherInfo(daily.weather_code[i]);

    const card = document.createElement("article");
    card.className = "forecast-card";

    card.innerHTML = `
      <div class="forecast-day">
        ${i === 0 ? "วันนี้" : formatDay(daily.time[i])}
      </div>

      <div class="forecast-icon">
        ${info.icon}
      </div>

      <div class="max-temp">
        ${Math.round(daily.temperature_2m_max[i])}°C
      </div>

      <div class="min-temp">
        ${Math.round(daily.temperature_2m_min[i])}°C
      </div>

      <div class="rain-chance">
        🌧️ ${daily.precipitation_probability_max[i]}%
      </div>
    `;

    forecastCards.appendChild(card);
  }
}

function displayChart(data) {
  const daily = data.daily;

  const maxValue = Math.max(...daily.temperature_2m_max);
  const minValue = Math.min(...daily.temperature_2m_min);

  // เว้นขอบล่างเล็กน้อย
  const chartMin = Math.max(
    0,
    Math.floor(minValue - 5)
  );

  const chartMax = Math.ceil(maxValue + 5);

  temperatureChart.innerHTML = "";

  for (let i = 0; i < daily.time.length; i++) {
    const maxTemp = daily.temperature_2m_max[i];
    const minTemp = daily.temperature_2m_min[i];

    const maxHeight =
      ((maxTemp - chartMin) / (chartMax - chartMin)) * 100;

    const minHeight =
      ((minTemp - chartMin) / (chartMax - chartMin)) * 100;

    const day = document.createElement("div");
    day.className = "chart-day";

    day.innerHTML = `
      <div
        class="bars"
        title="${maxTemp.toFixed(1)}°C / ${minTemp.toFixed(1)}°C"
      >
        <div
          class="bar max"
          style="height:${Math.max(maxHeight, 5)}%"
        ></div>

        <div
          class="bar min"
          style="height:${Math.max(minHeight, 5)}%"
        ></div>
      </div>

      <div class="chart-label">
        ${i === 0 ? "วันนี้" : formatDay(daily.time[i])}
      </div>
    `;

    temperatureChart.appendChild(day);
  }
}

async function getWeatherDashboard(city) {
  try {
    clearMessages();

    loading.textContent = "กำลังโหลดข้อมูล...";

    // หา latitude และ longitude จากชื่อเมือง
    const cityInfo = await searchCity(city);

    // ใช้พิกัดไปขอข้อมูลสภาพอากาศ
    const data = await getWeather(cityInfo);

    // JSON Response ใน Console
    console.log("JSON Response:", data);

    // แสดงข้อมูลบนหน้าเว็บ
    displayCurrentWeather(cityInfo, data);
    displayForecast(data);
    displayChart(data);

    loading.textContent = "";
  } catch (error) {
    console.error(error);

    loading.textContent = "";

    errorMessage.textContent =
      "เกิดข้อผิดพลาด กรุณาลองใหม่";
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    errorMessage.textContent =
      "กรุณากรอกชื่อเมือง";

    return;
  }

  getWeatherDashboard(city);
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

getWeatherDashboard(cityInput.value);