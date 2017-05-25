if( Meteor.isClient){
	Template.home.onRendered(function () {
        $('.modal').modal();
        if (Meteor.user()) {
            if (!Meteor.user().profile.activeCompany) {
                $('#modal1').open("modal");
            }
        }
    });
}