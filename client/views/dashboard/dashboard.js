Template.dashboard.helpers({
	projects: function () {
	  return Projects.find({}, {sort: {createdAt: -1}});
	},
    fields:[
    	{'key':'title','label':'Title', tmpl:Template.projectLink},
    	{'key':'description','label':'Description'},
    	{'key':'created_on','label':'Created On'},
    	{'key':'due_on','label':'Due On', sortOrder: 0, sortDirection: 'ascending'},
    	{'key':'_id','label':'Actions', 'tmpl':Template.Actions}
    ]
});

Template.dashboard.events({
	"click .delete": function () {
      Meteor.call("deleteProject",this._id);
    }
});