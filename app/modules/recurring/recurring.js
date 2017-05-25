if (Meteor.isClient) {
    Template.createRecurring.onCreated(function () {
        this.subscribe("recurring");
    });
    Template.createRecurring.helpers({
        "recurringSchema": function () {
            return RecurringSchema;
        }
    });
    Template.createRecurring.onRendered(function () {
        $("#cron").cronselector({ targetInput: "input[name=cron]" });
    });


    Template.recurring.onCreated(function () {
        this.subscribe("recurring");
        var sched = later.parse.recur().on(2).minute();

        // works perfectly
        console.log(later.schedule(sched).next());
    });

    Template.recurring.helpers({
        dates: function () {
            var dates = Recurring.find().fetch();
            for (var i in dates) {
                var next = later.parse.cron(dates[i].cron);
                dates[i].next = later.schedule(next).next();
            }
            return dates;
        }
    });

    Template.recurringDate.onCreated(function () {
        this.subscribe("recurring");
        this.subscribe("templates");
    })

    Template.recurringDate.helpers({
        'rdate': function () {
            var id = FlowRouter.getParam('dateId');
            var rdate = Recurring.findOne(id);
            if (rdate) {
                var next = later.parse.cron(rdate.cron);
                rdate.next = later.schedule(next).next();
                for (var t in rdate.templates) {
                    var temp = Templates.findOne(rdate.templates[t].tempId);
                    rdate.templates[t].title = temp.title;
                }
            }
            return rdate;
        },
        'dayHelper': function (daysAfter) {
            if (daysAfter == 1) {
                return "Day";
            }
            else {
                return "Days";
            }
        },
        'availTemps': function () {
            $('select').material_select();
            return Templates.find({ "owner": Meteor.userId() }).map(function (p) {
                return { label: p.title, value: p._id };
            });
        },
    })

    Template.recurringDate.onRendered(function () {
        $('select').material_select();
    })

    Template.recurringDate.events({
        "click .delete": function () {
            var id = FlowRouter.getParam("dateId");
            Recurring.update({ '_id': id }, { $pull: { 'templates': { tempId: this.tempId } } });
        }
    });

    var recHooks = {
        before: {
            insert: function (doc) {
                doc.owner = Meteor.userId();
                return doc;
            }
        },
        after: {
            insert: function (error, result) {
                if (!error) {
                    FlowRouter.go("/recurring/" + result);
                    Materialize.toast('Added Recurring Date!', 3000, 'green');
                }
                else {
                    Materialize.toast('Recurring Date creation failed. <br/>Please specified a reccurence', 5000, 'red');
                }
            },
            update: function (error, result) {
                if (!error) {
                    FlowRouter.go("/recurring/" + this.currentDoc._id);
                    Materialize.toast('Updated Recurring Date!', 3000, 'green');
                }
                else {
                    console.log(error);
                    Materialize.toast('Recurring Date update failed!', 5000, 'red');
                }
            }
        }
    }
    AutoForm.addHooks(['insertRecurringDate', 'updateRecurringDate'], recHooks);
}