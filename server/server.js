Meteor.startup(function () {
	// process.env.MAIL_URL="smtp://aaron.m.alder%40gmail.com:5AjAQFFGU9NXcBb@smtp.gmail.com:465/"; 
	var admin = Meteor.users.findOne({emails: { $elemMatch: { address: "felix@excelceo.com" } }});
	if(admin == undefined)
	{
		console.log("Adding Admin")
		var options = {
	        email: "felix@excelceo.com",
	        password: "alderaa",
	        profile: {
	            firstname: "Aaron",
	            lastname:  "Alder",
	            birthday:  new Date("01/05/1990"),
	            company: ["Felix"]
	        },
	    };
	    Accounts.createUser(options);
	}
	Projects.find().forEach(function(proj) {
		if(proj.recurring)
		{
			Meteor.call('scheduleRecurringProject', proj._id, true, function (error) {
	          if (error) console.log("Couldn't add task");
	        });
		}
	});
});
Meteor.publish("projects", function () {
	return Projects.find({
	});
});
Meteor.publish("tasks", function () {
	return Tasks.find({
	});
});
Meteor.publish("convs", function () {
	return Convs.find({

	});
});
Meteor.publish("sendRecurringEmail", function () {
  return Meteor.users.find({
  		// "profile.company": { $in: [Meteor.user().currentCompany]}
  		"profile.company": { $in: ["Felix"]}
  });
});
Meteor.publish("notifs", function () {
	var notifs =  Notifs.find({
		"user": this.userId
	});
	return notifs;
});
SyncedCron.start();