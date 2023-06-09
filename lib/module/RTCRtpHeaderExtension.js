function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class RTCRtpHeaderExtension {
  constructor(init) {
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "uri", void 0);
    _defineProperty(this, "encrypted", void 0);
    this.id = init.id;
    this.uri = init.uri;
    this.encrypted = init.encrypted;
    Object.freeze(this);
  }
  toJSON() {
    return {
      id: this.id,
      uri: this.uri,
      encrypted: this.encrypted
    };
  }
}
//# sourceMappingURL=RTCRtpHeaderExtension.js.map