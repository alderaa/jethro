/**************************************
Projects events
***************************************/
Template.active.onCreated(function () {
    this.subscribe('projects');
});
Template.completed.onCreated(function () {
    this.subscribe('projects');
});
Template.maintain.onCreated(function () {
    this.subscribe('projects');
});
Template.hold.onCreated(function () {
    this.subscribe('projects');
});
function activeCursor() {
    var projects = Projects.find({ "owner": Meteor.user()._id, "status": "Active" }, { sort: { createdAt: -1 } }).fetch();
    for (var i in projects) {
        var req = Meteor.users.findOne({ _id: projects[i].requestor }).profile;
        projects[i].requestor = req.firstname + " " + req.lastname;
    }
    return projects;
}
function completedCursor() {
    var projects = Projects.find({ "owner": Meteor.user()._id, "status": "Completed" }, { sort: { createdAt: -1 } }).fetch();
    for (var i in projects) {
        var req = Meteor.users.findOne({ _id: projects[i].requestor }).profile;
        projects[i].requestor = req.firstname + " " + req.lastname;
    }
    return projects;
}
function maintainCursor() {
    var projects = Projects.find({ "owner": Meteor.user()._id, "status": "Maintenance" }, { sort: { createdAt: -1 } }).fetch();
    for (var i in projects) {
        var req = Meteor.users.findOne({ _id: projects[i].requestor }).profile;
        projects[i].requestor = req.firstname + " " + req.lastname;
    }
    return projects;
}
function holdCursor() {
    var projects = Projects.find({ "owner": Meteor.user()._id, "status": "Hold" }, { sort: { createdAt: -1 } }).fetch();
    for (var i in projects) {
        var req = Meteor.users.findOne({ _id: projects[i].requestor }).profile;
        projects[i].requestor = req.firstname + " " + req.lastname;
    }
    return projects;
}
Template.projects.onRendered(function () {
});
Template.active.helpers({
    active: activeCursor
});
Template.completed.helpers({
    completed: completedCursor
});
Template.hold.helpers({
    hold: holdCursor
});
Template.maintain.helpers({
    maintain: maintainCursor
});
Template.projectViews.onRendered(function () {
    $('select').material_select();
});
Template.projectViews.events({
    "change #viewing": function () {
        var url = $("#viewing").val();
        if (url === "active") {
            FlowRouter.go("/projects");
        }
        else if (url === "hold") {
            FlowRouter.go("/projects/hold");
        }
        else if (url === "maintain") {
            FlowRouter.go("/projects/maintain");
        }
        else if (url === "completed") {
            FlowRouter.go("/projects/completed");
        }
    }
});