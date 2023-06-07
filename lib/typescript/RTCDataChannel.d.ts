import { defineCustomEventTarget } from 'event-target-shim';
declare type RTCDataChannelState = 'connecting' | 'open' | 'closing' | 'closed';
declare const RTCDataChannel_base: defineCustomEventTarget.CustomEventTargetConstructor<Record<string, import("event-target-shim").Event<string>>, "standard">;
export default class RTCDataChannel extends RTCDataChannel_base {
    _peerConnectionId: number;
    _reactTag: string;
    _bufferedAmount: number;
    _id: number;
    _label: string;
    _maxPacketLifeTime?: number;
    _maxRetransmits?: number;
    _negotiated: boolean;
    _ordered: boolean;
    _protocol: string;
    _readyState: RTCDataChannelState;
    binaryType: string;
    bufferedAmountLowThreshold: number;
    constructor(info: any);
    get bufferedAmount(): number;
    get label(): string;
    get id(): number;
    get ordered(): boolean;
    get maxPacketLifeTime(): number | undefined;
    get maxRetransmits(): number | undefined;
    get protocol(): string;
    get negotiated(): boolean;
    get readyState(): string;
    send(data: string): void;
    send(data: ArrayBuffer): void;
    send(data: ArrayBufferView): void;
    close(): void;
    _registerEvents(): void;
}
export {};