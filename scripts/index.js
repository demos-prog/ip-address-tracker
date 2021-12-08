const apiKey = "at_TaVae0Ue0RJHgJwNbuZgwddxjViDT";

async function getGeolocation(ip) {
  let res = await fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ip}`
  );
  if (res.ok) {
    let json = await res.json();
    return json;
  } else {
    alert("Invalid IP !");
  }
}

let input = document.querySelector("form input");

function initMap() {
  getGeolocation(input.value).then((result) => {
    let latitude = result.location.lat;
    let longitude = result.location.lng;

    document.querySelector(".IPAddress").innerHTML = input.value;
    document.querySelector(".location").innerHTML = result.location.city;
    document.querySelector(".timezone").innerHTML =
      "UTC " + result.location.timezone;

    document.getElementById("mapWrapper").innerHTML = "<div id='map'></div>";
    let map = L.map("map").setView([latitude, longitude], 13);
    L.marker([latitude, longitude]).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  });
}

initMap();
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  initMap();
});
