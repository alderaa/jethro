Template.login.events({
  'submit #login' : function(e, t){
    e.preventDefault();
    // retrieve the input field values
    var email = event.target.email.value;
    var password = event.target.password.value;
    
      // Trim and validate your fields here.... 

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(email, password, function(err){
        if (err)
          toastr.error("Bad username or password","Error");
        else
        {
          $('.modal-backdrop ').hide();
          FlowRouter.go("/");
        }
      });
      return false; 
    }
});

Template.register.events({
  'submit #register-form' : function(e, t) {
    e.preventDefault();
    var options = {
        email: event.target.email.value,
        password: event.target.password.value,
        profile: {
            firstname: event.target.firstname.value,
            lastname:  event.target.lastname.value,
            birthday:  event.target.birthday.value,
        },
    };
    Accounts.createUser( options , function(err){
        if( err ){
          toastr.error(err.message)
        }
         
    });
  }
});

Template.profile.helpers({
  "user": function(){
      return Meteor.user();
  }
});