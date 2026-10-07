import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react'
import {
  initialForm,
  validationRules,
  sendConsultation,
} from '../lib/consultation'
import Button from './ui/Button'

const fields = [
  {
    name: 'name',
    label: 'ФИО',
    placeholder: 'Как к вам обращаться',
    autocomplete: 'name',
    maxLength: 120,
  },
  {
    name: 'phone',
    label: 'Номер телефона',
    placeholder: '+7 (___) ___-__-__',
    autocomplete: 'tel',
    type: 'tel',
    maxLength: 40,
  },
  {
    name: 'email',
    label: 'Электронная почта',
    placeholder: 'you@example.com',
    autocomplete: 'email',
    type: 'email',
    maxLength: 160,
  },
]

export default function ConsultationForm() {
  const [status, setStatus] = useState({ type: 'idle', text: '' })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: initialForm, reValidateMode: 'onChange' })
  async function submit(form) {
    setStatus({ type: 'idle', text: '' })
    try {
      await sendConsultation(form)
      reset()
      setStatus({
        type: 'success',
        text: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
      })
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    }
  }
  return (
    <div className="form-card">
      <div className="form-heading">
        <span className="form-kicker">ДАВАЙТЕ ПОЗНАКОМИМСЯ</span>
        <h3>Получите консультацию</h3>
        <p>Расскажите о своей цели. Остальное обсудим вместе.</p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        onInput={() => {
          if (status.type !== 'idle') setStatus({ type: 'idle', text: '' })
        }}
      >
        {fields.map((field) => (
          <div className="form-field" key={field.name}>
            <label htmlFor={`consult-${field.name}`}>{field.label}</label>
            <input
              id={`consult-${field.name}`}
              type={field.type || 'text'}
              autoComplete={field.autocomplete}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `error-${field.name}` : undefined
              }
              aria-required="true"
              {...register(field.name, validationRules[field.name])}
            />
            {errors[field.name] && (
              <p id={`error-${field.name}`} className="field-error">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
        <div className="form-field">
          <label htmlFor="consult-message">
            Ваш вопрос <span>· необязательно</span>
          </label>
          <textarea
            id="consult-message"
            placeholder="Что вы хотели бы изучать?"
            rows={2}
            maxLength={2000}
            {...register('message', validationRules.message)}
          />
        </div>
        <Button
          className="submit-button"
          type="submit"
          disabled={isSubmitting}
          arrow={!isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={18} className="loading-icon" />
              Отправка…
            </>
          ) : (
            'Отправить заявку'
          )}
        </Button>
        {status.type !== 'idle' && (
          <p
            className={`form-status form-status--${status.type}`}
            role={status.type === 'error' ? 'alert' : 'status'}
          >
            {status.type === 'success' && (
              <CheckCircle2 size={18} aria-hidden="true" />
            )}
            {status.text}
          </p>
        )}
      </form>
      <p className="form-note">
        <ShieldCheck size={15} aria-hidden="true" />
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
      </p>
    </div>
  )
}
