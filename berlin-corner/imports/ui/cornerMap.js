import { Template } from 'meteor/templating';
import './cornerMap.html';

var map;

//the current location button
var currentLocation =  L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    container.style.backgroundColor = 'white';     
   // container.style.backgroundSize = "25px 25px";
    container.style.width = '26px';
   // container.style.height = '25px';
    container.style.cursor = "pointer";
    container.innerHTML = "<span style='font-size:25px; padding-left:5px;'>&curren;</span>";

    container.onclick = function(){
      map.locate({setView: true, maxZoom: 16});
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
    }
    return container;
  }
});

//on locate event set marker at current position
function onLocationFound(e) {
    L.marker(e.latlng).addTo(map);
}
// current location error
function onLocationError(e) {
    alert("Standort nicht ermittelbar");
}

//contextmenu
function openPopupMenu(){
    alert("PopUp-Menu");
}

Template.map.onRendered( function() {
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

    map = L.map('mapId', {doubleClickZoom: true, attributionControl: false}).setView([52.5243700, 13.4105300], 18);
    L.tileLayer.provider('Stamen.Watercolor').addTo(map);
    map.addControl(new currentLocation());
    
    map.on('contextmenu',openPopupMenu);
});
