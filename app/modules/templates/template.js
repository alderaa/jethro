if (Meteor.isClient) {
    Template.templates.onCreated(function () {
        this.subscribe("templates");
    });
    Template.template.onCreated(function () {
        this.subscribe("templates");
    });
    Template.createtemplate.onCreated(function () {
        this.subscribe("templates");
    });
    Template.createTemplateTask.onCreated(function () {
        this.subscribe("templates");
    });
    Template.updateTemplateTask.onCreated(function () {
        this.subscribe("templates");
    })

    Template.templates.helpers({
        'templates': function () {
            return Templates.find({ "owner": Meteor.userId() });
        },
    });
    Template.template.helpers({
        'template': function () {
            return Templates.findOne(FlowRouter.getParam('tempId'));
        }
    });
    Template.createTemplateTask.helpers({
        'template': function () {
            return Templates.findOne(FlowRouter.getParam('tempId'));
        }
    });
    Template.updateTemplateTask.helpers({
        "getTaskName": function (name) {
            var temp = Templates.findOne(FlowRouter.getParam('tempId'));
            if (temp) {
                var num = 0;
                var orderNum = FlowRouter.getParam("orderNum");
                for (var i in temp.tasks) {
                    if (temp.tasks[i].task_order_num === orderNum) {
                        num = i;
                    }
                }
            }
            return 'tasks.' + num + '.' + name;
        }
    })

    Template.template.events({
        "click .delete": function () {
            var id = FlowRouter.getParam('tempId');
            Templates.update({ '_id': id }, { $pull: { 'tasks': { task_order_num: this.task_order_num } } });
        }
    });


    var tempHooks = {
        before: {
            insert: function (doc) {
                if (Meteor.userId()) {
                    doc.owner = Meteor.userId();
                    doc.company = Meteor.user().profile.activeCompany;
                    return doc;
                }
            },
            update: function (doc) {
                if (Meteor.userId() == this.currentDoc.owner) {
                    return doc;
                }
                else {
                    Materialize.toast("An error occured updating your project", "red", 3000);
                }
            }
        },
        after: {
            // Replace `formType` with the form `type` attribute to which this hook applies
            insert: function (error, result) {
                if (!error) {
                    //Meteor.call('scheduleRecurringProject', result, true, function (error) {
                    if (error) console.log("Couldn't add project template.")
                    FlowRouter.go("/template/" + this.docId);
                    Materialize.toast('Added Template!', 3000, 'green');
                }
            },
            update: function (error, result) {
                if (!error) {
                    FlowRouter.go("/template/" + this.currentDoc._id);
                    Materialize.toast('Updated template!', 3000, 'green');
                }
            },
        },
    };
    AutoForm.addHooks(['insertTemplate', 'updateTemplate'], tempHooks);
}