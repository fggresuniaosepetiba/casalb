import type { CartItem, PaymentInfo } from '../types'
import { WHATSAPP_PHONE, WHATSAPP_GREETING } from '../data/whatsapp'

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

const PAYMENT_LABELS: Record<string, string> = {
  pix: 'PIX',
  debito: 'Cartão de Débito',
  credito: 'Cartão de Crédito',
  dinheiro: 'Dinheiro',
}

export function buildWhatsAppMessage(items: CartItem[], payment?: PaymentInfo): string {
  const lines: string[] = []

  lines.push(WHATSAPP_GREETING)
  lines.push('')
  lines.push('📦 *Meu Pedido:*')
  lines.push('─'.repeat(20))

  let total = 0

  for (const item of items) {
    let baseTotal: number
    if (item.flavors) {
      const totalUnits = item.flavors.reduce((s, f) => s + f.quantity, 0)
      const centos = Math.ceil(totalUnits / 100)
      baseTotal = item.product.price * centos
    } else {
      baseTotal = item.product.price * item.quantity
    }
    const surcharge = item.fillingSurcharge ?? 0
    const itemTotal = baseTotal + surcharge
    total += itemTotal

    lines.push('')

    if (item.flavors) {
      lines.push(`🍬 *${item.product.name}*`)
      const flavorParts = item.flavors.map((f) => `${f.quantity}x ${f.name}`)
      lines.push(`   Sabores: ${flavorParts.join(', ')}`)
      const totalUnits = item.flavors.reduce((s, f) => s + f.quantity, 0)
      lines.push(`   Total: ${totalUnits} unidades`)
      lines.push(`   Valor: ${formatCurrency(itemTotal)}`)
    } else {
      lines.push(`🍬 *${item.product.name}*`)

      if (item.selectedOption) {
        lines.push(`   Recheio/Sabor: ${item.selectedOption}`)
      }

      lines.push(`   Qtd: ${item.quantity}x  |  ${formatCurrency(item.product.price)} cada`)
      lines.push(`   Subtotal: ${formatCurrency(baseTotal)}`)

      if (surcharge > 0) {
        lines.push(`   ➕ Adicional recheio especial: ${formatCurrency(surcharge)}`)
        lines.push(`   Total item: ${formatCurrency(itemTotal)}`)
      }
    }
  }

  lines.push('')
  lines.push('─'.repeat(20))
  lines.push(`💰 *Valor Aproximado: ${formatCurrency(total)}*`)

  if (payment) {
    lines.push('')
    lines.push(`💳 *Pagamento: ${PAYMENT_LABELS[payment.method]}*`)

    if (payment.method === 'dinheiro' && payment.cashAmount) {
      const change = payment.cashAmount - total
      lines.push(`   Vou pagar: ${formatCurrency(payment.cashAmount)}`)
      if (change > 0) {
        lines.push(`   Troco: ${formatCurrency(change)}`)
      }
    }
  }

  lines.push('')
  lines.push('Aguardo confirmação! Obrigada! 💜')

  return encodeURIComponent(lines.join('\n'))
}

export function getWhatsAppUrl(items: CartItem[], payment?: PaymentInfo): string {
  const message = items.length > 0
    ? buildWhatsAppMessage(items, payment)
    : encodeURIComponent(WHATSAPP_GREETING)

  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`
}
