Projects = new Mongo.Collection("projects");
SimpleSchema.debug = true;
var Helpers = {
  "employees": function(){
    return Meteor.users.find({},{$sort:-1}).map(function (c) {
        return {label: c.profile.firstname+" "+c.profile.lastname, value: c._id};
      });
  },
}
Projects.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return false; }
});
ProjectsSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100
    },
    status: {
        type: String,
        label: "Status",
        allowedValues: ['Active', 'Hold'],
        autoform: {
          label: true,
          type:"select",
          options: 'allowed',
        }
    },
    owner: {
      type: String,
      autoform:{
        type:"hidden"
      },
      optional: false // not working if not set
    },
    requestor: {
      type: String,
      label: "Requestor",
      autoform: {
          type: 'select',
          options: Helpers.employees(),
          skipLabel: true
      },
      optional: true // not working if not set
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
    created_on: {
        type: Date,
        label: "Created On",
        autoform:{
          type:"hidden"
        },
        optional: false
    },
    notes: {
        type: String,
        label: "Notes",
        optional: true,
        max: 1000
    },
    recurring: {
        type: Boolean,
        label: "Recurring",
        optional:true,
        autoform:
        {
          type: "switch",
          trueLabel: "Recurring",
          falseLabel: "One Time Project"
        }
    },
    company:{
      type: String
    }

});
Projects.attachSchema(ProjectsSchema);
Meteor.methods({
  deleteProject: function (projectId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Projects.remove(projectId);
    if (Meteor.isClient)
    {
        Materialize.toast('Project removed', 3000, 'yellow');
    }
  }
});