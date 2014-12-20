#Middleware Manager

Provides a super simple getter/setter interface to stop you having to actually *require* files and know the exact path when you need some middleware

##Basic Interface
```
var manager = new MiddlewareManager();
manager.register("name-to-use-as-identifier", function(req, res, next) {

});

// elsewhere
var myFunc = manager.get("name-to-use-as-identifier");
```

##Usage with an express app
This is a very simple example. See the code for easy-server on npm for a more in depth example (although you can probably work out how it can make structuring your app a bit easier already).
```
// my-auth-middleware.js
module.exports = function(req, res, next) { /* do something */ };
```
```
// account-controller.js
module.exports = function(app) {
    app.get('/my-account', app.get('middleware-manager')('auth'), function() {
        res.send('Hi there');
    });
};
```
```
// server.js
var manager = new MiddlewareManager();
manager.register("auth", require('./my-auth-middleware'));

var app = require('express')();
app.set('middleware-manager', manager);

require('./account-controller')(app);
```