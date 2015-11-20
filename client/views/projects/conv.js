Template.conv.onCreated(function(){
	this.subscribe('convs');
});
Template.conv.onRendered(function(){
	$('.conv-button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
    }
  );
});
Template.conv.helpers({
	convs: function(){
    	var projectId = FlowRouter.getParam("projectId");
		  var convs =  Convs.find({projectId:projectId}, {sort: {date: -1}});
		  return convs;
    }
});