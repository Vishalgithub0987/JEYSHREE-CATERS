import { NextRequest, NextResponse } from 'next/server';
import { createWhatsAppUrl } from '@/utils/whatsapp';

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid or empty JSON request body.' },
        { status: 400 }
      );
    }

    const { name, phone, email, eventType, eventDate, message } = body || {};

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    const digitsOnly = phone ? phone.replace(/[^0-9]/g, '') : '';
    if (!phone || digitsOnly.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    const waText =
      `🙏 *BOOKING INQUIRY - JAYSHREE CATERS*\n\n` +
      `👤 *Name:* ${name.trim()}\n` +
      `📞 *Phone:* ${phone.trim()}\n` +
      `✉️ *Email:* ${email?.trim() || 'N/A'}\n` +
      `🎉 *Event:* ${eventType || 'Celebration'}\n` +
      `📅 *Event Date:* ${eventDate?.trim() || 'To be decided'}\n` +
      `📝 *Message / Hall Details:* ${message?.trim() || 'I would like to discuss catering arrangements.'}`;

    const whatsappLink = createWhatsAppUrl(waText);

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting JayShree Caters! Open WhatsApp to connect immediately.',
      whatsappLink,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Unable to process contact message.' },
      { status: 500 }
    );
  }
}
