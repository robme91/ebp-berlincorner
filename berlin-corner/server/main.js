import { Meteor } from 'meteor/meteor';
import '../imports/api/corners/corners.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  logToConsole: function(msg) {
    console.log(msg);
  }
})