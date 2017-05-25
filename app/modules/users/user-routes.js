FlowRouter.route('/login', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'login' });
    }
});

FlowRouter.route('/register', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'register' });
    }
});

FlowRouter.route('/profile', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'profile' });
    }
});

FlowRouter.route('/admin', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'adminmenu' });
    }
});