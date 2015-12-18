/**************************************
Projects events
***************************************/
Template.projects.onCreated(function(){
	 this.subscribe('projects');
});
function projectsCursor(){
    var projects = Projects.find({"owner": Meteor.user()._id}, {sort: {createdAt: -1}});
    return projects;
}
Template.projects.onRendered(function(){
});
Template.projects.helpers({
	projects: projectsCursor
});