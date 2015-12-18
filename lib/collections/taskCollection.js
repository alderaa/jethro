Tasks = new Mongo.Collection("tasks");
Tasks.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return false; }
});
TasksSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100
    },
    description: {
        type: String,
        label: "Description",
        max: 300

    },
    due_on: {
        type: Date,
        label: "Due On",
        autoform: {
            type: 'pickadate'
        }
    },
    completed_on: {
        type: Date,
        label: "Completed On",
        optional: true,
        autoform: {
            type: 'pickadate'
        }
    },
    assigned_to: {
        type: String,
        autoform: {
            type: 'select',
            options: 'allowed',
            skipLabel: true
        },
        optional:true
    },
    order_num: {
        type: Number,
        label: "Order Number",
    },
    projectId: {
        type: String,
        label: "Project Id",
        autoform:{
          type:"hidden"
        },
        denyUpdate: true,
        optional: false // not working if not set
    },
    projectTitle: {
        type: String,
        label: "Project Title",
        autoform:{
          type:"hidden"
        },
        denyUpdate: true,
        optional: false // not working if not set
    },
    notes: {
        type: String,
        label: "Notes",
        optional: true,
        max: 1000
    }
});
Tasks.attachSchema(TasksSchema);

Meteor.methods({
  deleteTask: function (taskId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
    if (Meteor.isClient)
    {
        Material.toast('Task removed', 3000, 'red bottom');
    }
  },
  markTaskDone: function(taskId,title,projectId){
    Tasks.update(taskId, { 
        $set: {completed_on: new Date()}
    });
    if (Meteor.isClient)
    {
        Materialize.toast('Task marked complete!', 3000, 'green bottom');
    }
    var notif = {
        url: '/project/'+projectId,
        text: "Task '"+title+"' marked complete"
    }
    Meteor.call("addNotif", notif);
  },
  markTaskNotDone: function(taskId){
    Tasks.update(taskId, { 
        $set: {completed_on: ""}
    });
    if (Meteor.isClient)
    {
        Materialize.toast('Task marked incomplete', 3000, 'orange');
    }
  },
});