import { Template } from 'meteor/templating';
import './cornerMap.html';

Template.map.onRendered( function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

  var map = L.map('mapId', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  //L.tileLayer.provider('Stamen.Watercolor').addTo(map);
    L.tileLayer('http://192.168.56.3/osm_tiles/{z}/{x}/{y}.png').addTo(map);
});