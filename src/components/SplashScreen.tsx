import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'exiting'>('loading')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        // Slow at 70%, then quick finish
        const inc = p < 70 ? Math.random() * 8 + 4 : Math.random() * 15 + 8
        return Math.min(p + inc, 100)
      })
    }, 120)
    // Start exit after 2.4s
    const exitTimer = setTimeout(() => setPhase('exiting'), 2400)
    const doneTimer = setTimeout(() => onComplete(), 3000)
    return () => { clearInterval(interval); clearTimeout(exitTimer); clearTimeout(doneTimer) }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900
        ${phase === 'exiting' ? 'splash-exit' : ''}`}
      aria-label="Loading BE CAREFUL healthcare platform"
      role="status"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/5"
            style={{
              width:  `${(i + 1) * 160}px`,
              height: `${(i + 1) * 160}px`,
              top:    '50%',
              left:   '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 px-8">
        {/* Logo block */}
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          {/* Animated Medical Logo */}
          <div className="relative w-24 h-24 animate-float">
            {/* Outer ring */}
            <svg viewBox="0 0 96 96" className="w-full h-full absolute inset-0" aria-hidden="true">
              <circle cx="48" cy="48" r="44" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
              <circle cx="48" cy="48" r="44" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"
                strokeDasharray="276" strokeDashoffset="200"
                style={{ animation: 'spin 4s linear infinite', transformOrigin: 'center' }} />
            </svg>
            {/* Inner shield */}
            <div className="absolute inset-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
                {/* Medical cross */}
                <rect x="19" y="8"  width="10" height="32" rx="3" fill="white" />
                <rect x="8"  y="19" width="32" height="10" rx="3" fill="white" />
                {/* Heart */}
                <path d="M24 36 C24 36 16 30 16 24 C16 21 18 19 20.5 19 C22 19 23.2 19.8 24 21 C24.8 19.8 26 19 27.5 19 C30 19 32 21 32 24 C32 30 24 36 24 36Z"
                  fill="rgba(59,151,245,0.4)" />
              </svg>
            </div>
          </div>

          {/* Brand name */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
              BE CAREFUL
            </h1>
            <p className="mt-2 text-sm sm:text-base font-medium text-primary-200 tracking-widest uppercase">
              Your Health. Your Care. Your Information.
            </p>
          </div>
        </div>

        {/* ECG line */}
        <div className="w-64 sm:w-80 h-12 overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 320 48" className="w-full h-full" preserveAspectRatio="none">
            <path
              className="ecg-line"
              d="M0,24 L40,24 L50,24 L55,8 L60,40 L65,4 L70,44 L75,24 L90,24 L130,24 L140,24 L145,8 L150,40 L155,4 L160,44 L165,24 L180,24 L220,24 L230,24 L235,8 L240,40 L245,4 L250,44 L255,24 L270,24 L320,24"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Loading text + progress */}
        <div className="flex flex-col items-center gap-3 w-64 sm:w-80">
          <p className="text-sm font-medium text-primary-200 animate-pulse-slow">
            Preparing your healthcare experience…
          </p>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white/50 tabular-nums">{Math.round(progress)}%</p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xs animate-fade-in">
          {['Doctors', 'Appointments', 'Records', 'Queue', 'Wellness'].map(f => (
            <span key={f} className="px-3 py-1 text-xs font-medium bg-white/10 border border-white/20 text-white/80 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom disclaimer */}
      <p className="absolute bottom-6 text-center text-xs text-white/40 px-6 max-w-md">
        Educational healthcare information platform. Always consult a qualified healthcare professional for medical advice.
      </p>
    </div>
  )
}
