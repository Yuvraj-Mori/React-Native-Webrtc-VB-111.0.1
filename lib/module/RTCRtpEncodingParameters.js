function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class RTCRtpEncodingParameters {
  constructor(init) {
    var _init$rid, _init$maxBitrate, _init$maxFramerate, _init$scaleResolution;
    _defineProperty(this, "active", void 0);
    _defineProperty(this, "_rid", void 0);
    _defineProperty(this, "_maxFramerate", void 0);
    _defineProperty(this, "_maxBitrate", void 0);
    _defineProperty(this, "_scaleResolutionDownBy", void 0);
    this.active = init.active;
    this._rid = (_init$rid = init.rid) !== null && _init$rid !== void 0 ? _init$rid : null;
    this._maxBitrate = (_init$maxBitrate = init.maxBitrate) !== null && _init$maxBitrate !== void 0 ? _init$maxBitrate : null;
    this._maxFramerate = (_init$maxFramerate = init.maxFramerate) !== null && _init$maxFramerate !== void 0 ? _init$maxFramerate : null;
    this._scaleResolutionDownBy = (_init$scaleResolution = init.scaleResolutionDownBy) !== null && _init$scaleResolution !== void 0 ? _init$scaleResolution : null;
  }
  get rid() {
    return this._rid;
  }
  get maxFramerate() {
    return this._maxFramerate;
  }
  set maxFramerate(framerate) {
    // eslint-disable-next-line eqeqeq
    if (framerate != null && framerate > 0) {
      this._maxFramerate = framerate;
    } else {
      this._maxFramerate = null;
    }
  }
  get maxBitrate() {
    return this._maxBitrate;
  }
  set maxBitrate(bitrate) {
    // eslint-disable-next-line eqeqeq
    if (bitrate != null && bitrate >= 0) {
      this._maxBitrate = bitrate;
    } else {
      this._maxBitrate = null;
    }
  }
  get scaleResolutionDownBy() {
    return this._scaleResolutionDownBy;
  }
  set scaleResolutionDownBy(resolutionScale) {
    // eslint-disable-next-line eqeqeq
    if (resolutionScale != null && resolutionScale >= 1) {
      this._scaleResolutionDownBy = resolutionScale;
    } else {
      this._scaleResolutionDownBy = null;
    }
  }
  toJSON() {
    const obj = {
      active: this.active
    };
    if (this._rid !== null) {
      obj['rid'] = this._rid;
    }
    if (this._maxBitrate !== null) {
      obj['maxBitrate'] = this._maxBitrate;
    }
    if (this._maxFramerate !== null) {
      obj['maxFramerate'] = this._maxFramerate;
    }
    if (this._scaleResolutionDownBy !== null) {
      obj['scaleResolutionDownBy'] = this._scaleResolutionDownBy;
    }
    return obj;
  }
}
//# sourceMappingURL=RTCRtpEncodingParameters.js.map