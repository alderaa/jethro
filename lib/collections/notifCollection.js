Notifs = new Mongo.Collection("notifs");
Notifs.allow({
	insert: function () { return true; },
	update: function () { return true; },
	remove: function () { return true; },
})
Meteor.methods({
  addNotif: function(notif){
    if(!notif.notify)
      notif.notify = Meteor.userId();
    notif.date = new Date();
    notif.seen = false;
    var success = Notifs.insert(notif);
  },
  seenNotifs: function(){
  	Notifs.update({notify:Meteor.userId()},{$set:{seen:true}},{multi: true});
  }
});