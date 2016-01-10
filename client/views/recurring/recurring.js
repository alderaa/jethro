Template.createRecurring.onCreated(function(){
    this.subscribe("recurring");
});
Template.createRecurring.helpers({
    "recurringSchema": function(){
        return RecurringSchema;
    }
});
Template.createRecurring.onRendered(function(){
   $( "#cron" ).cronselector({targetInput : "input[name=cron]"});
});


Template.recurring.onCreated(function(){
    this.subscribe("recurring");
    var sched = later.parse.recur().on(2).minute();

  // works perfectly
  console.log(later.schedule(sched).next());
});
Template.recurring.helpers({
    dates: function(){
        var dates = Recurring.find().fetch();
        for(var i in dates){
            var next = later.parse.cron(dates[i].cron);
            dates[i].next = later.schedule(next).next();
        }
        return dates;
    }
});

var recHooks = {
    before: {
        insert: function(doc){      
            doc.owner = Meteor.userId();
            return doc;
        }
    },
    after:{
        insert: function(error, result){
            FlowRouter.go("/recurring");
    		Materialize.toast('Added Recurring Date!', 3000, 'green');
        },
        update: function(error, result){
            FlowRouter.go("/");
    		Materialize.toast('Updated Recurring Date!', 3000, 'green');
        }
    }
}
AutoForm.addHooks(['insertRecurringDate','updateRecurringDate'], recHooks);