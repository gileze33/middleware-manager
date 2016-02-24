class MiddlewareManager {
  middleware = {} as {[name: string]: MiddlewareManager.Middleware};

  retrieve(identifier: string): MiddlewareManager.Middleware {
    // retrieve a single method
    var output = this.middleware[identifier];

    if (!output) {
      throw new Error(`Middleware named ${identifier} not found`);
    }

    return output;
  }
  register(identifier: string, method: MiddlewareManager.Middleware) {
    if (this.middleware[identifier]) {
      throw new Error(`Middleware named ${identifier} already registered`);
    }

    this.middleware[identifier] = method;
  }
  get(identifier: string): MiddlewareManager.Middleware;
  get(identifier: string[]): MiddlewareManager.Middleware[];
  get(identifiers: string | string[]): MiddlewareManager.Middleware | MiddlewareManager.Middleware[] {
    if (Array.isArray(identifiers)) {
      // return an array
      return identifiers.map(identifier => this.retrieve(identifier));
    }

    // returning a single piece
    return this.retrieve(identifiers as string);
  }
}

module MiddlewareManager {
  export interface Middleware {
    (req, res): void;
    (req, res, next): void;
  }
}

export = MiddlewareManager;
