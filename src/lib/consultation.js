export const initialForm = { name: '', phone: '', email: '', message: '' }
export const validationRules = {
  name: {
    required: 'Укажите ваше ФИО.',
    validate: (value) => Boolean(value.trim()) || 'Укажите ваше ФИО.',
    maxLength: { value: 120, message: 'Введите не больше 120 символов.' },
  },
  phone: {
    required: 'Укажите номер телефона.',
    validate: (value) =>
      value.replace(/\D/g, '').length >= 6 ||
      'Укажите корректный номер телефона.',
    maxLength: { value: 40, message: 'Проверьте номер телефона.' },
  },
  email: {
    required: 'Укажите электронную почту.',
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
      'Укажите почту в формате name@example.com.',
    maxLength: { value: 160, message: 'Проверьте адрес почты.' },
  },
  message: {
    maxLength: { value: 2000, message: 'Введите не больше 2000 символов.' },
  },
}

export async function sendConsultation(form, request = fetch) {
  let response
  try {
    response = await request('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
  } catch {
    throw new Error('Проверьте подключение и попробуйте ещё раз.')
  }
  const result = await response.json().catch(() => ({}))
  if (!response.ok || result.success !== true) {
    const allowed = [
      'Сервис временно недоступен. Попробуйте позднее.',
      'Проверьте заполнение обязательных полей.',
      'Не удалось отправить заявку. Попробуйте ещё раз.',
      'Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз.',
    ]
    throw new Error(
      allowed.includes(result.error)
        ? result.error
        : 'Не удалось отправить заявку. Попробуйте ещё раз.',
    )
  }
}
