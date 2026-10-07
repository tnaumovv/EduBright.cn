import test from 'node:test'
import assert from 'node:assert/strict'
import { sendConsultation, validationRules } from './consultation.js'

test('contact validation rejects blanks and accepts formatted phone numbers', () => {
  assert.equal(validationRules.name.validate('   '), 'Укажите ваше ФИО.')
  assert.equal(validationRules.phone.validate('+7 (700) 123-45-67'), true)
  assert.equal(
    validationRules.phone.validate('123'),
    'Укажите корректный номер телефона.',
  )
  assert.equal(validationRules.email.validate(' student@example.com '), true)
  assert.equal(
    validationRules.email.validate('student@'),
    'Укажите почту в формате name@example.com.',
  )
})

test('submission preserves the existing endpoint and four-field payload', async () => {
  const form = {
    name: 'Тест',
    phone: '+77001234567',
    email: 'test@example.com',
    message: 'HSK',
  }
  await sendConsultation(form, async (url, options) => {
    assert.equal(url, '/api/consultation')
    assert.equal(options.method, 'POST')
    assert.deepEqual(JSON.parse(options.body), form)
    return { ok: true, json: async () => ({ success: true }) }
  })
})

test('an HTTP success without application confirmation cannot become a sent application', async () => {
  await assert.rejects(
    sendConsultation({}, async () => ({ ok: true, json: async () => ({}) })),
    /Не удалось отправить заявку/,
  )
})

test('server unavailability is shown and unrecognized details are hidden', async () => {
  await assert.rejects(
    sendConsultation({}, async () => ({
      ok: false,
      json: async () => ({
        error: 'Сервис временно недоступен. Попробуйте позднее.',
      }),
    })),
    /Сервис временно недоступен/,
  )
  await assert.rejects(
    sendConsultation({}, async () => ({
      ok: false,
      json: async () => ({ error: 'Internal vendor exception' }),
    })),
    /Не удалось отправить заявку/,
  )
})

test('malformed responses and network failures remain retryable failures', async () => {
  await assert.rejects(
    sendConsultation({}, async () => ({
      ok: false,
      json: async () => {
        throw new Error('HTML')
      },
    })),
    /Не удалось отправить заявку/,
  )
  await assert.rejects(
    sendConsultation({}, async () => {
      throw new Error('Offline')
    }),
    /Проверьте подключение/,
  )
})
