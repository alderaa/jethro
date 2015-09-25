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
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};