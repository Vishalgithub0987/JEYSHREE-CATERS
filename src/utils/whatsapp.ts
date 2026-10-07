import { siteConfig } from '@/data/site';
import { CateringEnquiryPayload, MenuItem } from '@/types';

/**
 * Sanitize and format phone number for WhatsApp wa.me links
 * e.g. '+91 98765 43210' -> '919876543210'
 */
export function sanitizeWhatsAppNumber(phone: string): string {
  if (!phone) return siteConfig.whatsappNumber;
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    cleaned = `91${cleaned}`;
  }
  return cleaned;
}

/**
 * Generate a clean wa.me direct link
 */
export function createWhatsAppUrl(message: string, targetPhone?: string): string {
  const phone = sanitizeWhatsAppNumber(targetPhone || siteConfig.whatsappNumber);
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Generate formatted WhatsApp message for catering inquiries
 * Supports both Owner Enquiry copy and Customer Booking record copy
 */
export function formatCateringEnquiryMessage(payload: CateringEnquiryPayload, isCustomerCopy = false): string {
  const {
    name,
    phone,
    email,
    eventType,
    eventDate,
    guests,
    location,
    selectedFoods = [],
    message = '',
  } = payload;

  const header = isCustomerCopy
    ? `✨ *JAYSHREE CATERS - YOUR EVENT MENU ESTIMATE* (Customer Copy)\nNamaskaram *${name.trim()}*! Here is the summary copy of your catering enquiry:\n`
    : `🙏 *NAMASKARAM JAYSHREE CATERS*\nI would like to enquire about catering for an upcoming celebration.\n`;

  const details = [
    `👤 *Name:* ${name.trim()}`,
    `📞 *Phone:* ${phone.trim()}`,
    email ? `✉️ *Email:* ${email.trim()}` : null,
    `🎉 *Event:* ${eventType}`,
    `📅 *Event Date:* ${eventDate}`,
    `👥 *Expected Guests:* ${guests}`,
    `📍 *Location:* ${location.trim() || 'K V Kuppam'}`,
  ]
    .filter(Boolean)
    .join('\n');

  let foodSection = '';
  if (selectedFoods.length > 0) {
    const list = selectedFoods
      .map((item, idx) => {
        if (item.isCustom) {
          const qtyStr = item.quantity && item.quantity > 1 ? ` (Qty: ${item.quantity})` : '';
          const noteStr = item.customNotes ? ` [Notes: ${item.customNotes}]` : '';
          return `  ${idx + 1}. ✨ [Custom Item] ${item.name} (${item.type === 'veg' ? 'Veg' : 'Non-Veg'})${qtyStr}${noteStr}`;
        }
        return `  ${idx + 1}. ${item.name} (${item.category} • ${item.type === 'veg' ? 'Veg' : 'Non-Veg'})`;
      })
      .join('\n');
    foodSection = `\n\n🍽️ *SELECTED MENU ITEMS (${selectedFoods.length}):*\n${list}`;
  }

  const notesSection = message.trim() ? `\n\n📝 *Special Requirements / Notes:*\n${message.trim()}` : '';
  const footer = isCustomerCopy
    ? `\n\n✅ *Status:* Enquiry dispatched to Jayshree Caters (${siteConfig.phoneDisplay || '+91 962 642 6046'}).\n📍 K. V. Kuppam, North Tamil Nadu\nThank you for choosing Jayshree Caters!`
    : `\n\nPlease let me know your package details and availability. Thank you!`;

  return `${header}\n${details}${foodSection}${notesSection}${footer}`;
}

/**
 * Quick context-specific WhatsApp CTA links
 */
export function getQuickWhatsAppLink(context: 'hero' | 'services' | 'menu' | 'bananaleaf' | 'contact' | 'sticky', extra?: string): string {
  switch (context) {
    case 'hero':
      return createWhatsAppUrl(
        `Namaskaram JayShree Caters! I would like to plan a South Indian feast for my upcoming celebration. Please share your catering brochure and package details.`
      );
    case 'services':
      return createWhatsAppUrl(
        `Namaskaram JayShree Caters! I am interested in your ${extra || 'Catering Services'}. Please share the menu choices, guest pricing, and availability.`
      );
    case 'menu':
      return createWhatsAppUrl(
        `Namaskaram JayShree Caters! I was browsing your signature menu and would love to customize a menu for my event. Could you please assist me?`
      );
    case 'bananaleaf':
      return createWhatsAppUrl(
        `Namaskaram JayShree Caters! I would like to know more about booking an authentic Traditional Banana Leaf Virundhu for our celebration.`
      );
    case 'contact':
      return createWhatsAppUrl(
        `Namaskaram JayShree Caters! I have a question regarding catering dates and booking process. Could someone from your team connect with me?`
      );
    case 'sticky':
    default:
      return createWhatsAppUrl(
        `Namaskaram JayShree Caters! I would like to enquire about your catering services for an event.`
      );
  }
}
