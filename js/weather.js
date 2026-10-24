/*
 * Nexus-Dashboard — Parte 4: API pública Open-Meteo.
 * Não precisa de chave de API para o uso gratuito não comercial.
 */
(() => {
  "use strict";

  const form = document.querySelector("#weather-form");
  const cityInput = document.querySelector("#weather-city");
  const searchButton = document.querySelector("#weather-search-button");
  const statusElement = document.querySelector("#weather-status");
  const dataElement = document.querySelector("#weather-data");

  const weatherCodes = {
    0: { label: "Céu limpo", icon: "☀️" },
    1: { label: "Predominantemente limpo", icon: "🌤️" },
    2: { label: "Parcialmente nublado", icon: "⛅" },
    3: { label: "Nublado", icon: "☁️" },
    45: { label: "Neblina", icon: "🌫️" },
    48: { label: "Neblina com geada", icon: "🌫️" },
    51: { label: "Garoa leve", icon: "🌦️" },
    53: { label: "Garoa moderada", icon: "🌦️" },
    55: { label: "Garoa intensa", icon: "🌧️" },
    61: { label: "Chuva leve", icon: "🌧️" },
    63: { label: "Chuva moderada", icon: "🌧️" },
    65: { label: "Chuva forte", icon: "🌧️" },
    71: { label: "Neve leve", icon: "🌨️" },
    73: { label: "Neve moderada", icon: "🌨️" },
    75: { label: "Neve forte", icon: "❄️" },
    80: { label: "Pancadas de chuva leves", icon: "🌦️" },
    81: { label: "Pancadas de chuva moderadas", icon: "🌧️" },
    82: { label: "Pancadas de chuva fortes", icon: "⛈️" },
    95: { label: "Trovoada", icon: "⛈️" },
    96: { label: "Trovoada com granizo", icon: "⛈️" },
    99: { label: "Trovoada com granizo forte", icon: "⛈️" }
  };

  function setStatus(message, isError = false) {
    statusElement.textContent = message;
    statusElement.dataset.state = isError ? "error" : "info";
    statusElement.hidden = false;
  }

  async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`A API respondeu com status ${response.status}.`);
    return response.json();
  }

  async function getCity(name) {
    const params = new URLSearchParams({
      name, count: "1", language: "pt", format: "json"
    });
    const result = await fetchJson(
      `https://geocoding-api.open-meteo.com/v1/search?${params}`
    );
    if (!result.results?.length) {
      throw new Error("Cidade não encontrada. Confira o nome e tente novamente.");
    }
    return result.results[0];
  }

  async function getWeather(latitude, longitude) {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      timezone: "auto"
    });
    return fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`);
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function renderWeather(city, response) {
    const current = response.current;
    if (!current) throw new Error("A API não retornou as condições atuais.");

    const condition = weatherCodes[current.weather_code] ??
      { label: "Condição não identificada", icon: "🌡️" };
    const placeName = [city.name, city.admin1, city.country].filter(Boolean).join(", ");

    setText("#weather-location", placeName);
    setText("#weather-temperature", `${Math.round(current.temperature_2m)}°C`);
    setText("#weather-description", condition.label);
    setText("#weather-apparent-temperature", `${Math.round(current.apparent_temperature)}°C`);
    setText("#weather-humidity", `${current.relative_humidity_2m}%`);
    setText("#weather-wind", `${Math.round(current.wind_speed_10m)} km/h`);
    setText("#weather-updated", `Atualizado conforme a API: ${current.time}`);

    const symbol = document.querySelector(".weather-symbol");
    if (symbol) symbol.textContent = condition.icon;

    setText("#summary-weather", `${Math.round(current.temperature_2m)}°C`);
    setText("#summary-location", placeName);

    dataElement.hidden = false;
    statusElement.hidden = true;
  }

  async function loadWeather(cityName) {
    const name = cityName.trim();
    if (!name) {
      setStatus("Digite o nome de uma cidade para consultar o clima.", true);
      return;
    }

    searchButton.disabled = true;
    dataElement.hidden = true;
    setStatus("Buscando localização e condições meteorológicas...");

    try {
      const city = await getCity(name);
      const weather = await getWeather(city.latitude, city.longitude);
      renderWeather(city, weather);
    } catch (error) {
      console.error("[Nexus-Dashboard] Erro ao consultar clima:", error);
      setStatus(
        error instanceof TypeError
          ? "Não foi possível conectar à API. Verifique sua internet."
          : (error.message || "Ocorreu um erro ao consultar o clima."),
        true
      );
    } finally {
      searchButton.disabled = false;
    }
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    loadWeather(cityInput.value);
  });

  if (form && cityInput) loadWeather(cityInput.value);
})();
