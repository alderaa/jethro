Requests = new Mongo.Collection("requests");
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
        autoform: {
            type: "hidden"
        },
        optional: false // not working if not set
    },
    owner: {
        type: String,
        autoform: {
            type: 'select',
            skipLabel: true
        },
        optional: false,
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
    company: {
        type: String,
    },
});
Requests.attachSchema(RequestsSchema);
Meteor.methods({
    deleteRequest: function (requestId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Requests.remove(requestId);
    }
});