import { Template } from 'meteor/templating';
import { Corners } from '../api/corners/corners.js';

import  './corner.js';
import  './cornerMap.js';
import './body.html';

Template.body.helpers({
  corners() {
    return Corners.find({});
  },
});