FlowRouter.route('/', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'dashboard' });
    }
});

FlowRouter.route('/home', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'home' });
    }
});

FlowRouter.route('/calendar', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'cal' });
    }
});

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render("mainLayout", { content: 'notfound' });
    }
};