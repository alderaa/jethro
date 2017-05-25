Meteor.methods({
	'scheduleRecurringProject': function (projectId, sendEmail) {
		var proj = Projects.findOne({ _id: projectId });
		if (proj.recurring) {
			SyncedCron.add({
				name: projectId,
				schedule: function (parser) {
					if (!proj.recurringOptions)
						return parser.cron('* * * * *');
					return parser.cron(proj.recurringOptions);
				},
				job: function () {
					var diff = moment(Date.parse(proj.due_on)).diff(Date.parse(proj.created_on));
					var dur = moment.duration(diff);
					proj.created_on = new Date();
					proj.due_on = moment(proj.created_on).add(dur).toDate();
					Projects.update({ _id: projectId }, { $set: proj });
					if (sendEmail) {
						var owner = Meteor.users.findOne({ _id: proj.owner });
						Meteor.call('sendRecurringEmail',
							'aaron.m.alder@gmail.com',
							'felix@excelceo.com',
							'Hello from Meteor!',
							'This is a test of Email.send.');
					}
				}
			});
		}
		else {
			SyncedCron.remove(projectId);
		}
	},
	'updateRecurringProject': function (projectId, sendEmail) {
		SyncedCron.remove(projectId);
		Meteor.call('scheduleRecurringProject', projectId, sendEmail);
	},
	sendRecurringEmail: function (to, from, subject, text) {
		check([to, from, subject, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	}
});