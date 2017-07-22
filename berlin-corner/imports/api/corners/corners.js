import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Corners = new Mongo.Collection('corners');

Meteor.methods({

  'corners.insert'(latLng) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Corners.insert({
      latLng
    });
  },

  'corners.remove'(cornerId) {
    Corners.remove(cornerId);
  },

  'corners.setChecked'(cornerId, setChecked) {
    check(cornerId, String);
    check(setChecked, Boolean);
    Corners.update(cornerId, { $set: { checked: setChecked } });
  },

});