/**************************************
Project Template
***************************************/
Template.project.onCreated(function(){
	this.subscribe('projects');
    this.subscribe('tasks');
});
function taskCursor(){
    var projectId = FlowRouter.getParam("projectId");
    var tasks =  Tasks.find({projectId:projectId}, {$sort:{order_num: -1}}).fetch();
    for (t in tasks)
    {
      var assigned = Meteor.users.findOne({"_id":tasks[t].assigned_to});
      if(assigned)
        tasks[t].assigned_to = assigned.profile.firstname + " " + assigned.profile.lastname;
    }
    return tasks;
}

Template.project.onRendered(function(){
  $(".conv-col").height($("body").height());
});
Template.project.helpers({
	project: function () {
		var projectId = FlowRouter.getParam("projectId"); 
		var project = Projects.findOne({_id:projectId});
		return project;
	},
	todo: taskCursor
});
Template.project.events({
	"submit .add-conv" : function(event){
		event.preventDefault();
		var conv = {
			text: event.target.text.value,
			projectId : FlowRouter.getParam("projectId")
		};
		event.target.text.value = "";
		Meteor.call("addConv", conv);
	},
	"click .done": function(){
      Meteor.call("markTaskDone",this._id,this.title,this.projectId);
   } 
});

/**************************************
Projects Template
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

Template.newproject.onRendered(function(){
    $("#cron").appendTo($("#recurring").parent().parent());
    $("#recurring").click(function(){
      $("#cron").toggle();
    });
    $('#cron').cron({
      onChange: function() {
          $("input[name='recurringOptions']").val($(this).cron("value"));
      },
      periods : ["day", "week", "month", "year"],
      useGentleSelect: false,
    });
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
Edit Project Template
***************************************/

Template.editproject.onRendered(function(){
    $("#cron").appendTo($("#recurring").parent().parent());
    $("#recurring").click(function(){
      $("#cron").toggle();
    });
    $('#cron').cron({
      onChange: function() {
          $("input[name='recurringOptions']").val($(this).cron("value"));
      },
      initial: $("input[name='recurringOptions']").val(),
      periods : ["day", "week", "month", "year"],
      useGentleSelect: false,
    });
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
            if(this.currentDoc.requestor == Meteor.userId)
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