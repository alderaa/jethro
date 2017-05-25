FlowRouter.route('/issues', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'issues' });
    }
});

FlowRouter.route('/newissue', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'newissue' });
    }
});

FlowRouter.route('/editissue/:taskId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'editissue' });
    }
});

FlowRouter.route('/newrequest', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'newrequest' });
    }
});

FlowRouter.route('/myrequests', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'myrequests' });
    }
});

FlowRouter.route('/requestToProject/:requestId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'requestToProject' });
    }
});