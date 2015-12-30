/**************************************
Projects events
***************************************/
Template.projects.onCreated(function(){
	 this.subscribe('projects');
});
function projectsCursor(){
    var projects = Projects.find({"owner": Meteor.user()._id}, {sort: {createdAt: -1}}).fetch();
    for(var i in projects){
        var req =  Meteor.users.findOne({_id:projects[i].requestor}).profile;
        projects[i].requestor = req.firstname+" "+req.lastname;
    }
    return projects;
}
Template.projects.onRendered(function(){
});
Template.projects.helpers({
	projects: projectsCursor
});