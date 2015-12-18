Template.adminmenu.events({
  'change .modEmps': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Docs.insert(file, function (err, fileObj) {
         if(err)
         {
         	Materialize.toast('File Upload Failed', 10000, 'red');
         }
         else
         {
         	console.log(fileObj);
         }
      });
    });
  }
});
