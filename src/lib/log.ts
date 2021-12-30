import { v4 } from 'uuid';

const worth: any = {
  error: 1,
  warning: 1,
  info: 2,
  debug: 3,
};

const logLevel = process.env.DUDA_API_LOG_LEVEL ?? 'error';

const colors: any = {
  error: '\x1b[31m',
  warning: '\x1b[33m',
  info: '\x1b[32m',
  debug: '\x1b[34m',
};

// eslint-disable-next-line
function _log(level: string, ...args: any[]) {
  if (worth[level] > worth[logLevel]) {
    return;
  }

  const color = colors[level] ?? colors.info;

  console.log(`[${color}${level}\x1b[0m]`, ...args);

  if (level === 'error') {
    console.log(new Error().stack);
  }
}

const log = {
  warning: (...args: any[]) => _log('warning', ...args),
  info: (...args: any[]) => _log('info', ...args),
  error: (...args: any[]) => _log('error', ...args),
  debug: (...args: any[]) => _log('debug', ...args),
  throw: (errMsg: string, ...args: any[]) => {
    _log('error:fatal', errMsg, ...args);
    throw new Error(errMsg);
  },
  trace: () => {
    const uuid = v4();

    return {
      warning: log.warning.bind(log.warning, uuid),
      info: log.info.bind(log.info, uuid),
      error: log.error.bind(log.error, uuid),
      debug: log.debug.bind(log.debug, uuid),
      throw: (errMsg: string) => log.throw.bind(log.throw, errMsg, uuid),
    };
  },
};

export default log;
