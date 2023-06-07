function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { NativeModules } from 'react-native';
import { DEFAULT_AUDIO_CAPABILITIES, receiverCapabilities } from './RTCRtpCapabilities';
import RTCRtpReceiveParameters from './RTCRtpReceiveParameters';
const {
  WebRTCModule
} = NativeModules;
export default class RTCRtpReceiver {
  constructor(info) {
    _defineProperty(this, "_id", void 0);
    _defineProperty(this, "_peerConnectionId", void 0);
    _defineProperty(this, "_track", null);
    _defineProperty(this, "_rtpParameters", void 0);
    this._id = info.id;
    this._peerConnectionId = info.peerConnectionId;
    this._rtpParameters = new RTCRtpReceiveParameters(info.rtpParameters);
    if (info.track) {
      this._track = info.track;
    }
  }
  static getCapabilities(kind) {
    if (kind === 'audio') {
      return DEFAULT_AUDIO_CAPABILITIES;
    }
    if (!receiverCapabilities) {
      throw new Error('Receiver Capabilities is null');
    }
    return receiverCapabilities;
  }
  getStats() {
    return WebRTCModule.receiverGetStats(this._peerConnectionId, this._id).then(data =>
    /* On both Android and iOS it is faster to construct a single
    JSON string representing the Map of StatsReports and have it
    pass through the React Native bridge rather than the Map of
    StatsReports. While the implementations do try to be faster in
    general, the stress is on being faster to pass through the React
    Native bridge which is a bottleneck that tends to be visible in
    the UI when there is congestion involving UI-related passing.
    */
    new Map(JSON.parse(data)));
  }
  getParameters() {
    return this._rtpParameters;
  }
  get id() {
    return this._id;
  }
  get track() {
    return this._track;
  }
}
//# sourceMappingURL=RTCRtpReceiver.js.map