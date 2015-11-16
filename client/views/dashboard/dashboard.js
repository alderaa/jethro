Template.dashboard.onCreated(function(){
    this.subscribe('projects');
    this.subscribe('tasks');
});
function projCursor(){
    var projects = Projects.find({"owner": Meteor.user()._id, "status":"Active"}, {sort: {createdAt: -1}});
    return projects;
}
function tasksCursor()
{
  var tasks = [];
  var projects = Projects.find({"owner": Meteor.user()._id, "status":"Active"}, {sort: {createdAt: -1}}).fetch();
  for ( var p in projects)
  {
    var projectTasks = Tasks.find({"projectId":projects[p]._id, "completed_on": {$exists:false}},{sort: {order_num: -1}}).fetch();
    for (var t in projectTasks)
    {
          tasks.push(projectTasks[t]);
          var ind = tasks.length-1;
          var assigned = Meteor.users.findOne({"_id":tasks[ind].assigned_to});
          var project = Projects.findOne({"_id":tasks[ind].projectId});
          var owner = Meteor.users.findOne({"_id":project.owner});
          tasks[ind].assigned_to = assigned.profile.firstname + " " + assigned.profile.lastname;
          tasks[ind].owner = owner.profile.firstname + " " + owner.profile.lastname;
          tasks[ind].projectTitle = project.title;
    }
  }
  return tasks;
}
Template.dashboard.onRendered(function(){
});
Template.dashboard.helpers({
  tasks: tasksCursor,
  projects: projCursor,
});
Template.taskBody.onRendered(function(){
    $(".collapsible").collapsible({
        accordion: true
    });
});
Template.projectBody.onRendered(function(){
    $(".collapsible").collapsible({
        accordion: true
    });
});
Template.dashboard.events({
  "click .delete": function () {
      Meteor.call("deleteProject",this._id);
    },
   "click .done": function(){
      Meteor.call("markTaskDone",this._id);

   } 
});