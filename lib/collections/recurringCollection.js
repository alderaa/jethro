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
    owner:{
        type:String
    },
    cron:{
        type: String,
        autoform:{
            type: "hidden"
        }
    }
});
Recurring.attachSchema(RecurringSchema);
