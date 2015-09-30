Template.dashboard.helpers({
  tasks: function () {
      var tasks = [];
      var projects = Projects.find({"owner": Meteor.user()._id, "status":"Active"}, {sort: {createdAt: -1}}).fetch();
      for ( var p in projects)
      {
          projectTasks = Tasks.find({"projectId":projects[p]._id, "completed_on": ""},{sort: {order_num: -1}}).fetch();
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
  },
  projects: function(){
      var projects = Projects.find({"owner": Meteor.user()._id, "status":"Active"}, {sort: {createdAt: -1}}).fetch();
      return projects;
  },
  fields:[
      {'key':'projectTitle','label':'Project', tmpl:Template.projectLink},
      {'key':'owner','label':'Project Manager'},
      {'key':'title','label':'Task',tmpl:Template.taskLink},
      {'key':'description','label':'Description'},
      {'key':'assigned_to','label':'Assigned To'},
      {'key':'due_on','label':'Due On', sortOrder: 0, sortDirection: 'ascending'},
      {'key':'_id','label':'Mark Complete', 'tmpl':Template.Actions}
    ],
  projFields:[
      {'key':'title','label':'Project', tmpl:Template.editProjectLink},
      {'key':'description','label':'Description'},
      {'key':'due_on','label':'Due On', sortOrder: 0, sortDirection: 'ascending'},
      {'key':'notes','label':'Notes'},
  ]  
});

Template.dashboard.events({
  "click .delete": function () {
      Meteor.call("deleteProject",this._id);
    },
   "click .done": function(){
      Meteor.call("markTaskDone",this._id);

   } 
});