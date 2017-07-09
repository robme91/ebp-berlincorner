import { Template } from 'meteor/templating';
import { Corners } from '../api/corners/corners.js';

import  './corner.js';
import './body.html';


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
