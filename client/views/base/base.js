Meteor.subscribe("projects");
Meteor.subscribe("tasks");
Meteor.subscribe("convs");
Meteor.subscribe("allUsers");
Template.registerHelper('formatDateTime', function(date) {
  return date.format('mm/dd/yyyy h:MM TT');
});
Template.registerHelper('formatDate', function(date) {
  return date.format('mm/dd/yyyy');
});
Template.registerHelper("checkedIf",function(value){
  return value ? "checked":"";
});
Template.registerHelper("today",function(value){
  return new Date().format("mm/dd/yyyy h:MM TT");
});

Template.registerHelper("selectedIfEquals",function(left,right){
  return left==right ? "selected":"";
});

Template.mainLayout.rendered = function(){
	$(function () { $("[data-toggle='tooltip']").tooltip(); });
};

Template.mainLayout.events({
	"click .logout": function(){
		Meteor.logout();
	}
});

Template.registerHelper( "employees" , function(){
	return Meteor.users.find({});	
});