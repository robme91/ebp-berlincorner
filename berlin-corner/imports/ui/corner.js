import { Template } from 'meteor/templating';
import './corner.html';

Template.corner.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('corners.setChecked', this._id, ! this.checked);
  },

  'click .delete'() {
    Meteor.call('corners.remove', this._id);
  },
});

