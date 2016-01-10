/**************************************
New Project Events
***************************************/

Template.newproject.onRendered(function(){
    $('select').material_select();
});
Template.newproject.events({
   'click input[name="noEvaluation"]': function(){
       if($('input[name="noEvaluation"]').prop( "checked" ))
       {
           $('.collection-item input').prop('disabled', true);
       }
       else{
           $('.collection-item input').prop('disabled', false);
       }
   } 
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
Template.editproject.events({
   'click input[name="noEvaluation"]': function(){
       if($('input[name="noEvaluation"]').prop( "checked" ))
       {
           $('.collection-item input').prop('disabled', true);
       }
       else{
           $('.collection-item input').prop('disabled', false);
       }
   } 
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
        doc.company = Meteor.user().profile.activeCompany;
        return doc;
      }
    },
    update: function(doc){
        if(Meteor.userId() == this.currentDoc.owner){
            return doc;
        }
        else{
            Materialize.toast("An error occured updating your project", "red", 3000);
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
            var proj = Projects.findOne(this.currentDoc._id);
            if(proj.status == "Completed")
            {
                FlowRouter.go("/project/survey/"+this.currentDoc._id);
            }
            else{ 
    		    FlowRouter.go("/project/"+this.currentDoc._id);
            }
    		Materialize.toast('Updated project!', 3000, 'green');
    	}
    },
  },
};
AutoForm.addHooks(['insertProject','updateProject','insertReqToProject'], projHooks);