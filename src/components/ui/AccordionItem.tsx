import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen?: boolean
  onToggle?: () => void
}

export function AccordionItem({ question, answer, isOpen = false, onToggle }: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const expanded = isOpen !== undefined ? isOpen : internalOpen

  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalOpen(!internalOpen)
    }
  }

  return (
    <div className="border-b border-azul-claro/50">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-5 px-4 md:px-6 text-left hover:bg-azul-claro/20 transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
        aria-expanded={expanded}
      >
        <span className="font-body font-semibold text-chocolate-escuro pr-4 text-sm md:text-base">
          {question}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-chocolate" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-4 md:px-6 pb-5 text-cinza text-sm md:text-base font-body leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
