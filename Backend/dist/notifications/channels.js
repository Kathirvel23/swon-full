import { NOTIFICATION_EVENTS } from '@workbridge/contracts';
import { ApiError } from '../common/api-error.js';
export function channelsFor(eventKey, prefs) {
    const table = NOTIFICATION_EVENTS;
    const def = table[eventKey];
    if (!def) {
        throw new ApiError('VALIDATION_FAILED', `Unknown notification event: ${String(eventKey)}`);
    }
    const channels = ['INAPP'];
    if (def.channels.includes('PUSH') && prefs.pushEnabled)
        channels.push('PUSH');
    if (def.channels.includes('SMS') && prefs.smsEnabled)
        channels.push('SMS');
    return channels;
}
//# sourceMappingURL=channels.js.map