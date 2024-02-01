
const map = L.map('map'); 
// Initializes map
let marker, circle, zoomed;

// Sets initial coordinates and zoom level
const options = {
    enableHighAccuracy: true, 
    timeout: 5000, 
    maximumAge: 2000, 
};

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map); 

map.setView([18.6070004,73.874704], 17); 



navigator.geolocation.watchPosition(success, error, options);
// Fires success function immediately and when user position changes


function success(pos) {
    
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    // Removes any existing marker and circule (new ones about to be set)
    
    marker = L.marker([lat, lng]).addTo(map);
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
    // Adds marker to the map and a circle for accuracy
    
    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds()); 
    }
    // Set zoom to boundaries of accuracy circle
    
    map.setView([lat, lng]);
    // Set map focus to current user position
    
}

function error(err) {
    
    if (err.code === 1) {
        alert("Please allow geolocation access");
        // Runs if user refuses access
    } else {
        alert("Cannot get current location");
        // Runs if there was a technical problem.
    }
    
}



//
function submitForm(event) {
    event.preventDefault();

    // delete current map layer
    map.remove();

    // getting form data
    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    // run directions function
    runDirection(start, end);

    // reset form
    document.getElementById("form").reset();
}

// asign the form to form variable
const form = document.getElementById('form');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);






CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
            iconUrl: 'img/red.png',
            iconSize: [20, 29],
            iconAnchor: [10, 29],
            popupAnchor: [0, -29]
        });

        marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

        return marker;
    },

    createEndMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
            iconUrl: 'img/blue.png',
            iconSize: [20, 29],
            iconAnchor: [10, 29],
            popupAnchor: [0, -29]
        });

        marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

        return marker;
    }
});

map.addLayer(new CustomRouteLayer({
    directions: dir,
    fitBounds: true
})); 

