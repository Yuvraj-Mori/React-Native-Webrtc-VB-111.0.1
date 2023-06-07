function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class RTCIceCandidate {
  constructor(_ref) {
    let {
      candidate = '',
      sdpMLineIndex = null,
      sdpMid = null
    } = _ref;
    _defineProperty(this, "candidate", void 0);
    _defineProperty(this, "sdpMLineIndex", void 0);
    _defineProperty(this, "sdpMid", void 0);
    if (sdpMLineIndex === null || sdpMid === null) {
      throw new TypeError('`sdpMLineIndex` and `sdpMid` must not null');
    }
    this.candidate = candidate;
    this.sdpMLineIndex = sdpMLineIndex;
    this.sdpMid = sdpMid;
  }
  toJSON() {
    return {
      candidate: this.candidate,
      sdpMLineIndex: this.sdpMLineIndex,
      sdpMid: this.sdpMid
    };
  }
}
//# sourceMappingURL=RTCIceCandidate.js.map