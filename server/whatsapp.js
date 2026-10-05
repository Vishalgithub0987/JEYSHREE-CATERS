import { db } from './db.js';

/**
 * Format phone numbers for WhatsApp API / wa.me links
 * e.g., '+91 98765 43210' -> '919876543210'
 */
export function sanitizePhoneNumber(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    // Default to India country code 91 if 10 digits provided
    cleaned = `91${cleaned}`;
  }
  return cleaned;
}

/**
 * Generate the WhatsApp notification message for the Administrator
 */
export function formatAdminWhatsAppMessage(req, settings) {
  const foodList = (req.selectedFoods || [])
    .map((item) => `✓ ${item.name} (${item.category})`)
    .join('\n');

  return `🔔 *NEW CATERING REQUEST* (${req.id})

*Customer:* ${req.customerName}
*Phone:* ${req.phone}
*WhatsApp:* ${req.whatsapp}
*Event:* ${req.eventType}
*Event Date:* ${req.eventDate}
*Guests:* ${req.guests}
*Location:* ${req.location || 'Not Specified'}

*SELECTED FOOD:*
${foodList}

*Total:* ${req.selectedFoods ? req.selectedFoods.length : 0} items
${req.notes ? `*Notes:* ${req.notes}\n` : ''}
Open Admin Dashboard for full details.`;
}

/**
 * Generate the WhatsApp confirmation message for the Customer
 */
export function formatCustomerWhatsAppMessage(req, settings) {
  const companyName = settings.companyName || 'Royal Feast Caterers';
  const foodList = (req.selectedFoods || [])
    .map((item, idx) => `${idx + 1}. ${item.name}`)
    .join('\n');

  return `✅ *CATERING REQUEST RECEIVED*

Hi ${req.customerName},

Your catering food selection has been successfully received.

*Request ID:* ${req.id}
*Event:* ${req.eventType}
*Date:* ${req.eventDate}
*Guests:* ${req.guests}
*Location:* ${req.location || 'As discussed'}

*Your selected foods:*
${foodList}

*Total Items:* ${req.selectedFoods ? req.selectedFoods.length : 0}

Our catering team will contact you shortly to finalize menu arrangements.

Thank you for choosing *${companyName}*.
Contact us: ${settings.companyPhone || ''}`;
}

/**
 * Generate wa.me prefilled deep links
 */
export function generateWhatsAppLink(phoneNumber, message) {
  const cleaned = sanitizePhoneNumber(phoneNumber);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

/**
 * Send official WhatsApp message via Meta Cloud API if configured
 */
export async function sendWhatsAppMessageViaApi(toPhone, messageText, settings) {
  const token = settings.whatsappAccessToken || process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = settings.whatsappPhoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    return {
      success: false,
      skipped: true,
      reason: 'WhatsApp Business API credentials not configured.'
    };
  }

  const recipient = sanitizePhoneNumber(toPhone);

  try {
    const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'text',
        text: {
          preview_url: false,
          body: messageText
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Meta WhatsApp API returned an error');
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('WhatsApp API sending error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Orchestrate WhatsApp dispatch for a catering submission
 */
export async function processCateringWhatsAppNotifications(cateringRequest) {
  const settings = db.getSettings();
  const adminPhone = settings.adminWhatsAppNumber || process.env.ADMIN_WHATSAPP_NUMBER || '+919876543210';
  const customerPhone = cateringRequest.whatsapp || cateringRequest.phone;

  const adminMsg = formatAdminWhatsAppMessage(cateringRequest, settings);
  const customerMsg = formatCustomerWhatsAppMessage(cateringRequest, settings);

  const adminLink = generateWhatsAppLink(adminPhone, adminMsg);
  const customerLink = generateWhatsAppLink(customerPhone, customerMsg);

  let adminApiResult = { success: false, skipped: true, reason: 'API disabled' };
  let customerApiResult = { success: false, skipped: true, reason: 'API disabled' };

  if (settings.whatsappApiEnabled) {
    if (settings.notifyAdminOnSubmission !== false) {
      adminApiResult = await sendWhatsAppMessageViaApi(adminPhone, adminMsg, settings);
      db.addWhatsAppLog({
        type: 'admin_notification',
        requestId: cateringRequest.id,
        recipient: adminPhone,
        success: adminApiResult.success,
        error: adminApiResult.error || (adminApiResult.skipped ? adminApiResult.reason : null),
        messageExcerpt: adminMsg.substring(0, 100) + '...'
      });
    }

    if (settings.notifyCustomerOnSubmission !== false) {
      customerApiResult = await sendWhatsAppMessageViaApi(customerPhone, customerMsg, settings);
      db.addWhatsAppLog({
        type: 'customer_confirmation',
        requestId: cateringRequest.id,
        recipient: customerPhone,
        success: customerApiResult.success,
        error: customerApiResult.error || (customerApiResult.skipped ? customerApiResult.reason : null),
        messageExcerpt: customerMsg.substring(0, 100) + '...'
      });
    }
  } else {
    // Record mock/direct links in logs
    db.addWhatsAppLog({
      type: 'admin_notification_ready',
      requestId: cateringRequest.id,
      recipient: adminPhone,
      success: true,
      method: 'wa.me_direct_link',
      messageExcerpt: adminMsg.substring(0, 100) + '...'
    });
    db.addWhatsAppLog({
      type: 'customer_confirmation_ready',
      requestId: cateringRequest.id,
      recipient: customerPhone,
      success: true,
      method: 'wa.me_direct_link',
      messageExcerpt: customerMsg.substring(0, 100) + '...'
    });
  }

  return {
    adminMessage: adminMsg,
    customerMessage: customerMsg,
    adminLink,
    customerLink,
    adminApiResult,
    customerApiResult
  };
}
