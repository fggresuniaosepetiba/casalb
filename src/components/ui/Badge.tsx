interface BadgeProps {
  text: string
  variant?: 'default' | 'success' | 'accent'
}

export function Badge({ text, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'bg-azul-claro text-chocolate-escuro',
    success: 'bg-sucesso/20 text-green-700',
    accent: 'bg-chocolate text-white',
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-accent font-semibold ${styles[variant]}`}
    >
      {text}
    </span>
  )
}
