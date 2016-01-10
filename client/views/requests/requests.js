Template.requestBody.onRendered(function(){
    $(".collapsible").collapsible({
        accordion: true
    });
});
Template.myRequestBody.onRendered(function(){
    $(".collapsible").collapsible({
        accordion: true
    });
});
Template.myrequests.helpers({
    "requests": function(){
        var requests = Requests.find({"requestor": Meteor.userId()}, {sort: {createdAt: -1}}).fetch();
        for(r in requests){
          var owner = Meteor.users.findOne({"_id":requests[r].owner});
          requests[r].ownerName = owner.profile.firstname + " " + owner.profile.lastname;
        }
        return requests;
    }
});
Template.myrequests.events({
    "click .deleteRequest": function(){
        Meteor.call('deleteRequest',this._id);
        Materialize.toast('Removed Request', 3000, 'red');
    }
});
var requestHooks = {
  before: {
    insert: function(doc) {
    	doc.requestor = Meteor.userId();
        doc.company = Meteor.user().profile.activeCompany;
    	return doc;
    }
  },
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/myrequests");
    		Materialize.toast('Added Request!', 3000, 'green')
    	}
    },
    update: function(error, result) {
    	if(!error)
    	{
    		FlowRouter.go("/myrequests");
    		Materialize.toast('Updated Request!', 3000, 'green')
    	}
    },
  },
};
AutoForm.addHooks(['insertRequest','updateRequest'], requestHooks);