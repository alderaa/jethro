/**************************************
New Project Events
***************************************/

Template.newproject.onRendered(function(){
    $('select').material_select();
});

Template.requestToProject.onCreated(function(){
    this.subscribe("requests");
});

Template.requestToProject.helpers({
  request:function(){
    return Requests.findOne({_id:FlowRouter.getParam("requestId")});
  }
})

/**************************************
Edit Project Events
***************************************/

Template.editproject.onRendered(function(){
    $('select').material_select();
});

Template.editproject.onCreated(function(){
	 this.subscribe('projects');
});

Template.editproject.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:projectId});
		return project;
	}
});

var projHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.owner = Meteor.userId();
        doc.created_on = new Date();
        return doc;
      }
    }
  },
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(error, result) {
    	if(!error)
    	{
        Meteor.call('scheduleRecurringProject', result, true, function (error) {
          if (error) console.log("Couldn't add recurring project")
        });
        if(this.formId === 'insertReqToProject')
        {
            var notif = {
                url: '/project/'+this.docId,
                text: "Request '" + this.currentDoc.title + "' made into project",
            }
            if(this.currentDoc.requestor == Meteor.userId())
            {
              notif.user = this.currentDoc.requestor;
            }
            Meteor.call("addNotif", notif);
            Meteor.call("deleteRequest", FlowRouter.getParam('requestId'));
        }
    		FlowRouter.go("/project/"+this.docId);
    		Materialize.toast('Added project!', 3000, 'green');
    	}
    },
    update: function(error, result) {
    	if(!error)
    	{
        Meteor.call('updateRecurringProject', this.docId, true, function (error) {
          if (error) console.log("Couldn't add recurring project")
        });
    		FlowRouter.go("/project/"+this.currentDoc._id);
    		Materialize.toast('Updated project!', 3000, 'green');
    	}
    },
  },
};
AutoForm.addHooks(['insertProject','updateProject','insertReqToProject'], projHooks);