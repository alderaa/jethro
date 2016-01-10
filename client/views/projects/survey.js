Template.survey.onCreated(function(){
    this.subscribe("projects");
});
Template.survey.events({
    'click .submit': function(){
        $( '[name^=result]' ).each(function(){
            if($(this).prop('checked')){
                console.log($(this).val()); 
            }
        });
    }
})
Template.survey.helpers({
   project: function(){
       return Projects.findOne(FlowRouter.getParam("projectId"));
   } 
});