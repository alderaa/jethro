Meteor.subscribe("allUsers");
AutoForm.setDefaultTemplate('materialize');
Template.registerHelper('formatDateTime', function(date) {
  if(date)
    return moment(Date.parse(date)).format('MM/DD/YYYY h:mm A');
});
Template.registerHelper('formatDate', function(date) {
  if(date)
    return moment(Date.parse(date)).format('MM/DD/YYYY');
});
Template.registerHelper("checkedIf",function(value){
  return value ? "checked":"";
});
Template.registerHelper("today",function(value){
  return moment(new Date()).format('MM/DD/YYYY h:mm A');
});

Template.registerHelper("selectedIfEquals",function(left,right){
  return left==right ? "selected":"";
});

Template.registerHelper( "isReady", function(sub) {
      if(sub) {
        return FlowRouter.subsReady(sub);
      } else {
        return FlowRouter.subsReady();
      }
});

Template.mainLayout.rendered = function(){
	$(function () { 
    $("[data-toggle='tooltip']").tooltip(); 
  });

};

Template.mainLayout.events({
	"click .logout": function(){
		Meteor.logout();
	}
});

Template.registerHelper( "employees" , function(){
	return Meteor.users.find({}).map(function (c) {
      return {label: c.profile.firstname, value: c._id};
    });
});