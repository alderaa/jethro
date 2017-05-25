FlowRouter.triggers.enter( [ function(){
    if(!Meteor.userId())
    {
        FlowRouter.go("/");
    }
}]);

FlowRouter.route('/', {
    triggersEnter: [function(){
        if(Meteor.userId())
        {
            FlowRouter.go("/dashboard");
        }
    }],
    action: function (params) {
        BlazeLayout.render("home", { content: 'home' });
    }
});

FlowRouter.route('/dashboard', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'dashboard' });
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