function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { NativeModules } from 'react-native';
const {
  WebRTCModule
} = NativeModules;
export default class RTCRtpTransceiver {
  constructor(args) {
    _defineProperty(this, "_peerConnectionId", void 0);
    _defineProperty(this, "_sender", void 0);
    _defineProperty(this, "_receiver", void 0);
    _defineProperty(this, "_mid", null);
    _defineProperty(this, "_direction", void 0);
    _defineProperty(this, "_currentDirection", void 0);
    _defineProperty(this, "_stopped", void 0);
    this._peerConnectionId = args.peerConnectionId;
    this._mid = args.mid ? args.mid : null;
    this._direction = args.direction;
    this._currentDirection = args.currentDirection;
    this._stopped = Boolean(args.isStopped);
    this._sender = args.sender;
    this._receiver = args.receiver;
  }
  get mid() {
    return this._mid;
  }
  get stopped() {
    return this._stopped;
  }
  get direction() {
    return this._direction;
  }
  set direction(val) {
    if (!['sendonly', 'recvonly', 'sendrecv', 'inactive'].includes(val)) {
      throw new TypeError('Invalid direction provided');
    }
    if (this._stopped) {
      throw new Error('Transceiver Stopped');
    }
    if (this._direction === val) {
      return;
    }
    const oldDirection = this._direction;
    WebRTCModule.transceiverSetDirection(this._peerConnectionId, this.sender.id, val).catch(() => {
      this._direction = oldDirection;
    });
    this._direction = val;
  }
  get currentDirection() {
    return this._currentDirection;
  }
  get sender() {
    return this._sender;
  }
  get receiver() {
    return this._receiver;
  }
  stop() {
    if (this._stopped) {
      return;
    }
    WebRTCModule.transceiverStop(this._peerConnectionId, this.sender.id).then(() => this._setStopped());
  }
  _setStopped() {
    this._stopped = true;
    this._direction = 'stopped';
    this._currentDirection = 'stopped';
    this._mid = null;
  }
}
//# sourceMappingURL=RTCRtpTransceiver.js.map