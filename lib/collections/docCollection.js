Docs = new FS.Collection("docs", {
  stores: [new FS.Store.FileSystem("docs",{
  	filter:{ 
  	    allow: {
    		contentTypes: ['text/csv'],
      	    extensions: ['csv']
      	},
      	deny:{
      		contentTypes: ['*/*']
      	}
    },
  	transformWrite: function(fileObj, readStream,writeStream) {
  		var csv = '';
	  	readStream.on('data', function(chunk) {
		  csv += chunk.toString('utf8')
		});

		// when the stream ends, you have your csv file contents
		readStream.on('end', function() {
			try{
				var parsed = Baby.parse(csv);
		  		console.log(parsed.data);
			}
			catch(err)
			{
				console.log("parse err",err);
			}
		});
		readStream.pipe(writeStream);
	}
  })]
});

Docs.allow({
	insert:function(){
		return true;
	},
	update:function(){
		return true;
	}

})