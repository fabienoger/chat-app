Meteor.methods({
  // Create userName
  createRandomUserName: function(username) {
    // If username is empty return Meteor.error
    if (!username) {
      throw new Meteor.Error("missing-param", "Param 'username' is missing.");
      return;
    }
    return Usernames.insert(username);
  },
  // Remove a userName
  removeUserName: function(id) {
    // If id is empty return Meteor.error
    if (!id) {
      throw new Meteor.Error("missing-param", "Param 'id' is missing.");
      return;
    }
    return Usernames.remove({_id: id});
  },
  // Upsert userName
  upsertUserName: function(id, object) {
    // Check if params are empty
    if (!id || !object) {
      throw new Meteor.Error("missing-params", "Params 'id' or 'object' is missing.");
      return;
    }
    return Usernames.upsert({
      _id: id,
    }, object);
  },
  // Set UserNames.taken to false & Users.profile.changeUserName to true
  cleanBeforeGenerate: function() {
    console.log("CleanBeforeGenerate [...]");
    var results = [];
    results.push(Usernames.upsert({}, {$set: {taken: false}}, {multi: true}));
    results.push(Meteor.users.upsert({}, {$set: {"profile.changeUserName": true}}, {multi: true}));
    return results;
  },
  // Generate and attribute userName to all users
  generateUserNames: function() {
    console.log("Meteor.user() => ", Meteor.user());
    // Get UserNames and Users
    var userNames = Usernames.find({taken: false}).fetch();
    var users = Meteor.users.find({
      $and: [
        {"profile.changeUserName": true},
        {$nor: [{"profile.name": "Super Admin"}, {"profile.name": "Admin"}]}
      ]
    }).fetch();

    // Check if userNames >= users
    if (userNames.length >= users.length) {
      console.log("Generates UserNames [...]");
      _.each(users, function(user) {
        userNames = [];
        userNames = Usernames.find({taken: false}).fetch();
        // Get random UserName
        var randomUserName = Random.choice(userNames);
        // Call upsertUser method
        Meteor.call("upsertUser", user._id, {$set: {"profile.username": randomUserName.userName, "profile.changeUserName": false }}, function(err, result) {
          if (err) {
            console.error("upsertUser ", err);
            Modules.both.generateUserNameInfo.set("UserNames have not been assigned.");
            Modules.both.emptyGUserNameInfo();
          } else {
            // Call upsertUserName method
            Meteor.call("upsertUserName", randomUserName._id, {$set: {taken: true}}, function(err, result) {
              if (err) {
                console.error("upsertUserName ", err);
                Modules.both.generateUserNameInfo.set("UserNames have not been assigned.");
                Modules.both.emptyGUserNameInfo();
              } else {
                Modules.both.generateUserNameInfo.set("The UserNames were assigned.");
                Modules.both.emptyGUserNameInfo();
              }
            });
          }
        });
      });
      console.log("End Generates UserNames !");
    } else {
      console.log("generateUserNames() => Need more userNames");
    }
  }
});
