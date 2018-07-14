exports.handler = (event, context, callback) => {
    
    // Streamdata Dependencies
    var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
    var AuthStrategy = require('streamdataio-js-sdk-auth');
    
    // All The Other Dependencies
    var jsonPatch = require('fast-json-patch');
    var print = require('node-print');
    var AWS = require('aws-sdk');
    var dateTime = require('node-datetime');
    
    // Function for writing to S3
    function putObjectToS3(s3bucket, s3key, data){
    var s3 = new AWS.S3();
        var params = {
            Bucket : s3bucket,
            Key : s3key,
            Body : data
        }
        s3.putObject(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
        }
    
    function server()
    {
      // targetUrl is the JSON API you wish to stream
      var targetUrl = process.env.targetUrl;
      
      // s3bucket i sthe bucket you wish write data into
      var s3bucket = process.env.s3bucket;
      
      // targetFolder is the folder you wish to write data into
      var targetFolder = process.env.targetFolder;
      
      // appToken is the Streamdata.io token
      var appToken = process.env.appToken;
      
      var privateKey = '';
    
      var eventSource = streamdataio.createEventSource(targetUrl, appToken, [], AuthStrategy.newSignatureStrategy(appToken, privateKey));
      var result = [];
    
      eventSource
      // the standard 'open' callback will be called when connection is established with the server
        .onOpen(function ()
        {
          console.log("connected!");
        })
        // the streamdata.io specific 'data' event will be called when a fresh Json data set
        // is pushed by Streamdata.io coming from the API
        .onData(function (data)
        {
          console.log("data received");
          // memorize the fresh data set
          
          result = data;
          console.log(result);
          
          //putObjectToS3(s3bucket, s3key, result);
          
          // write file name with time stamp
          var dt = dateTime.create();
          var formatted = dt.format('Y-m-d-H-M-S');
          var file = targetFolder + formatted + '.json';
          
          // put the entire result to S3
          putObjectToS3(s3bucket, file, JSON.stringify(result));
          
        })
        // the streamdata.io specific 'patch' event will be called when a fresh Json patch
        // is pushed by streamdata.io from the API. This patch has to be applied to the
        // latest data set provided.
        .onPatch(function (patch)
        {
          // display the patch
          console.log("patch: ", patch);
          
          // apply the patch to data using json patch API
          jsonPatch.applyPatch(result, patch);
          
          // write file name with time stamp
          var dt = dateTime.create();
          var formatted = dt.format('Y-m-d-H-M-S');
          var file = targetFolder + formatted + '.json';
       
          // put the entire result to S3
          putObjectToS3(s3bucket, file, JSON.stringify(result));
    
        })
    
        // the standard 'error' callback will be called when an error occur with the evenSource
        // for example with an invalid token provided
        .onError(function (error)
        {
          console.log('ERROR!', error);
          eventSource.close();
    
        });
    
      eventSource.open();
    
    }
    
    console.log('starting');
    server();

    // TODO implement
    callback(null, 'Hello from Lambda');
};