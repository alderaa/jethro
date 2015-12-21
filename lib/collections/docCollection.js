Docs = new FS.Collection("docs", {
  stores: [new FS.Store.FileSystem("docs",{
  	transformWrite: function(fileObj, readStream,writeStream) {
  		var csv = '';
  		console.log(fileObj);
	  	readStream.on('data', function(chunk) {
		  csv += chunk.toString('utf8')
		});

		// when the stream ends, you have your csv file contents
		readStream.on('end', Meteor.bindEnvironment(function() {
			var currentUser = Meteor.users.findOne({_id:fileObj.owner});
			try{
				var users = Baby.parse(csv).data;
				for(var user in users)
				{
					if(user > 0)
					{
						try
						{
							var email = users[user][2];
							var tempPassword = Random.secret(15);  
							var doc =
							{
								email : email,
								password: tempPassword,
								profile:{
									firstname: users[user][0],
									lastname: users[user][1],
									birthday: new Date(users[user][3])
								},
								roles:[users[user][4]],
								group: currentUser.profile.activeCompany
							}
							Meteor.call('createTempPassword', doc);
						}
						catch(err)
						{
							console.log(err);
						}

					}
				}
			}
			catch(err)
			{
				console.log("parse err",err);
			}
		}));
		readStream.pipe(writeStream);
	}
  })],
  filter: {
    allow: {
      contentTypes: ['text/csv'],
      extensions: ['csv']
    },
    onInvalid: function (message) {
      if (Meteor.isClient) {
        Materialize.toast(message, 10000, 'red');
      } else {
        console.log(message);
      }
    }
  },
});

Docs.allow({
	insert:function(){
		return true;
	},
	update:function(){
		return true;
	}

})