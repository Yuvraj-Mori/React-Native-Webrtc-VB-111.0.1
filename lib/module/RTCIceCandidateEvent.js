function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class RTCIceCandidateEvent {
  constructor(type, eventInitDict) {
    var _eventInitDict$candid;
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "candidate", void 0);
    this.type = type.toString();
    this.candidate = (_eventInitDict$candid = eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.candidate) !== null && _eventInitDict$candid !== void 0 ? _eventInitDict$candid : null;
  }
}
//# sourceMappingURL=RTCIceCandidateEvent.js.map