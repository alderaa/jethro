FlowRouter.route('/', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'dashboard'});
  }
});

FlowRouter.route('/home', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'home'});
  }
});

FlowRouter.route('/login', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'login'});
  }
});

FlowRouter.route('/login', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'login'});
  }
});

FlowRouter.route('/register', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'register'});
  }
});

FlowRouter.route('/profile', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'profile'});
  }
});

FlowRouter.route('/newproject', {
  action: function(params) {
  	BlazeLayout.render("mainLayout", { content: 'newproject'});
  }
});

FlowRouter.route('/projects', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'projects'});
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

FlowRouter.route('/newrequest', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'newrequest'});
  }
});

FlowRouter.route('/myrequests', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'myrequests'});
  }
});

FlowRouter.route('/requestToProject/:requestId', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'requestToProject'});
  }
});

FlowRouter.route('/calendar', {
  action: function(params) {
    BlazeLayout.render("mainLayout", { content: 'cal'});
  }
});

FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
      BlazeLayout.render("mainLayout", { content: 'notfound'});
    }
};
