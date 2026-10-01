import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { maskPhone, sha256Hex } from '../common/crypto.js';

/**
 * SMS port (§22): auth depends on the interface, not a vendor — the real
 * provider (MSG91/Exotel/Twilio — owner decision #11) plugs in here before
 * real-phone testing without touching auth logic.
 *
 * DevSmsAdapter = Wave 1 simulated channel: the code is logged to the backend
 * console (and returned in dev responses via OTP_SIM), every send is recorded
 * in sms_log with a hashed phone — never the raw number (DLT/cost audit rule).
 */
export interface SmsPort {
  sendOtp(phone: string, code: string): Promise<void>;
}

export const SMS_PORT = Symbol('SMS_PORT');

@Injectable()
export class DevSmsAdapter implements SmsPort {
  private readonly logger = new Logger('SMS:SIM');

  constructor(private readonly prisma: PrismaService) {}

  async sendOtp(phone: string, code: string): Promise<void> {
    this.logger.log(`→ ${maskPhone(phone)} OTP=${code} (simulated — no vendor called)`);

    await this.prisma.smsLog.create({
      data: {
        phoneHash: sha256Hex(phone),
        templateId: 'OTP_LOGIN_V1',
        purpose: 'LOGIN',
        providerRef: 'sim',
        status: 'SENT',
      },
    });
  }
}
