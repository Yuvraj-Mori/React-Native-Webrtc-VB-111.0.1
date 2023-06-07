function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import RTCRtcpParameters from './RTCRtcpParameters';
import RTCRtpCodecParameters from './RTCRtpCodecParameters';
import RTCRtpHeaderExtension from './RTCRtpHeaderExtension';
export default class RTCRtpParameters {
  constructor(init) {
    _defineProperty(this, "codecs", []);
    _defineProperty(this, "headerExtensions", []);
    _defineProperty(this, "rtcp", void 0);
    for (const codec of init.codecs) {
      this.codecs.push(new RTCRtpCodecParameters(codec));
    }
    for (const ext of init.headerExtensions) {
      this.headerExtensions.push(new RTCRtpHeaderExtension(ext));
    }
    this.rtcp = new RTCRtcpParameters(init.rtcp);
  }
  toJSON() {
    return {
      codecs: this.codecs.map(c => c.toJSON()),
      headerExtensions: this.headerExtensions.map(he => he.toJSON()),
      rtcp: this.rtcp.toJSON()
    };
  }
}
//# sourceMappingURL=RTCRtpParameters.js.map