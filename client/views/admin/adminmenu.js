Template.adminmenu.events({
  'change .modEmps': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      file = new FS.File(file);
      file.owner = Meteor.userId();
      Docs.insert(file, function (err, fileObj) {
         if(err)
         {
         	  $(".modEmps").val("");
         }
         else
         {
            $(".modEmps").val("");
            $(".file-path").val("");
            Materialize.toast('Employees updated successfully!', 3000, 'green');
         }
      });
    });
  }
});
