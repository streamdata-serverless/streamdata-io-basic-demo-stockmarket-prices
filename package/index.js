exports.handler = (event, context, callback) => {
    
    // add EventSource dependency
    var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
    var AuthStrategy = require('streamdataio-js-sdk-auth');
    // add json patch dependency
    var jsonPatch = require('fast-json-patch');
    var print = require('node-print');
    
    function server()
    {
      // targetUrl is the JSON API you wish to stream
      // you can use this example API which simulates updating stocks prices from a financial market
      var targetUrl = 'http://stockmarket.streamdata.io/v2/prices';
    
      // appToken is the way Streamdata.io authenticates you as a valid user.
      // you MUST provide a valid token for your request to go through.
      var appToken = '[Your Streamdata.io Key]';
    
      eventSource = streamdataio.createEventSource(targetUrl, appToken, [], AuthStrategy.newSignatureStrategy(appToken, privateKey));
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
          print.printTable(result);
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
          // do whatever you wish with the update data
          print.printTable(result);
    
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