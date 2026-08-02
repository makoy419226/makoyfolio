import { MessageCircle, Phone } from "lucide-react";

const whatsappMessage = encodeURIComponent(
  "Hi Mark, I found your portfolio and would like to connect with you.",
);

const WhatsAppWidget = () => (
  <a
    href={`https://wa.me/971509317400?text=${whatsappMessage}`}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-widget"
    aria-label="Contact Mark on WhatsApp"
  >
    <span className="whatsapp-widget__icon" aria-hidden>
      <MessageCircle className="whatsapp-widget__bubble" />
      <Phone className="whatsapp-widget__phone" />
    </span>
    <span className="whatsapp-widget__copy">
      <small>Available now</small>
      <strong>Chat on WhatsApp</strong>
    </span>
    <span className="whatsapp-widget__status" aria-hidden />
  </a>
);

export default WhatsAppWidget;
