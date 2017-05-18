Convs = new Mongo.Collection("convs");

Meteor.methods({
    addConv: function (conv) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        if (conv.text) {
            conv.user = Meteor.user().profile.firstname + " " + Meteor.user().profile.lastname;
            conv.date = new Date();
            Convs.insert(conv);
        }
    }
});