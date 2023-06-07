function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import debug from 'debug';
export default class Logger {
  static enable(ns) {
    debug.enable(ns);
  }
  constructor(prefix) {
    _defineProperty(this, "_debug", void 0);
    _defineProperty(this, "_info", void 0);
    _defineProperty(this, "_warn", void 0);
    _defineProperty(this, "_error", void 0);
    const _prefix = `${Logger.ROOT_PREFIX}:${prefix}`;
    this._debug = debug(`${_prefix}:DEBUG`);
    this._info = debug(`${_prefix}:INFO`);
    this._warn = debug(`${_prefix}:WARN`);
    this._error = debug(`${_prefix}:ERROR`);
    const log = console.log.bind(console);
    this._debug.log = log;
    this._info.log = log;
    this._warn.log = log;
    this._error.log = log;
  }
  debug(msg) {
    this._debug(msg);
  }
  info(msg) {
    this._info(msg);
  }
  warn(msg) {
    this._warn(msg);
  }
  error(msg, err) {
    var _err$stack;
    const trace = (_err$stack = err === null || err === void 0 ? void 0 : err.stack) !== null && _err$stack !== void 0 ? _err$stack : 'N/A';
    this._error(`${msg} Trace: ${trace}`);
  }
}
_defineProperty(Logger, "ROOT_PREFIX", 'rn-webrtc');
//# sourceMappingURL=Logger.js.map