FlowRouter.route('/templates', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'templates' });
    }
});

FlowRouter.route('/createtemplate', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'createtemplate' });
    }
});

FlowRouter.route('/template/:tempId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'template' });
    }
});

FlowRouter.route('/createtemplatetask/:tempId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'createTemplateTask' });
    }
});

FlowRouter.route('/updateTemplateTask/:tempId/:orderNum', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'updateTemplateTask' });
    }
});

FlowRouter.route('/recurring', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'recurring' });
    }
});

FlowRouter.route('/createrecurring', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'createRecurring' });
    }
});

FlowRouter.route('/recurring/:dateId', {
    action: function (params) {
        BlazeLayout.render("mainLayout", { content: 'recurringDate' });
    }
});