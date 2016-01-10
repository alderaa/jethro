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
        allowedValues: ['Active','Completed','Hold','Maintenance'],
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
    company:{
      type: String
    },
    noEvaluation:{
        type: Boolean,
        label: "Project will not require an evaluation",

    },
    performance:{
        type:Array,
        maxCount: 10,
        optional: true,
    },
    "performance.$":{
        type: String,
        max: 100,
    },
    results:{
        type: Array,
        optional:true,
        maxCount: 10,
    },
    "results.$":{
        type:Number,
        min: 0,
        max: 5,
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