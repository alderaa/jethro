BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'dashboard'});
  }
});

FlowRouter.route('/newproject', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'newproject'});
  }
});

FlowRouter.route('/editproject/:projectId', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'editproject'});
  }
});

FlowRouter.route('/project/:projectId', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'project'});
  }
});

FlowRouter.route('/newtask/:projectId', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'newtask'});
  }
});

FlowRouter.route('/edittask/:taskId', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'edittask'});
  }
});
