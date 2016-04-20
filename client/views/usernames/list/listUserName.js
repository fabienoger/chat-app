/****************
      EVENTS
****************/

Template.listUserNames.events({
  // Remove userName on click on close icon
  'click .remove-username': function(e, t) {
    var id = e.target.dataset.id;

    // Call the removeUserName method
    Meteor.call("removeUserName", id, function(err, result) {
      if (err) {
        console.error("removeUserName ", err);
        Modules.client.utils.displayPanel("username-info", "negative", "warning", "Oups ! Something went wrong.");
      } else {
        Modules.client.utils.displayPanel("username-info", "positive", "checkmark", "Username was successfully removed !");
      }
    });
  }
});

/****************
     HELPERS
****************/

Template.listUserNames.helpers({
  // Return all usernames
  getUserNames: function() {
    return Usernames.find().fetch();
  }
});