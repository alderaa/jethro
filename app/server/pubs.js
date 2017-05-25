Meteor.publish("projects", function () {
    var user = Meteor.users.findOne({ '_id': this.userId })
    if (user) {
        var projectCursor = Projects.find({
            'company': user.profile.activeCompany
        });
        var projectIds = [];
        projectCursor.forEach(function (u) { projectIds.push(u._id) });
        return [
            projectCursor,
            Tasks.find({ 'projectId': { $in: projectIds } }),
            Convs.find({ 'projectId': { $in: projectIds } }),
            Roles.getUsersInRole('employee', user.profile.activeCompany),
            Requests.find({ 'company': user.profile.activeCompany }),
        ];
    }
    else return [];
});
Meteor.publish("notifs", function () {
    var notifs = Notifs.find({
        "notify": this.userId
    });
    return notifs;
});
Meteor.publish("templates", function () {
    var user = Meteor.users.findOne({ '_id': this.userId })
    return Templates.find({
        'owner': this.userId,
        'company': user.profile.activeCompany
    });
});
Meteor.publish("recurring", function () {
    var dates = Recurring.find({
        "owner": this.userId
    });
    return dates;
});