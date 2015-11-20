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

Template.registerHelper( "isloginPage", function() {
  return (window.location.pathname == '/login')
});

Template.mainLayout.onCreated( function(){
  this.subscribe("notifs");
});
Template.mainLayout.rendered = function(){
	$(function () { 
    $("[data-toggle='tooltip']").tooltip({delay: 0}); 
    $(".dropdown-button").dropdown();
  });

};

Template.dashboard.rendered = function(){
  $(function () { 
    $("[data-toggle='tooltip']").tooltip({delay: 0}); 
  });

};
Template.mainLayout.helpers({
  "notifs": function(){
    var notifs =  Notifs.find({"user":Meteor.user()._id}).fetch().reverse();
    return notifs;
  },
  "newNotifCount": function(){
    var count =  Notifs.find({"user":Meteor.user()._id,"seen":false}).count();
    if(count === 0)
    {
      count = "";
    }
    return count;
  },

});
Template.mainLayout.events({
	"click .logout": function(){
		Meteor.logout();
	},
  "click #notifs": function(){
    Meteor.call("seenNotifs");
  }
});

Template.registerHelper( "employees" , function(){
	return Meteor.users.find({}).map(function (c) {
      return {label: c.profile.firstname+" "+c.profile.lastname, value: c._id};
    });
});