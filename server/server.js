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
	SyncedCron.start();
});