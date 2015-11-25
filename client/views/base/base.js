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
Template.registerHelper("currentEmail",function(){
  return Meteor.user().emails[0].address;
});

Template.mainLayout.onCreated( function(){
  this.subscribe("notifs");
});
Template.mainLayout.onRendered(function(){
    $(".dropdown-button").dropdown();
    $(".tooltop").dropdown();
    $("#slide-out li a").click(function(){
      $('.button-collapse').sideNav('hide');
    });
    $('.button-collapse').sideNav();
    $('.tooltipped').tooltip({delay: 50});

});

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