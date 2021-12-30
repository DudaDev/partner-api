import log from './log';

interface HeaderOptions {
  [key: string]: {
    required: boolean;
  };
}

interface Parameters {
  [key: string]: {
    type: 'string' | 'array' | 'object' | 'number' | 'boolean',
    properKey?: string;
    required: boolean;
  };
}

function copyWithoutKeys<T>(toCopy: T, keys: string[]): Partial<T> {
  const copy = { ...toCopy };

  keys.forEach((key: string) => delete (copy as any)[key]);

  return copy;
}

function checkMissingKeys(obj: any, keys: string[]) {
  const type = typeof obj;
  const notAnObject = type !== 'object';
  const isArray = Array.isArray(obj);

  if (notAnObject || isArray) {
    log.throw(`invalid type: expected=object received=${isArray ? 'array' : type}`);
  }

  const missing: string[] = [];

  keys.forEach((key: string) => {
    const exists = Reflect.has(obj, key);

    if (!exists) {
      missing.push(key);
    }
  });

  return missing;
}

function validateHeaders(check: any, opts?: HeaderOptions) {
  if (!opts) {
    return;
  }

  const keys = Reflect.ownKeys(opts) as string[];

  const missing: string[] = [];

  keys.forEach((key: string) => {
    if (opts[key].required && !Reflect.has(check, key)) {
      missing.push(key);
    }
  });

  if (missing.length) {
    throw new Error(`[error] missing headers: missing=${JSON.stringify(missing)}`);
  }
}

function validateParams(parameters: Parameters, check: any) {
  const keys = Reflect.ownKeys(parameters) as string[];

  const missing: string[] = [];

  keys.forEach((key: string) => {
    if (parameters[key].required && !Reflect.has(check, key)) {
      missing.push(key);
    }
  });

  if (missing.length) {
    throw new Error(`[error] missing parameters: missing=${JSON.stringify(missing)}`);
  }
}

function buildQueryParams(parameters: Parameters, check: any) {
  const keys = Reflect.ownKeys(parameters) as string[];
  const missing: string[] = [];

  const query = new URLSearchParams();

  keys.forEach((key: string) => {
    if (Reflect.has(check, key)) {
      const properKey = parameters[key].properKey ?? key;
      query.append(properKey, check[key]);
      // eslint-disable-next-line
      delete check[key];
    } else if (parameters[key].required && !Reflect.has(check, key)) {
      missing.push(key);
    }
  });

  if (missing.length) {
    throw new Error(`[error] missing parameters: missing=${JSON.stringify(missing)}`);
  }

  return query.toString();
}

function interpolate(str: string, vals: any, del?: boolean) {
  const regExp = /{[^}]+}/g;
  const matches = str.matchAll(regExp);

  // eslint-disable-next-line
  for (const match of matches) {
    const key = match[0].slice(1, match[0].length - 1);
    // eslint-disable-next-line
    str = str.replace(match[0], vals[key]);

    if (del) {
      // eslint-disable-next-line
      delete vals[key];
    }
  }

  return str;
}

function buildPath(path: string, opts: any) {
  const urlParameters = /{[^}]+}/g.exec(path)
    ?.slice(0);

  if (!urlParameters) {
    return path;
  }

  const missing: string[] = [];

  urlParameters.forEach((parameter: string) => {
    const key = parameter.slice(1, parameter.length - 1);

    if (!Reflect.has(opts, key)) {
      missing.push(key);
    }
  });

  if (missing.length) {
    log.throw(`missing parameters: missing=${JSON.stringify(missing)}`);
  }

  return interpolate(path, opts, true);
}

export {
  copyWithoutKeys,
  checkMissingKeys,
  buildQueryParams,
  validateParams,
  validateHeaders,
  interpolate,
  buildPath,
  Parameters,
  HeaderOptions,
};
