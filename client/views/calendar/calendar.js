function getEvents(){
    var projs = Projects.find({"owner":Meteor.userId()}).fetch();
    console.log(projs);
    var events = [];
    for(p in projs)
    {
        var event = {
            title: "Project '"+projs[p].title+ "' is due",
            start: projs[p].due_on,
        }
        events.push(event);
    } 
    return events;

};
Template.cal.onCreated(function(){
     this.subscribe('projects');
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