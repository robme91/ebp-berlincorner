import { Meteor } from 'meteor/meteor';
import '../imports/api/corners/corners.js';

Meteor.startup(() => {
  SSLProxy({
       port: 8443, 
       ssl : {
            key: Assets.getText("server.key"),
            cert: Assets.getText("server.crt"),
       }
    });
});

Meteor.methods({
  logToConsole: function(msg) {
    console.log(msg);
  }
})