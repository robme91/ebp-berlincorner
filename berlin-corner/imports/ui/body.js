import { Template } from 'meteor/templating';
import { Corners } from '../api/corners/corners.js';

import  './corner.js';
import './body.html';
    
Template.map.onRendered( function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';

  var map = L.map('mapId', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('Stamen.Watercolor').addTo(map);
});
    
   /* L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
    var map = L.map('mapId');
     L.tileLayer.provider('Stamen.Watercolor').addTo(map);*/

Template.body.helpers({
  corners() {
    return Corners.find({});
  },
});

Template.body.events({
  'submit .new-corner'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const coordinates = target.coordinates.value;
    // Insert a corner into the collection
    Meteor.call('corners.insert', coordinates);
    // Clear form
    target.coordinates.value = '';
  },
});