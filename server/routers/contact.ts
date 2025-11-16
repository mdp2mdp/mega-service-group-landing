import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { ENV } from '../_core/env';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, 'Consent is required'),
});

async function sendToTelegram(data: z.infer<typeof contactFormSchema>) {
  if (!ENV.telegramBotToken || !ENV.telegramChatId) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  const message = `
📋 <b>Новая заявка с сайта</b>

👤 <b>Имя:</b> ${escapeHtml(data.name)}
🏢 <b>Компания:</b> ${escapeHtml(data.company)}
📞 <b>Телефон:</b> ${escapeHtml(data.phone)}
📧 <b>Email:</b> ${escapeHtml(data.email)}

📝 <b>Описание проекта:</b>
${escapeHtml(data.message)}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: ENV.telegramChatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export const contactRouter = router({
  submitForm: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        const success = await sendToTelegram(input);
        
        if (!success) {
          return {
            success: false,
            message: 'Ошибка при отправке заявки. Пожалуйста, попробуйте позже.',
          };
        }

        return {
          success: true,
          message: 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
        };
      } catch (error) {
        console.error('Form submission error:', error);
        return {
          success: false,
          message: 'Ошибка при отправке заявки. Пожалуйста, попробуйте позже.',
        };
      }
    }),
});
