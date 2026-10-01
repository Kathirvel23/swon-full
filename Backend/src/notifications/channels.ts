import { NOTIFICATION_EVENTS, type EventKey } from '@workbridge/contracts';

import { ApiError } from '../common/api-error.js';

/**
 * Pure channel matrix (§12): which channels fire for an event, filtered by
 * the recipient's preferences. INAPP is unconditional (audit trail), PUSH and
 * SMS honour prefs — SMS events are dev-simulated until a vendor (#11).
 */

export interface ChannelPrefs {
  pushEnabled: boolean;
  smsEnabled: boolean;
}

export type Channel = 'INAPP' | 'PUSH' | 'SMS';

export function channelsFor(
  eventKey: EventKey,
  prefs: ChannelPrefs,
): Channel[] {
  const table = NOTIFICATION_EVENTS as Record<
    string,
    { channels: readonly Channel[]; titleKey: string } | undefined
  >;
  const def = table[eventKey];
  if (!def) {
    throw new ApiError('VALIDATION_FAILED', `Unknown notification event: ${String(eventKey)}`);
  }
  const channels: Channel[] = ['INAPP'];
  if (def.channels.includes('PUSH') && prefs.pushEnabled) channels.push('PUSH');
  if (def.channels.includes('SMS') && prefs.smsEnabled) channels.push('SMS');
  return channels;
}
