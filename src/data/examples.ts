import { DemoExample } from '../types';

export const DEMO_EXAMPLES: DemoExample[] = [
  {
    id: 'high-pressure-money',
    title: 'Urgent Wire Request',
    previewLabel: 'High Pressure Example',
    senderName: 'Alex',
    senderDetail: 'iMessage',
    timeString: '10:42 AM',
    messageText:
      "Hey, I need you to send ₦50,000 right now.\nPlease don't tell anyone yet.\nI'll explain everything later.\nIt's really important.",
    expectedLevel: 'high',
    tag: 'Urgency & Secrecy',
  },
  {
    id: 'low-pressure-casual',
    title: 'Weekend Recipe Note',
    previewLabel: 'Low Pressure Example',
    senderName: 'Maya',
    senderDetail: 'Messages',
    timeString: '2:15 PM',
    messageText:
      'Hey! Hope your week is going well. Whenever you have a chance this weekend, could you check the recipe link I emailed you? No rush at all!',
    expectedLevel: 'low',
    tag: 'No Urgency • Benign',
  },
  {
    id: 'authority-security-alert',
    title: 'Bank Security Alert',
    previewLabel: 'Authority Alert Example',
    senderName: 'SecurBank Alert',
    senderDetail: 'SMS • Verified',
    timeString: '3:05 PM',
    messageText:
      'ALERT: Your account was flagged for suspicious activity. Transfer your balance to the safety reserve vault within 15 minutes to prevent suspension.',
    expectedLevel: 'high',
    tag: 'Authority & Panic',
  },
];

/**
 * Creates an authentic mobile chat screenshot rendered dynamically onto an HTML5 canvas.
 * Returns a PNG data URL.
 */
export function generateChatScreenshot(example: DemoExample): string {
  const canvas = document.createElement('canvas');
  const scale = 2; // high-DPI crisp rendering
  const width = 380 * scale;
  const height = 480 * scale;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = '#18181B'; // Charcoal dark mode message UI
  ctx.fillRect(0, 0, 380, 480);

  // Status Bar
  ctx.fillStyle = '#A1A1AA';
  ctx.font = '600 11px system-ui, -apple-system, sans-serif';
  ctx.fillText(example.timeString, 24, 28);

  // Status icons (battery, wifi dots representation)
  ctx.fillStyle = '#71717A';
  ctx.beginPath();
  ctx.arc(330, 24, 3, 0, Math.PI * 2);
  ctx.arc(340, 24, 3, 0, Math.PI * 2);
  ctx.arc(350, 24, 3, 0, Math.PI * 2);
  ctx.fill();

  // Header separator
  ctx.fillStyle = '#27272A';
  ctx.fillRect(0, 42, 380, 1);

  // Sender avatar
  ctx.fillStyle = '#3F3F46';
  ctx.beginPath();
  ctx.arc(42, 78, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F4F4F5';
  ctx.font = '700 13px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(example.senderName.charAt(0).toUpperCase(), 42, 83);

  // Sender details
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 14px system-ui, -apple-system, sans-serif';
  ctx.fillText(example.senderName, 70, 74);

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '400 11px system-ui, -apple-system, sans-serif';
  ctx.fillText(example.senderDetail || 'Direct Message', 70, 90);

  // Date bubble separator
  ctx.fillStyle = '#27272A';
  ctx.beginPath();
  ctx.roundRect(140, 122, 100, 22, 11);
  ctx.fill();

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '500 10px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Today, ' + example.timeString, 190, 137);

  // Message bubble
  const bubbleX = 24;
  const bubbleY = 164;
  const bubbleW = 300;
  const lines = example.messageText.split('\n');
  const bubbleH = Math.max(120, lines.length * 28 + 44);

  // Bubble background
  ctx.fillStyle = '#27272A';
  ctx.beginPath();
  ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 18);
  ctx.fill();

  // Bubble text
  ctx.textAlign = 'left';
  ctx.fillStyle = '#F4F4F5';
  ctx.font = '400 13.5px system-ui, -apple-system, sans-serif';

  let currentY = bubbleY + 28;
  lines.forEach((line) => {
    ctx.fillText(line, bubbleX + 16, currentY);
    currentY += 24;
  });

  // Timestamp inside bubble
  ctx.fillStyle = '#71717A';
  ctx.font = '400 10px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(example.timeString, bubbleX + bubbleW - 14, bubbleY + bubbleH - 12);

  // Subtle bottom input bar simulation
  ctx.fillStyle = '#222226';
  ctx.fillRect(0, 420, 380, 60);
  ctx.fillStyle = '#2E2E33';
  ctx.beginPath();
  ctx.roundRect(20, 432, 300, 36, 18);
  ctx.fill();

  ctx.fillStyle = '#71717A';
  ctx.font = '400 12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('iMessage...', 38, 455);

  return canvas.toDataURL('image/png');
}
