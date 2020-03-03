import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Vector as VectorSource, XYZ } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { Fill, Circle, Stroke, Style, Icon } from 'ol/style';
import { transform, useGeographic } from 'ol/proj';
import { Point } from 'ol/geom';

let clicks = 0;
let user = { startPoint: [], endPoint: [] };

// Read flood barriers 
let fb = require('./data/flood-barriers');

// Styles 
var styles = {
    'route': new Style({
        stroke: new Stroke({
            width: 6, color: [237, 212, 0, 0.8]
        })
    }),
    'redPeg': new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: 'assets/pin-red.png'
        })
    }),
    'greenPeg': new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: 'assets/pin-green.png'
        })
    })
};

// Markers
let greenPin = new VectorLayer({
    source:  new VectorSource(),
    visible: true,
    style: new Style({
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: '#1e753a'
            })
        })
    })
});

let redPin = new VectorLayer({
    source:  new VectorSource(),
    visible: true,
    style: new Style({
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: '#fc0320'
            })
        })
    })
});

// Lagos
const center = {
    projection: 'EPSG:3857',
    coords: transform([3.384082, 6.455027], 'EPSG:4326','EPSG:3857'),
    zoom: 12
}; 

// Google maps
const google = new TileLayer({
    type: 'base',
    title: 'Google maps',
    name: 'Google maps',
    visible: true,
    source: new XYZ({
        url: 'https://mt1.google.com/vt/lyrs=m&hl=pt&x={x}&y={y}&z={z}'
    })
});

const barriers = new VectorLayer({
    source:  new VectorSource({
        features: (new GeoJSON({
            defaultDataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        })).readFeatures(fb.getFloodBarriers())
    }),
    style: new Style({
        stroke: new Stroke({
            color: 'blue',
            width: 3
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })
});

// Map object
const map = new Map({
    target: 'map',
    layers: [
        google,
        barriers
    ],
    view: new View({
        projection: center.projection,
        center: center.coords,
        zoom: center.zoom
    })
});

// 
map.on('singleclick', (e) => {
    switch (clicks % 2) {
    case 0:
        console.log(e.coordinate);
        user.startPoint = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
        map.removeLayer(greenPin);
        greenPin.getSource().clear();
        greenPin.getSource().addFeature(new Feature({
            geometry: new Point(e.coordinate)
        }));
        map.addLayer(greenPin);
        break;
    case 1:
        user.endPoint = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
        map.removeLayer(redPin);
        redPin.getSource().clear();
        redPin.getSource().addFeature(new Feature({
            geometry: new Point(e.coordinate)
        }));
        map.addLayer(redPin);
        break;
    }
    ++clicks;
});

let showModalWindow = function(msg, type) {
    let modal = document.getElementById("modal1");
    let title = document.getElementById("modal-title");
    let message = document.getElementById("modal-message");
    switch (type) {
    case 'warning':
        title.innerHTML = `<strong>Warning!!</strong>`;
        message.innerHTML = `<p>${msg}</p>`;
        break;
    case 'error':
        title.innerHTML = `<strong>Error!!</strong>`;
        message.innerHTML = `<p>${msg}</p>`;
    }
    modal.style.display = 'block';
};

let showWaitModal = function(show) {
    let modal = document.getElementById("wait-modal");
    if (show) {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
};

// Source: https://hashnode.com/post/7-different-ways-to-make-ajax-calls-in-javascript-in-2019-cjr7pi2fl000gdjs2zgssqwhr
let route = null;
let getRoute = function(url) {
    let data = [];
    showWaitModal(true);
    fetch(url, { method: 'get' })
    .then(response => response.json())
    .then(jsonData => {
        showWaitModal(false);
        // here we need to add the route to map
        console.log(jsonData);
        if (route) {
            map.removeLayer(route);
        }
        route = new VectorLayer({
            source:  new VectorSource({
                features: (new GeoJSON()).readFeatures(jsonData)
            }),
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 3
                })
            })
        });
        map.addLayer(route);
    })
    .catch(err => {
        showWaitModal(false);
        showModalWindow('Got an error!!!!', 'error');
    });
}

// Load route functionality
document.getElementById('route-button').onclick = function() {
    if (user.startPoint.length != 0 && user.endPoint.length != 0) {
        getRoute(`http://localhost:8081/cgi-bin/api.py?op=route&long0=${user.startPoint[0]}&lat0=${user.startPoint[1]}&long1=${user.endPoint[0]}&lat1=${user.endPoint[1]}`);
    } else {
        showModalWindow('You\'ve got no points', 'error');
    }
};

// Close modal
document.getElementById('close-span').onclick = function() {
    document.getElementById("modal1").style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById("modal1");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}