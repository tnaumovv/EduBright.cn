import { forwardRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const Button = forwardRef(function Button(
  {
    as: Tag = 'button',
    variant = 'primary',
    className = '',
    children,
    arrow = true,
    ...props
  },
  ref,
) {
  return (
    <Tag
      ref={ref}
      {...(Tag === 'button' ? { type: 'button' } : {})}
      {...props}
      className={`button button--${variant} ${className}`}
    >
      <span className="button-label">{children}</span>
      {arrow && (
        <span className="button-arrow" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      )}
    </Tag>
  )
})
export default Button
