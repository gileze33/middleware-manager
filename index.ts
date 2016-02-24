class MiddlewareManager {
  middleware = {} as {[name: string]: Function};

  retrieve(identifier: string): Function {
    // retrieve a single method
    var output = this.middleware[identifier];

    if (!output) {
      throw new Error(`Middleware named ${identifier} not found`);
    }

    return output;
  }

  register(identifier: string, method: MiddlewareManager.Middleware);
  register(identifier: string, method: (...args: any[]) => MiddlewareManager.Middleware);
  register(identifier: string, method: Function) {
    if (this.middleware[identifier]) {
      throw new Error(`Middleware named ${identifier} already registered`);
    }

    this.middleware[identifier] = method;
  }
  get(identifier: string, args?: any[]): MiddlewareManager.Middleware;
  get(identifier: string[], args?: any[]): MiddlewareManager.Middleware[];
  get(identifiers: string | string[], args?: any[]): MiddlewareManager.Middleware | MiddlewareManager.Middleware[] {
    if (args) {
      if (Array.isArray(identifiers)) {
        // return an array
        return identifiers.map(identifier => this.retrieve(identifier).apply(null, args) as MiddlewareManager.Middleware);
      }

      // returning a single piece
      return this.retrieve(identifiers as string).apply(null, args) as MiddlewareManager.Middleware;
    }

    if (Array.isArray(identifiers)) {
      // return an array
      return identifiers.map(identifier => this.retrieve(identifier) as MiddlewareManager.Middleware);
    }

    // returning a single piece
    return this.retrieve(identifiers as string) as MiddlewareManager.Middleware;
  }
}

module MiddlewareManager {
  export interface Middleware {
    (req, res): void;
    (req, res, next): void;
  }
}

export = MiddlewareManager;
