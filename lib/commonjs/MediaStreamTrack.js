"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventTargetShim = require("event-target-shim");
var _reactNative = require("react-native");
var _EventEmitter = require("./EventEmitter");
var _Logger = _interopRequireDefault(require("./Logger"));
var _RTCUtil = require("./RTCUtil");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const log = new _Logger.default('pc');
const {
  WebRTCModule
} = _reactNative.NativeModules;
const MEDIA_STREAM_TRACK_EVENTS = ['ended', 'mute', 'unmute'];
class MediaStreamTrack extends (0, _eventTargetShim.defineCustomEventTarget)(...MEDIA_STREAM_TRACK_EVENTS) {
  constructor(info) {
    super();
    _defineProperty(this, "_constraints", void 0);
    _defineProperty(this, "_enabled", void 0);
    _defineProperty(this, "_settings", void 0);
    _defineProperty(this, "_muted", void 0);
    _defineProperty(this, "_peerConnectionId", void 0);
    _defineProperty(this, "_readyState", void 0);
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "kind", void 0);
    _defineProperty(this, "label", '');
    _defineProperty(this, "remote", void 0);
    this._constraints = info.constraints || {};
    this._enabled = info.enabled;
    this._settings = info.settings || {};
    this._muted = false;
    this._peerConnectionId = info.peerConnectionId;
    this._readyState = info.readyState;
    this.id = info.id;
    this.kind = info.kind;
    this.remote = info.remote;
    if (!this.remote) {
      this._registerEvents();
    }
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(enabled) {
    if (enabled === this._enabled) {
      return;
    }
    this._enabled = Boolean(enabled);
    if (this._readyState === 'ended') {
      return;
    }
    WebRTCModule.mediaStreamTrackSetEnabled(this.remote ? this._peerConnectionId : -1, this.id, this._enabled);
  }
  get muted() {
    return this._muted;
  }
  get readyState() {
    return this._readyState;
  }
  stop() {
    this.enabled = false;
    this._readyState = 'ended';
  }

  /**
   * Private / custom API for switching the cameras on the fly, without the
   * need for adding / removing tracks or doing any SDP renegotiation.
   *
   * This is how the reference application (AppRTCMobile) implements camera
   * switching.
   */
  _switchCamera() {
    if (this.remote) {
      throw new Error('Not implemented for remote tracks');
    }
    if (this.kind !== 'video') {
      throw new Error('Only implemented for video tracks');
    }
    WebRTCModule.mediaStreamTrackSwitchCamera(this.id);
  }
  _setVideoEffect(name) {
    if (this.remote) {
      throw new Error('Not implemented for remote tracks');
    }
    if (this.kind !== 'video') {
      throw new Error('Only implemented for video tracks');
    }
    WebRTCModule.mediaStreamTrackSetVideoEffect(this.id, name);
  }

  /**
   * Internal function which is used to set the muted state on remote tracks and
   * emit the mute / unmute event.
   *
   * @param muted Whether the track should be marked as muted / unmuted.
   */
  _setMutedInternal(muted) {
    if (!this.remote) {
      throw new Error('Track is not remote!');
    }
    this._muted = muted;
    this.dispatchEvent(new _eventTargetShim.Event(muted ? 'mute' : 'unmute'));
  }

  /**
   * Custom API for setting the volume on an individual audio track.
   *
   * @param volume a gain value in the range of 0-10. defaults to 1.0
   */
  _setVolume(volume) {
    if (this.kind !== 'audio') {
      throw new Error('Only implemented for audio tracks');
    }
    WebRTCModule.mediaStreamTrackSetVolume(this.remote ? this._peerConnectionId : -1, this.id, volume);
  }
  applyConstraints() {
    throw new Error('Not implemented.');
  }
  clone() {
    throw new Error('Not implemented.');
  }
  getCapabilities() {
    throw new Error('Not implemented.');
  }
  getConstraints() {
    return (0, _RTCUtil.deepClone)(this._constraints);
  }
  getSettings() {
    return (0, _RTCUtil.deepClone)(this._settings);
  }
  _registerEvents() {
    (0, _EventEmitter.addListener)(this, 'mediaStreamTrackEnded', ev => {
      if (ev.trackId !== this.id || this._readyState === 'ended') {
        return;
      }
      log.debug(`${this.id} mediaStreamTrackEnded`);
      this._readyState = 'ended';

      // @ts-ignore
      this.dispatchEvent(new _eventTargetShim.Event('ended'));
    });
  }
  release() {
    if (this.remote) {
      return;
    }
    (0, _EventEmitter.removeListener)(this);
    WebRTCModule.mediaStreamTrackRelease(this.id);
  }
}
var _default = MediaStreamTrack;
exports.default = _default;
//# sourceMappingURL=MediaStreamTrack.js.map