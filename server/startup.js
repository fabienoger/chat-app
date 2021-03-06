Meteor.startup(function() {
  var usersId = [];

  // Create Super Admin and Admin
  if (Meteor.users.find().fetch().length === 0) {
    console.log("Creating users [...]");
    var id;
    var users = [
      {name: "Super Admin", email: "super@fabienoger.com", roles: ['superadmin'], language: "france", password: "super123"},
      {name: "Admin", email: "admin@fabienoger.com", roles: ['admin'], language: "france", password: "admin123"},
      {name: "Foger", email: "fab-oger@live.fr", roles: ['admin'], language: "france", password: "admin123"}
    ];

    _.each(users, function (user) {
      console.log(user);

      id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          name: user.name,
          username: "",
          active: true,
          changeUserName: true,
          admin: true,
          superAdmin: true
        }
      });
      usersId.push(id);
      // Email verification
      Meteor.users.update({_id: id}, {$set: {'emails.0.verified': true}});
    });
  }
  // Create defaults Channels
  if (Channels.find().fetch().length < 1) {
    // Get members and build array of Ids
    var members = Meteor.users.find().fetch();
    var membersId = [];
    _.each(members, function(member) {
      membersId.push(member._id);
    });

    var channel = {
        name: "general",
        members: membersId,
        public: true,
        createdBy: "",
        createdAt: new Date()
      };

    // Insert Channels
    console.log("Creating Channel #general [...]");
    console.log(Channels.insert(channel));
  }
  // Create defaults usernames
  if (Usernames.find().fetch().length < 3) {
    var usernames = [
      {
        userName: "letoutpuissant",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "42",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "cendar",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "Toupi",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      },
      {
        userName: "Toupa",
        createdAt: new Date(),
        taken: false,
        createdBy: ""
      }
    ];

    // Insert UserName
    console.log("Creating UserNames [...]");
    _.each(usernames, function(username) {
      console.log(username);
      Usernames.insert(username);
    });
  }
});
