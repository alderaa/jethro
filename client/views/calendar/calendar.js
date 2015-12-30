function getEvents(){
    var events = [];
    var projs = Projects.find({"owner":Meteor.userId()}).fetch();
    for(p in projs)
    {
        var event = {
            title: "Project '"+projs[p].title+ "' is due",
            start: projs[p].due_on,
            url: "/project/"+projs[p]._id,
            className: "blue"
        }
        events.push(event);
    } 
    var tasks = Tasks.find({'assigned_to':Meteor.userId(),'completed_on':{$exists:false}}).fetch();
    for(var t in tasks)
    {
        var event = {
            title: "Task '"+tasks[t].title+ "' is due",
            start: tasks[t].due_on,
            url: "/project/"+tasks[t].projectId,
            className: "green"
        }
        if(tasks[t].isIssue)
        {
           event.className = "orange";
           event.title = "Issue '"+tasks[t].title+ "' is due";
           event.url = "/editissue/"+tasks[t]._id;
        }
        events.push(event);
    } 
    console.log(events);
    return events;

};
Template.cal.onCreated(function(){
     this.subscribe('projects');
     this.subscribe('tasks');
});
Template.cal.helpers({
    calendarOptions: {
        events: function(start, end, timezone, callback) {
            //console.log(start);
            //console.log(end);
            //console.log(timezone);
            var events = getEvents();
 
            // events need to be an array of subDocuments:
            // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
        
            callback(events);
        },
    }
});