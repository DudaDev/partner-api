import log from './log';

interface Parameters {
  [key: string]: {
    type: 'string' | 'array' | 'object' | 'number' | 'boolean',
    required: boolean;
  };
}

function copyWithoutKeys(toCopy: any, keys: string[]) {
  const copy = { ...toCopy };

  keys.forEach((key: string) => delete copy[key]);

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

  return missing;
}

function buildQueryParams(parameters: Parameters, check: any) {
  const keys = Reflect.ownKeys(parameters) as string[];
  const missing: string[] = [];

  const query = new URLSearchParams();

  keys.forEach((key: string) => {
    if (Reflect.has(check, key)) {
      query.append(key, check[key]);
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
  interpolate,
  buildPath,
  Parameters,
};
