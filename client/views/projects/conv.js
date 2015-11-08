Template.conv.onCreated(function(){
	this.subscribe('convs');
});
Template.conv.helpers({
	convs: function(){
    	var projectId = FlowRouter.getParam("projectId");
		var convs =  Convs.find({projectId:projectId}, {sort: {date: -1}});
		return convs;
    }
});