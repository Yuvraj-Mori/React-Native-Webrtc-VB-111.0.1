function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class RTCSessionDescription {
  constructor() {
    let info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      type: null,
      sdp: ''
    };
    _defineProperty(this, "_sdp", void 0);
    _defineProperty(this, "_type", void 0);
    this._sdp = info.sdp;
    this._type = info.type;
  }
  get sdp() {
    return this._sdp;
  }
  get type() {
    return this._type;
  }
  toJSON() {
    return {
      sdp: this._sdp,
      type: this._type
    };
  }
}
//# sourceMappingURL=RTCSessionDescription.js.map