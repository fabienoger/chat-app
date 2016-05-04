Meteor.publish('usernames', function() {
  return Usernames.find({});
});

Meteor.publish('conversations', function() {
  return Conversations.find({});
});
/*
Meteor.publish('privateMessages', function(conversationId) {
  return Messages.find({conversationId: conversationId});
});

Meteor.publish('channelMessages', function(channel) {
  return Messages.find({channel: channel});
});
*/

Meteor.publish('channel', function(channel) {
  return Messages.find({channel: channel});
});

Meteor.publish('feedBacks', function() {
  return FeedBacks.find({});
});

Meteor.publish('users', function() {
  return Meteor.users.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

Meteor.publish('channels', function () {
  return Channels.find({});
});
