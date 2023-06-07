"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _RTCRtpCapabilities = require("./RTCRtpCapabilities");
var _RTCRtpSendParameters = _interopRequireDefault(require("./RTCRtpSendParameters"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const {
  WebRTCModule
} = _reactNative.NativeModules;
class RTCRtpSender {
  constructor(info) {
    _defineProperty(this, "_id", void 0);
    _defineProperty(this, "_track", null);
    _defineProperty(this, "_peerConnectionId", void 0);
    _defineProperty(this, "_rtpParameters", void 0);
    this._peerConnectionId = info.peerConnectionId;
    this._id = info.id;
    this._rtpParameters = new _RTCRtpSendParameters.default(info.rtpParameters);
    if (info.track) {
      this._track = info.track;
    }
  }
  async replaceTrack(track) {
    try {
      await WebRTCModule.senderReplaceTrack(this._peerConnectionId, this._id, track ? track.id : null);
    } catch (e) {
      return;
    }
    this._track = track;
  }
  static getCapabilities(kind) {
    if (kind === 'audio') {
      return _RTCRtpCapabilities.DEFAULT_AUDIO_CAPABILITIES;
    }
    if (!_RTCRtpCapabilities.senderCapabilities) {
      throw new Error('sender Capabilities are null');
    }
    return _RTCRtpCapabilities.senderCapabilities;
  }
  getParameters() {
    return this._rtpParameters;
  }
  async setParameters(parameters) {
    // This allows us to get rid of private "underscore properties"
    const _params = JSON.parse(JSON.stringify(parameters));
    const newParameters = await WebRTCModule.senderSetParameters(this._peerConnectionId, this._id, _params);
    this._rtpParameters = new _RTCRtpSendParameters.default(newParameters);
  }
  getStats() {
    return WebRTCModule.senderGetStats(this._peerConnectionId, this._id).then(data =>
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
  get track() {
    return this._track;
  }
  get id() {
    return this._id;
  }
}
exports.default = RTCRtpSender;
//# sourceMappingURL=RTCRtpSender.js.map