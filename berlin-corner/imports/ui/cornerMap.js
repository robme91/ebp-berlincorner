import { Template } from 'meteor/templating';
import './cornerMap.html';
import { Corners } from '../api/corners/corners.js';

/* the map object*/
var map;
/* the current coordinates*/
var currentCoords;

/*the current location button*/
var currentLocation =  L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    container.style.backgroundColor = 'white';     
    container.style.width = '26px';
    container.style.cursor = "pointer";
    container.innerHTML = "<span style='font-size:25px; padding-left:5px;'>&curren;</span>";

    container.onclick = function(){
      map.locate({setView: true, maxZoom: 16});
    }
    return container;
  }
});

/* the share-location button*/
var shareLocation = L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    container.style.backgroundColor = 'white';     
    container.style.width = '26px';
    container.style.cursor = "pointer";
    container.innerHTML = "<span style='font-size:25px; padding-left:5px;'>S</span>";

    container.onclick = function(){
        if(currentCoords != null){
            alert("share these coords: " + currentCoords);
        }else{
            alert("No current location");
        }
    }
    return container;
  }
});

var currentPosLayer;
/*on locate event set marker at current position*/
function onLocationFound(e) {
   if(currentPosLayer != null){
        map.removeLayer(currentPosLayer);
   }
   currentPosLayer = L.circle(e.latlng, {
        color: '#1990B0',
        fillColor: '#2f9bb7',
        fillOpacity: 0.7,
        radius: 5
    }).addTo(map);
   currentCoords = e.latlng;
}
/* current location error*/
function onLocationError(e) {
    alert("Standort nicht ermittelbar");
    currentCoords = null;
}

/*handle right click (desktop) - long click smartphone */
function handleContextClick(event){
    var currentMarker = L.marker(event.latlng, {title: 'New Corner'}).addTo(map);
    currentMarker.bindPopup("To save this marker as corner, click long(right) on it. To Remove this marker double click on it.");
    currentMarker.on('dblclick', function(e){
        currentMarker.remove();
    });
    currentMarker.on('contextmenu', function(e){
       saveMarkerAsCorner(currentMarker);       
    });
}

function saveMarkerAsCorner(marker){
    if(marker){
       Meteor.call('corners.insert', marker.getLatLng());
    }
    marker.remove();
    refreshCorners();
}

Template.map.onRendered( function() {
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

    map = L.map('mapId', {doubleClickZoom: false, attributionControl: false, zoom: 15, maxZoom: 16}).setView([52.5243700, 13.4105300]);
    L.tileLayer.provider('Stamen.Watercolor').addTo(map);
    
    map.addControl(new currentLocation());
    map.addControl(new shareLocation());
    
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.on('contextmenu', handleContextClick);
    refreshCorners();
});

var corners;
function refreshCorners(){
    if(corners){
        corners.forEach(function(corner){
            if(map.hasLayer(corner)){
                corner.remove();
            }
        });
    }
    corners = getAllCorners();
}


function getAllCorners(){
    var cornersCoords = Corners.find({});
    cornersCoords.forEach(function(coords){
        var corner = new L.circle(coords.latLng, {
                        color: 'green',
                        fillColor: 'green',
                        fillOpacity: 1.0,
                        radius: 20
                    }).bindPopup("I am a corner").addTo(map);
    });
}
