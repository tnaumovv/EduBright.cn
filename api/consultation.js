const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const cleanText = (value, maxLength) => String(value || '').trim().slice(0, maxLength)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Метод не поддерживается.' })
  }

  const name = cleanText(req.body?.name, 120)
  const phone = cleanText(req.body?.phone, 40)
  const email = cleanText(req.body?.email, 160)
  const message = cleanText(req.body?.message, 2000)

  const phoneDigits = phone.replace(/\D/g, '')
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!name || phoneDigits.length < 6 || !validEmail) {
    return res.status(400).json({ success: false, error: 'Проверьте заполнение обязательных полей.' })
  }

  const { BOT_TOKEN, CHAT_ID } = process.env
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram environment variables are not configured')
    return res.status(500).json({ success: false, error: 'Сервис временно недоступен. Попробуйте позднее.' })
  }

  const text = [
    '🎓 <b>Новая заявка с сайта!</b>',
    '',
    `👤 <b>ФИО:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
    `📧 <b>Почта:</b> ${escapeHtml(email)}`,
    `💬 <b>Сообщение:</b> ${message ? escapeHtml(message) : '—'}`,
  ].join('\n')

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    })

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text()
      console.error('Telegram API error:', telegramResponse.status, telegramError)
      return res.status(500).json({ success: false, error: 'Не удалось отправить заявку. Попробуйте ещё раз.' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Consultation request error:', error)
    return res.status(500).json({ success: false, error: 'Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз.' })
  }
}
