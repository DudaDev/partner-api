/* eslint-disable max-classes-per-file */

class Config {
  user?: string;

  pass?: string;

  logger?: {
    (message?: any, ...optionalParams: any[]): void
  };

  logLevel?: 'info' | 'warning' | 'error' | 'debug';

  constructor(opts: any) {
    this.user = opts.user;
    this.pass = opts.pass;
    this.logger = opts.logger;
    this.logLevel = opts.logLevel;
  }
}

class Resource {
  protected config!: Config;

  constructor(config: Config) {
    this.config = config;
  }
}

export default Resource;
export { Config, Resource };
