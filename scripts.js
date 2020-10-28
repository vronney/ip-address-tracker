// Get local ip address 

function localIp() {
    let localIPAddress;

    fetch('https://api.ipify.org/?format=json')
        .then(results => results.json())
        .then(data => JSON.stringify(
            localIPAddress = data.ip,
            console.log(localIPAddress)            
        ))
        .catch(error => console.log('error: ', error));

    onSubmit(localIPAddress);    
}

localIp();

document.querySelector('.input-group-append').addEventListener('click', onSubmit);

let lat;
let lng;
let map;

function leafMap(lat, lng, isp) {  
    document.getElementById('leaflet-map').innerHTML = "<div id='mapid' class='col-md-12'></div>";
    
    // Leaflet map
    const map = L.map('mapid').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map),

    L.marker([lat, lng]).addTo(map)
    .bindPopup(`${isp}<br>${lat}, ${lng}`)
    .openPopup();

    L.circle([lat, lng], {radius: 300}).addTo(map);

}

function onSubmit() {
    
    let ipAddress = document.getElementById('ipAddress');
    let ipAddressValue;
    let ipValue, local, timezone, isp;
    ipAddressValue = ipAddress.value;
    ipAddress.value = '';
            
    // IP Geoloaction API
    let ip = ipAddressValue;
    let api_key = "at_y3EdKwwYsYiAC6rY2oipX6cSKI7hz";
    let url = "https://geo.ipify.org/api/v1";

    fetch(`${url}?apiKey=${api_key}&ipAddress=${ip}&domain=${ip}`,  {
        method: 'GET'
    })
    .then(response => response.json())
    .then(json => JSON.stringify(
        ipValue = json.ip,
        local = json.location.city + ', ' + json.location.region + ' ' + json.location.postalCode,
        timezone = json.location.timezone,
        isp = json.isp,
        lat = json.location.lat,
        lng = json.location.lng,

        document.getElementById('ip').innerHTML = ipValue,
        document.getElementById('local').innerHTML = local,
        document.getElementById('timezone').innerHTML = timezone,
        document.getElementById('isp').innerHTML = isp,
        console.log(json),
        leafMap(lat, lng, isp)
    ))
    .catch(error => console.log('error', error));  

};
