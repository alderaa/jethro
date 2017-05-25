FlowRouter.route('/newproject', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'newproject' });
    }
});

FlowRouter.route('/projects', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'active' });
    }
});
FlowRouter.route('/projects/completed', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'completed' });
    }
});
FlowRouter.route('/projects/hold', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'hold' });
    }
});
FlowRouter.route('/projects/maintain', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'maintain' });
    }
});

FlowRouter.route('/editproject/:projectId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'editproject' });
    }
});

FlowRouter.route('/project/:projectId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'project' });
    }
});

FlowRouter.route('/project/survey/:projectId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'survey' });
    }
});

FlowRouter.route('/newtask/:projectId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'newtask' });
    }
});

FlowRouter.route('/edittask/:taskId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'edittask' });
    }
});