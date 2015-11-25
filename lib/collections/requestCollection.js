Requests = new Mongo.Collection("requests");
var Helpers = {
  "employees": function(){
    return Meteor.users.find({}).map(function (c) {
        return {label: c.profile.firstname+" "+c.profile.lastname, value: c._id};
      });
  },
}
SimpleSchema.debug = true
Requests.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
RequestsSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100
    },
    requestor: {
      type: String,
      autoform:{
        type:"hidden"
      },
      optional: false // not working if not set
    },
    owner: {
      type: String,
      autoform: {
          type: 'select',
          options: Helpers.employees(),
          skipLabel: true
      },
      optional:false,
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
    notes: {
        type: String,
        label: "Notes",
        optional: true,
        max: 1000
    },
});
Requests.attachSchema(RequestsSchema);
Meteor.methods({
  deleteRequest: function (requestId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Requests.remove(requestId);
    if (Meteor.isClient)
    {
        toastr.success("Request removed","Saved!");
    }
  }
});