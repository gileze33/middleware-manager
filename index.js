var MiddlewareManager = function() {
    this.middleware = {};

    return this;
};

MiddlewareManager.prototype.retrieve = function(identifier) {
    // retrieve a single method
    var output = this.middleware[identifier];
        
    if(!output) {
        throw new Error('Middleware named ' + identifier + ' not found');
    }
    
    return output;
};

MiddlewareManager.prototype.register = function(identifier, method) {
    if(this.middleware[identifier]) {
        throw new Error('Middleware named ' + identifier + ' already registered');
    }
    
    this.middleware[identifier] = method;
};

MiddlewareManager.prototype.get = function(identifier) {
    if(typeof(identifier) !== 'string') {
        // return an array
        var output = [];
        
        for(var i=0; i<identifier.length; i++) {
            output.push(this.retrieve(identifier[i]));
        }
        
        return output;
    }
    else {
        // returning a single piece
        return this.retrieve(identifier);
    }
};

module.exports = MiddlewareManager;