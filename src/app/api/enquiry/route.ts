import { NextRequest, NextResponse } from 'next/server';
import { CateringEnquiryPayload, EnquiryResponse } from '@/types';
import { createWhatsAppUrl, formatCateringEnquiryMessage } from '@/utils/whatsapp';

import { siteConfig } from '@/data/site';

export async function POST(req: NextRequest) {
  try {
    let body: Partial<CateringEnquiryPayload>;
    try {
      body = (await req.json()) as Partial<CateringEnquiryPayload>;
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid or empty JSON request body.' },
        { status: 400 }
      );
    }

    // Server-side validation
    const name = body?.name?.trim();
    const phone = body?.phone?.trim();
    const eventType = body?.eventType?.trim() || 'Wedding';
    const eventDate = body?.eventDate?.trim();
    const guests = Number(body?.guests);
    const location = body?.location?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid contact name (at least 2 characters).' },
        { status: 400 }
      );
    }

    const digitsOnly = phone ? phone.replace(/[^0-9]/g, '') : '';
    if (!phone || digitsOnly.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit mobile number for WhatsApp coordination.' },
        { status: 400 }
      );
    }

    if (!eventDate) {
      return NextResponse.json(
        { success: false, message: 'Please specify the celebration date.' },
        { status: 400 }
      );
    }

    if (!guests || isNaN(guests) || guests < 10) {
      return NextResponse.json(
        { success: false, message: 'Please provide an estimated guest count (minimum 10 guests).' },
        { status: 400 }
      );
    }

    if (!location || location.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Please provide the event venue or city/location.' },
        { status: 400 }
      );
    }

    const sanitizedPayload: CateringEnquiryPayload = {
      name,
      phone,
      email: body.email?.trim() || undefined,
      eventType,
      eventDate,
      guests,
      location,
      selectedFoods: Array.isArray(body.selectedFoods) ? body.selectedFoods : [],
      message: body.message?.trim() || undefined,
    };

    // 1. Format WhatsApp message for the Business Owner (Jayshree Caters)
    const formattedOwnerMessage = formatCateringEnquiryMessage(sanitizedPayload, false);
    const ownerWhatsappLink = createWhatsAppUrl(formattedOwnerMessage, siteConfig.whatsappNumber);

    // 2. Format WhatsApp confirmation copy for the Customer / User
    const formattedUserMessage = formatCateringEnquiryMessage(sanitizedPayload, true);
    const userWhatsappLink = createWhatsAppUrl(formattedUserMessage, sanitizedPayload.phone);

    const requestId = `JS-${Date.now().toString().slice(-6)}`;

    // Optional automated Meta WhatsApp Cloud API delivery if credentials provided
    if (
      process.env.WHATSAPP_API_ENABLED === 'true' &&
      process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID
    ) {
      try {
        const token = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const sendCloudMsg = async (toPhone: string, text: string) => {
          const cleanTo = toPhone.replace(/[^0-9]/g, '');
          const formattedTo = cleanTo.length === 10 ? `91${cleanTo}` : cleanTo;
          return fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: formattedTo,
              type: 'text',
              text: { body: text },
            }),
          });
        };

        await Promise.allSettled([
          sendCloudMsg(siteConfig.whatsappNumber, formattedOwnerMessage),
          sendCloudMsg(sanitizedPayload.phone, formattedUserMessage),
        ]);
      } catch (cloudErr) {
        console.warn('Meta WhatsApp Cloud API dispatch notice:', cloudErr);
      }
    }

    const responseData: EnquiryResponse = {
      success: true,
      message: 'Catering enquiry details generated successfully for both owner and customer.',
      whatsappLink: ownerWhatsappLink,
      userWhatsappLink,
      details: {
        requestId,
        customerName: sanitizedPayload.name,
        phone: sanitizedPayload.phone,
        ownerPhone: siteConfig.whatsappDisplay || siteConfig.whatsappNumber,
        eventSummary: `${sanitizedPayload.eventType} on ${sanitizedPayload.eventDate} for ~${sanitizedPayload.guests} guests in ${sanitizedPayload.location}`,
        itemCount: sanitizedPayload.selectedFoods?.length || 0,
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while processing your enquiry.' },
      { status: 500 }
    );
  }
}
