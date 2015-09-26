Meteor.startup(function () {
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
Meteor.publish("allUsers", function () {
  return Meteor.users.find({
  		"profile.company": { $in: ["Felix"]}
  });
});
// Accounts.onCreateUser(function(options, user) {
//   if (options.profile)
//     user.profile = options.profile;
//   return user;
// });