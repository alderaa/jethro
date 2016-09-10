Templates = new Mongo.Collection("templates");
SimpleSchema.debug = true;
var Helpers = {
  "employees": function(){
    return Meteor.users.find({},{$sort:-1}).map(function (c) {
        return {label: c.profile.firstname+" "+c.profile.lastname, value: c._id};
      });
  },
}
Templates.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
TemplatesSchema = new SimpleSchema({
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
    due_after: {
        type: Number,
        label: "# of Days Due After Recurring Date",
        min:0,
        max:30
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
    },
   'tasks': {
       type:Array,
       optional:true,
       maxCount:50
   },
   'tasks.$':{
       type:Object
   },
   'tasks.$.task_title': {
        type: String,
        label: "Title",
        max: 100
    },
    'tasks.$.task_description': {
        type: String,
        label: "Description",
        max: 300
    },
    'tasks.$.task_due_after': {
        type: Number,
        label: "# of Days Due After Project Start",
        min:0,
        max:30,
    },
    'tasks.$.task_assigned_to': {
        type: String,
        autoform: {
            type: 'select',
            options: 'allowed',
            skipLabel: true
        },
        optional:true
    },
    'tasks.$.task_assigned_by': {
        type: String,
        autoform: {
            type: 'hidden',
            options: 'allowed',
            skipLabel: true
        },
        denyUpdate: true,
        optional:true
    },
    'tasks.$.task_order_num': {
        type: Number,
        label: "Order Number",
        optional: true,
    },
    'tasks.$.task_notes': {
        type: String,
        label: "Notes",
        optional: true,
        max: 1000
    },

});
Templates.attachSchema(TemplatesSchema);
Meteor.methods({
  deleteTemplate: function (tempId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Templates.remove(tempId);
    if (Meteor.isClient)
    {
        Materialize.toast('Template removed', 3000, 'yellow');
    }
  }
});