app.global = {
 init: function () { // Loads all global functions here
  console.log('load flobal functions');
  app.global.loadHeader();
 },
 loadHeader: function () { // Some Specific function
  console.log('loadHeader()');
 }
}

// Run the global stuff
app.global.init();
