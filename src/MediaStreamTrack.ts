
import { defineCustomEventTarget, Event } from 'event-target-shim';
import { NativeModules } from 'react-native';

import { addListener, removeListener } from './EventEmitter';
import Logger from './Logger';
import { assetFileToUri, deepClone } from './RTCUtil';

const log = new Logger('pc');
const { WebRTCModule } = NativeModules;

const MEDIA_STREAM_TRACK_EVENTS = ['ended', 'mute', 'unmute', 'audiodata'];

type MediaStreamTrackState = 'live' | 'ended';

class MediaStreamTrack extends defineCustomEventTarget(...MEDIA_STREAM_TRACK_EVENTS) {
    _constraints: object;
    _enabled: boolean;
    _settings: object;
    _muted: boolean;
    _peerConnectionId: number;
    _readyState: MediaStreamTrackState;

    readonly id: string;
    readonly kind: string;
    readonly label: string = '';
    readonly remote: boolean;

    constructor(info) {
        super();

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

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(enabled: boolean) {
        if (enabled === this._enabled) {
            return;
        }

        this._enabled = Boolean(enabled);

        if (this._readyState === 'ended') {
            return;
        }

        WebRTCModule.mediaStreamTrackSetEnabled(this.remote ? this._peerConnectionId : -1, this.id, this._enabled);
    }

    get muted(): boolean {
        return this._muted;
    }

    get readyState(): string {
        return this._readyState;
    }

    stop(): void {
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
    _switchCamera(): void {
        if (this.remote) {
            throw new Error('Not implemented for remote tracks');
        }

        if (this.kind !== 'video') {
            throw new Error('Only implemented for video tracks');
        }

        WebRTCModule.mediaStreamTrackSwitchCamera(this.id);
    }

    _setVideoEffect(name: string) {
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
    _setMutedInternal(muted: boolean) {
        if (!this.remote) {
            throw new Error('Track is not remote!');
        }

        this._muted = muted;
        this.dispatchEvent(new Event(muted ? 'mute' : 'unmute'));
    }

    /**
     * Custom API for setting the volume on an individual audio track.
     *
     * @param volume a gain value in the range of 0-10. defaults to 1.0
     */
    _setVolume(volume: number) {
        if (this.kind !== 'audio') {
            throw new Error('Only implemented for audio tracks');
        }

        WebRTCModule.mediaStreamTrackSetVolume(this.remote ? this._peerConnectionId : -1, this.id, volume);
    }

    _changeVBStatus(status: boolean) {
        if (this.remote) {
            throw new Error('Not implemented for remote tracks');
        }
        if (this.kind !== 'video') {
            throw new Error('Only implemented for video tracks');
        }
        WebRTCModule.mediaStreamTrackChangeVbStatus(this.id, status);
    }

    _changeVBImage(imgRequire: any) {
        if (this.remote) {
            throw new Error('Not implemented for remote tracks');
        }
        if (this.kind !== 'video') {
            throw new Error('Only implemented for video tracks');
        }
        let vbImageUri = assetFileToUri(imgRequire);
        console.log("Change VB Image Uri", vbImageUri);
        WebRTCModule.mediaStreamTrackChangeVbImageUri(this.id, vbImageUri);
    }

    _changeVBFrameSkip(vbFrameSkip: number) {
        if (this.remote) {
            throw new Error('Not implemented for remote tracks');
        }
        if (this.kind !== 'video') {
            throw new Error('Only implemented for video tracks');
        }
        WebRTCModule.mediaStreamTrackChangeVbFrameSkip(this.id, vbFrameSkip);
    }

    // here blur value defined blur radius
    _changeVBBlurValue(blurValue: number) {
        if (this.remote) {
            throw new Error('Not implemented for remote tracks');
        }
        if (this.kind !== 'video') {
            throw new Error('Only implemented for video tracks');
        }
        WebRTCModule.mediaStreamTrackChangeVbBlurValue(this.id, blurValue);
    }

    applyConstraints(): never {
        throw new Error('Not implemented.');
    }

    clone(): never {
        throw new Error('Not implemented.');
    }

    getCapabilities(): never {
        throw new Error('Not implemented.');
    }

    getConstraints() {
        return deepClone(this._constraints);
    }

    getSettings() {
        return deepClone(this._settings);
    }

    _registerEvents(): void {
        addListener(this, 'mediaStreamTrackEnded', (ev: any) => {
            if (ev.trackId !== this.id || this._readyState === 'ended') {
                return;
            }

            log.debug(`${this.id} mediaStreamTrackEnded`);
            this._readyState = 'ended';

            // @ts-ignore
            this.dispatchEvent(new Event('ended'));
        });

        if (this.kind == "audio") {
            addListener(this, 'audioRecordSamplesReady', (data: any) => {

                const { audioFormat, sampleRate, channelCount, audioData } = data
                //console.log("[MediaStreamTrack]::audioRecordSamplesReady() ->",{audioFormat,sampleRate, channelCount})

                // @ts-ignore
                this.dispatchEvent(new RTCAudioDataEvent('audiodata', new RTCAudioData(sampleRate, channelCount, audioFormat, audioData)));
            });
        }
    }

    release(): void {
        if (this.remote) {
            return;
        }

        removeListener(this);
        WebRTCModule.mediaStreamTrackRelease(this.id);
    }
}

export default MediaStreamTrack;

export class RTCAudioData {
    audioFormat: number;
    channelCount: number;
    sampleRate: number;
    audioData: any;

    constructor(sampleRate: number = 0, channelCount: number = 0, audioFormat = 0, audioData = null) {
        this.audioData = audioData;
        this.sampleRate = sampleRate;
        this.channelCount = channelCount;
        this.audioFormat = audioFormat;
    }
}

export class RTCAudioDataEvent {
    type: string;
    data: RTCAudioData | null;
    constructor(type, data) {
        this.type = type.toString();
        this.data = data ?? null;
    }
}

