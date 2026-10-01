import { type EventKey } from '@workbridge/contracts';
export interface ChannelPrefs {
    pushEnabled: boolean;
    smsEnabled: boolean;
}
export type Channel = 'INAPP' | 'PUSH' | 'SMS';
export declare function channelsFor(eventKey: EventKey, prefs: ChannelPrefs): Channel[];
