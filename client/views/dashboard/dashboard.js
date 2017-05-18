Template.dashboard.onCreated(function () {
    this.subscribe('projects');
    this.subscribe('tasks');
    this.subscribe('requests');
});
Session.set('sortProjby', "created_on");
Session.set('sortProjOrder', "1");
Session.set('sortTaskby', "due_on");
Session.set('sortTaskOrder', "1");
function projCursor() {
    var filter = { sort: {} };
    filter.sort[Session.get('sortProjby')] = Session.get('sortProjOrder');
    var projects = Projects.find({ "owner": Meteor.user()._id, "status": "Active" }, filter).fetch();
    for (var i in projects) {
        var req = Meteor.users.findOne({ _id: projects[i].requestor }).profile;
        projects[i].requestor = req.firstname + " " + req.lastname;
    }
    return projects;
}
function tasksCursor() {
    var filter = { sort: {} };
    filter.sort[Session.get('sortTaskby')] = Session.get('sortTaskOrder');
    var tasks = Tasks.find({ 'assigned_to': Meteor.userId(), 'completed_on': { $exists: false } }, filter).fetch();
    for (var i in tasks) {
        if (tasks[i].assigned_to) {
            var assgn = Meteor.users.findOne({ _id: tasks[i].assigned_to }).profile;
            if (Meteor.userId() == tasks[i].assigned_to) {
                tasks[i].canEdit = true;
            }
            tasks[i].assigned_to = assgn.firstname + " " + assgn.lastname;
        }
        if (tasks[i].assigned_by) {
            var assigned_by = Meteor.users.findOne({ _id: tasks[i].assigned_by }).profile;
            tasks[i].assigned_by = assigned_by.firstname + " " + assigned_by.lastname;
        }
    }
    return tasks;
}
function requestsCursor() {
    var requests = Requests.find({ "owner": Meteor.userId() }, { sort: { createdAt: -1 } }).fetch();
    for (r in requests) {
        var requestor = Meteor.users.findOne({ "_id": requests[r].requestor });
        requests[r].requestor = requestor.profile.firstname + " " + requestor.profile.lastname;
    }
    return requests;
}
Template.dashboard.helpers({
    tasks: tasksCursor,
    projects: projCursor,
    requests: requestsCursor
});
Template.dashboard.events({
    "click .delete": function () {
        Meteor.call("deleteProject", this._id);
    },
    "click .done": function () {
        Meteor.call("markTaskDone", this._id, this.title, this.projectId);
    },
    "click .projTitle": function () {
        Session.set('sortProjby', 'title');
        Session.set('sortProjOrder', -Session.get('sortProjOrder'));
    },
    "click .projTaskTitle": function () {
        Session.set('sortTaskby', 'projectTitle');
        Session.set('sortTaskOrder', -Session.get('sortProjOrder'));
    },
    "click .projDueDate": function () {
        Session.set('sortProjby', 'due_on');
        Session.set('sortProjOrder', -Session.get('sortProjOrder'));
    },
    "click .taskDueDate": function () {
        Session.set('sortTaskby', 'due_on');
        Session.set('sortTaskOrder', -Session.get('sortTaskOrder'));
    },
    "click .taskTitle": function () {
        Session.set('sortTaskby', 'title');
        Session.set('sortTaskOrder', -Session.get('sortTaskOrder'));
    }

});