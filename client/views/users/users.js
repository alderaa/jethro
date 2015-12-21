Template.login.events({
  'keypress input': function(e,t){
    if(e.charCode == 13)
    {
      $("#login").click();
    }
  },
  'submit #login' : function(e, t){
    e.preventDefault();
    // retrieve the input field values
    var email = event.target.email.value;
    var password = event.target.password.value;
    var company = event.target.company.value;
    
      // Trim and validate your fields here.... 

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(email, password, function(err){
        if (err)
        {
          Materialize.toast("Bad username or password", 3000, 'red');
        }
        else
        {
          $('body').hide();
          Meteor.call('setCompany',company);
          window.location = Meteor.absoluteUrl();
        }
      });
      return false; 
    }
});
Template.register.onRendered(function() {
   $('select').removeClass('browser-default');
   $('select').material_select();
});
Template.register.helpers({
  userSchema: function() {
    return UsersSchema;
  }
});
Template.profile.helpers({
  "user": function(){
      return Meteor.user();
  }
});
Template.switchcompany.onRendered(function(){
  $('select').material_select();
});
Template.switchcompany.helpers({
  'companies': function()
  {
    return Roles.getGroupsForUser(Meteor.userId());
  }
})
Template.switchcompany.events({
  'change select': function(e){
    Meteor.call('setCompany',$('select').val());
    window.location = Meteor.absoluteUrl();
  }
})