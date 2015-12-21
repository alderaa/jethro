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
	    Roles.addUsersToRoles(id, ['employee', 'admin'], 'Felix');
	    Roles.addUsersToRoles(id, ['employee', 'admin'], 'ExcelCEO');
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

Meteor.methods({
	'createTempPassword' : function(doc, currentUser){
		check(doc, UsersSchema);
		var emailAlreadyExist = Meteor.users.findOne({"emails.address": doc.email});
		if(!emailAlreadyExist)
		{
	    	var userId =  Accounts.createUser(doc);
	    	Roles.addUsersToRoles(userId, ['employee'], doc.group);
	    	Roles.addUsersToRoles(userId, doc.roles, doc.group);
	    	Accounts.sendEnrollmentEmail(userId);
	    	Meteor.users.update({_id:userId},{$set:{'profile.activeCompany':doc.group}});
	    }
	    else
	    {
	    	Meteor.users.update({_id:emailAlreadyExist._id},{$set:{
	    		'profile.firstname': doc.profile.firstname,
	    		'profile.lastname': doc.profile.lastname,
	    		'profile.birthday': new Date(doc.profile.birthday),
	    	}});
	    	Roles.addUsersToRoles(userId, ['employee'], doc.group);
	    	Roles.addUsersToRoles(emailAlreadyExist._id, doc.roles, doc.group);
	    }
	}
})