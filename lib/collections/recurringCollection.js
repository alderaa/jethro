Recurring = new Mongo.Collection("recurring");
Recurring.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
RecurringSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 100
    },
    description: {
        type: String,
        label: "Description",
        max: 300,
        optional: true
    },
    owner: {
        type: String
    },
    cron: {
        type: String,
        autoform: {
            type: "hidden"
        }
    },
    templates: {
        type: Array,
        optional: true
    },
    'templates.$': {
        type: Object
    },
    'templates.$.tempId': {
        type: String,
        label: 'Project Template',
        autoform: {
            label: true,
            type: "select",
            options: 'allowed',
        }
    },
    'templates.$.daysAfter': {
        type: Number,
        label: "# of days after date before project added",
        min: 0,
        max: 30,
    }
});
Recurring.attachSchema(RecurringSchema);
