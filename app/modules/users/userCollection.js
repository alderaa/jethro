UsersSchema = new SimpleSchema({
  'email': {
    type: String,
    label: "email",
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      label: true,
      type: "email",
    }
  },
  'password': {
    type: String,
    label: "Password",
    autoform: {
      label: true,
      type: "password",
    }
  },
  'profile': {
    type: Object,
  },
  'profile.firstname': {
    type: String,
    label: "First Name",
    max: 100,
  },
  'profile.lastname': {
    type: String,
    label: "Last Name",
    max: 100,
  },
  'profile.birthday': {
    type: Date,
    label: 'Birthday',
    autoform: {
      type: 'pickadate'
    }
  },
  'roles': {
    type: [String],
    autoform: {
      type: "select-multiple",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Employee", value: "employee" },
      ]
    }
  },
  'group': {
    type: String,
    label: 'Company',
    optional: true
  }

});
Meteor.methods({
  'registerUser': function (doc) {
    check(doc, UsersSchema);
    var id = Accounts.createUser(doc);
    if (Meteor.isServer && id != undefined) {
      Roles.addUsersToRoles(id, doc.roles, doc.group);
    }
    return id;
  },
  'setCompany': function (company) {
    companies = Roles.getGroupsForUser(Meteor.userId());
    if (companies.indexOf(company) > -1) {
      Meteor.users.update({ '_id': Meteor.userId() }, { $set: { 'profile.activeCompany': company } }, function (err) {
        if (err) console.log(err);
      });
    }
    else {
      Meteor.users.update({ '_id': Meteor.userId() }, { $set: { 'profile.activeCompany': '' } }, function (err) {
        if (err) console.log(err);
      });
    }

  }
});