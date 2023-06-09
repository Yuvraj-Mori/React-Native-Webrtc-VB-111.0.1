import MediaStream from './MediaStream';
import type MediaStreamTrack from './MediaStreamTrack';
import RTCRtpReceiver from './RTCRtpReceiver';
import RTCRtpTransceiver from './RTCRtpTransceiver';
export default class RTCTrackEvent {
    type: string;
    readonly streams: MediaStream[];
    readonly transceiver: RTCRtpTransceiver;
    readonly receiver: RTCRtpReceiver | null;
    readonly track: MediaStreamTrack | null;
    constructor(type: string, eventInitDict: {
        streams: MediaStream[];
        transceiver: RTCRtpTransceiver;
    });
}
