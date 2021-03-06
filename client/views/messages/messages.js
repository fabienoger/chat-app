/********************
      OnCREATED
********************/

Template.messages.onCreated(function() {
  self = this;
  // Subscribe to the current Channel
  self.autorun(function() {
    var channel = Modules.client.channels.current.get();
    self.subscribe('channel', channel);
//    var conversationId = Modules.client.conversations.current.get();
//    if (channel) {
//    } else {
//      self.subscribe('privateMessages', conversationId);
//    }
  });
});

/********************
       HELPERS
********************/

Template.messages.helpers({
  // Return true if user is member of this channel
  userIsMember: function() {
    // Intialize variables
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});

    if (channel) {
      if (_.contains(channel.members, Meteor.userId())) {
        return true;
      } else {
        return false;
      }
    }
  },
  // Return messages
  getMessages: function() {
    Modules.client.messages.messages.set(Messages.find({}).fetch());
    return Modules.client.messages.messages.get() || false;
  },
  // Return true if is the same author to last message
  sameAuthor: function(index, userId) {
    var messages = Modules.client.messages.messages.get() || false;
    if (messages[index - 1]) {
      if (messages[index - 1].createdBy == userId) {
        return true;
      } else {
        return false;
      }
    }
  }
});
