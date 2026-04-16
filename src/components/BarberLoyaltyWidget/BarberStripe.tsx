// Decorative barber-pole diagonal stripe pattern
// Positioned at the right edge of the widget card

interface BarberStripeProps {
  theme: 'dark' | 'light'
}

export function BarberStripe({ theme }: BarberStripeProps) {
  const opacity = theme === 'light' ? 0.12 : 0.07

  return (
    <div
      className="absolute top-0 right-0 w-14 h-full overflow-hidden rounded-r-[28px] pointer-events-none"
      style={{ opacity }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-20 h-3"
          style={{
            // Repeating: red → white → blue  (barber pole colors)
            background: i % 3 === 0 ? '#dc2626' : i % 3 === 1 ? '#ffffff' : '#1d4ed8',
            top: `${i * 16 - 8}px`,
            right: '-16px',
            transform: 'rotate(-45deg)',
            transformOrigin: 'right center',
          }}
        />
      ))}
    </div>
  )
}
