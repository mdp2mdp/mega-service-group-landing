import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submitForm: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        company: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
        consent: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log('[Contact Form] Submission received:', input);

          // Send to Telegram
          if (ENV.telegramBotToken && ENV.telegramChatId) {
            const telegramMessage = `
📋 <b>Новая заявка с сайта</b>

👤 <b>Имя:</b> ${escapeHtml(input.name)}
🏢 <b>Компания:</b> ${escapeHtml(input.company)}
📞 <b>Телефон:</b> ${escapeHtml(input.phone)}
📧 <b>Email:</b> ${escapeHtml(input.email)}

📝 <b>Описание проекта:</b>
${escapeHtml(input.message)}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
            `.trim();

            try {
              const telegramResponse = await fetch(
                `https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: ENV.telegramChatId,
                    text: telegramMessage,
                    parse_mode: 'HTML',
                  }),
                }
              );

              if (!telegramResponse.ok) {
                console.error('Telegram API error:', await telegramResponse.text());
              }
            } catch (error) {
              console.error('Failed to send Telegram message:', error);
            }
          }

          // Send confirmation email to user
          const emailContent = `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #0f5a6b; border-bottom: 2px solid #0f5a6b; padding-bottom: 10px;">
                    Спасибо за вашу заявку!
                  </h2>
                  
                  <p>Уважаемый(ая) <strong>${input.name}</strong>,</p>
                  
                  <p>Мы получили вашу заявку и благодарим вас за интерес к услугам компании <strong>Мега-Сервис-Групп</strong>.</p>
                  
                  <h3 style="color: #0f5a6b; margin-top: 30px;">Данные вашей заявки:</h3>
                  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background-color: #f5f5f5;">
                      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Имя:</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${input.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Компания:</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${input.company}</td>
                    </tr>
                    <tr style="background-color: #f5f5f5;">
                      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Телефон:</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${input.phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${input.email}</td>
                    </tr>
                    <tr style="background-color: #f5f5f5;">
                      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Описание проекта:</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${input.message.replace(/\n/g, '<br>')}</td>
                    </tr>
                  </table>
                  
                  <p style="margin-top: 30px;">
                    Наша команда проанализирует вашу заявку и свяжется с вами в течение <strong>24 часов</strong> для обсуждения деталей вашего проекта.
                  </p>
                  
                  <p style="margin-top: 20px;">
                    Если у вас есть срочные вопросы, вы можете связаться с нами:
                  </p>
                  <ul>
                    <li>Телефон: <strong>+7 926 169-29-70</strong></li>
                    <li>Email: <strong>info@mgservis.ru</strong></li>
                  </ul>
                  
                  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                  
                  <p style="font-size: 12px; color: #666; text-align: center;">
                    ООО "Мега-Сервис-Групп"<br>
                    Комплексные поставки оборудования<br>
                    Москва, Россия
                  </p>
                </div>
              </body>
            </html>
          `;

          try {
            const emailResponse = await fetch(`${process.env.BUILT_IN_FORGE_API_URL}/notification/email`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
              },
              body: JSON.stringify({
                to: input.email,
                subject: 'Подтверждение получения вашей заявки - Мега-Сервис-Групп',
                html: emailContent,
              }),
            });

            if (!emailResponse.ok) {
              console.error('Failed to send email:', await emailResponse.text());
            }
          } catch (error) {
            console.error('Error sending email:', error);
          }

          return {
            success: true,
            message: 'Заявка успешно отправлена',
          };
        } catch (error) {
          console.error('Error submitting form:', error);
          return {
            success: false,
            message: 'Ошибка при отправке заявки',
          };
        }
      }),
  }),
});

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

export type AppRouter = typeof appRouter;
