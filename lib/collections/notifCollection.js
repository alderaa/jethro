Notifs = new Mongo.Collection("notifs");
Notifs.allow({
	insert: function () { return true; },
	update: function () { return true; },
	remove: function () { return true; },
})
Meteor.methods({
  addNotif: function(notif){
    notif.user = Meteor.userId();
    notif.date = new Date();
    notif.seen = false;
    var success = Notifs.insert(notif);
  },
  seenNotifs: function(){
  	Notifs.update({user:Meteor.userId()},{$set:{seen:true}},{multi: true});
  }
});