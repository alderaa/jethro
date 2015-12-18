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
	        },
	    };
	    var id = Accounts.createUser(options);
	    Roles.addUsersToRoles(id, ['super-admin'], Roles.GLOBAL_GROUP);
	    Roles.addUsersToRoles(id, ['super-admin', 'employee', 'admin'], 'felix');
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
	return Projects.find(
		{}
	);
});
Meteor.publish("tasks", function () {
	return Tasks.find({
	});
});
Meteor.publish("convs", function () {
	return Convs.find({

	});
});
Meteor.publish("requests", function () {
	return Requests.find({

	});
});
Meteor.publish("allUsers", function () {
	if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
		var company = 'roles.'+user.profile.activeCompany;
		console.log(company);
		return Meteor.users.find({company:'employee'});
	}
	else
	{
		return "";
	}
});
Meteor.publish("notifs", function () {
	var notifs =  Notifs.find({
		"user": this.userId
	});
	return notifs;
});
SyncedCron.start();