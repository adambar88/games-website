import { useState, useEffect } from 'react'

interface AppEntry {
  title: string
  description: string
  path: string
  tags: string[]
  icon: React.ReactNode
}

// 2048 mini tile icon
const Icon2048 = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="6" fill="currentColor" fillOpacity="0.12" />
    <text x="18" y="24" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif" fill="currentColor">2048</text>
  </svg>
)

// Snake icon — 4 segments in an S-curve
const IconSnake = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="6" fill="currentColor" fillOpacity="0.12" />
    <rect x="8" y="10" width="7" height="7" rx="2" fill="currentColor" />
    <rect x="15" y="10" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.6" />
    <rect x="15" y="17" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.4" />
    <rect x="22" y="17" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.25" />
  </svg>
)

// Quiz icon — Question mark symbol
const IconQuiz = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="6" fill="currentColor" fillOpacity="0.12" />
    <path d="M14 12.5C14 10.567 15.567 9 17.5 9H18.5C20.433 9 22 10.567 22 12.5C22 13.914 21.162 15.132 19.953 15.688C18.847 16.196 18 17.152 18 18.5V19.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="18" cy="24.5" r="1.5" fill="currentColor" />
  </svg>
)

const apps: AppEntry[] = [
  {
    title: '2048',
    description: 'The classic sliding puzzle game. Merge tiles to reach 2048 — with multiple grid sizes and a challenge mode.',
    path: '/2048/',
    tags: ['game', 'react'],
    icon: <Icon2048 />,
  },
  {
    title: 'Snake',
    description: 'The classic snake game. Eat food, grow longer — three speeds, stats tracking, and keyboard or swipe controls.',
    path: '/snake/',
    tags: ['game', 'react'],
    icon: <IconSnake />,
  },
  {
    title: 'Quiz',
    description: 'AI-powered trivia & static quiz game with speed decay scoring, adaptive ELO survival, blitz mode & daily challenges.',
    path: '/quiz/',
    tags: ['game', 'react', 'ai'],
    icon: <IconQuiz />,
  },
]

type View = 'list' | 'grid' | 'compact' | 'drawer'

const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="1" y1="3.5" x2="13" y2="3.5" /><line x1="1" y1="7" x2="13" y2="7" /><line x1="1" y1="10.5" x2="13" y2="10.5" />
  </svg>
)
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="5" height="5" rx="1" /><rect x="8" y="1" width="5" height="5" rx="1" />
    <rect x="1" y="8" width="5" height="5" rx="1" /><rect x="8" y="8" width="5" height="5" rx="1" />
  </svg>
)
const IconCompact = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="1" y1="2.5" x2="13" y2="2.5" /><line x1="1" y1="5.5" x2="13" y2="5.5" />
    <line x1="1" y1="8.5" x2="13" y2="8.5" /><line x1="1" y1="11.5" x2="13" y2="11.5" />
  </svg>
)
const IconDrawer = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="1" width="3.5" height="3.5" rx="0.8" /><rect x="5.25" y="1" width="3.5" height="3.5" rx="0.8" /><rect x="9.5" y="1" width="3.5" height="3.5" rx="0.8" />
    <rect x="1" y="5.25" width="3.5" height="3.5" rx="0.8" /><rect x="5.25" y="5.25" width="3.5" height="3.5" rx="0.8" /><rect x="9.5" y="5.25" width="3.5" height="3.5" rx="0.8" />
    <rect x="1" y="9.5" width="3.5" height="3.5" rx="0.8" /><rect x="5.25" y="9.5" width="3.5" height="3.5" rx="0.8" /><rect x="9.5" y="9.5" width="3.5" height="3.5" rx="0.8" />
  </svg>
)

function App() {
  const [view, setView] = useState<View>('list')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const urlTheme = new URLSearchParams(window.location.search).get('theme') as 'dark' | 'light' | null
    if (urlTheme === 'light' || urlTheme === 'dark') {
      localStorage.setItem('barczynski-theme', urlTheme)
      const url = new URL(window.location.href)
      url.searchParams.delete('theme')
      history.replaceState(null, '', url.pathname + (url.search || ''))
      return urlTheme
    }
    return (localStorage.getItem('barczynski-theme') as 'dark' | 'light') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('barczynski-theme', theme)
  }, [theme])

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        const stored = (localStorage.getItem('barczynski-theme') as 'dark' | 'light') || 'dark'
        const s = document.createElement('style')
        s.textContent = '*,*::before,*::after{transition:none!important}'
        document.head.appendChild(s)
        document.documentElement.setAttribute('data-theme', stored)
        setTheme(stored)
        requestAnimationFrame(() => document.head.removeChild(s))
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="min-h-[100dvh] flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-[700px] flex flex-col flex-1">

        {/* Header */}
        <header className="mb-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight">
            games.barczynski<span style={{ color: 'var(--c-muted)', fontWeight: 400 }}>.dev</span>
          </div>
          <a href={`https://barczynski.dev?theme=${theme}`} className="text-xs transition-colors" style={{ color: 'var(--c-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
            ← barczynski.dev
          </a>
        </header>

        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--c-dim)' }}>{apps.length} game{apps.length !== 1 ? 's' : ''}</span>
          <div className="flex items-center gap-3">
            {/* View toggles */}
            <div className="flex gap-1 p-1 rounded-md" style={{ background: 'var(--c-toolbar-bg)', border: '1px solid var(--c-toolbar-border)' }}>
              {([['list', <IconList />, 'List view'], ['grid', <IconGrid />, 'Grid view'], ['compact', <IconCompact />, 'Compact view'], ['drawer', <IconDrawer />, 'Drawer view']] as [View, React.ReactNode, string][]).map(([v, icon, label]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={label}
                  aria-pressed={view === v}
                  style={{
                    background: view === v ? 'var(--c-btn-active)' : 'transparent',
                    color: view === v ? 'var(--c-text)' : 'var(--c-arrow)',
                    border: 'none', cursor: 'pointer', padding: '5px 8px',
                    borderRadius: '5px', display: 'flex', alignItems: 'center', transition: 'all 0.15s',
                  }}
                >{icon}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Apps — List view */}
        {view === 'list' && (
          <main className="flex-1">
            <div style={{ borderTop: '1px solid var(--c-border)' }}>
              {apps.map((app) => (
                <a key={app.path} href={app.path}
                  className="group flex items-center justify-between py-5 transition-colors"
                  style={{ borderBottom: '1px solid var(--c-border)', textDecoration: 'none', color: 'inherit' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{app.icon}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold">{app.title}</span>
                        <div className="flex gap-1.5">
                          {app.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded"
                              style={{ background: 'var(--c-tag-bg)', color: 'var(--c-tag)', border: '1px solid var(--c-tag-border)' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{app.description}</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 ml-6 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--c-arrow)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
              <div className="py-6" style={{ borderBottom: '1px solid var(--c-border)', color: 'var(--c-dim)' }}>
                <span className="text-sm">More coming soon...</span>
              </div>
            </div>
          </main>
        )}

        {/* Apps — Grid view */}
        {view === 'grid' && (
          <main className="flex-1">
            <div className="grid grid-cols-2 gap-3">
              {apps.map((app) => (
                <a key={app.path} href={app.path}
                  className="group flex flex-col justify-between p-5 rounded-lg transition-all"
                  style={{ background: 'var(--c-card)', border: '1px solid var(--c-card-border)', textDecoration: 'none', color: 'inherit', minHeight: '140px' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--c-card-border-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--c-card-border)')}>
                  <div>
                    <div className="mb-3">{app.icon}</div>
                    <div className="flex gap-1.5 mb-2">
                      {app.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{ background: 'var(--c-tag-bg)', color: 'var(--c-tag)', border: '1px solid var(--c-tag-border)' }}>{tag}</span>
                      ))}
                    </div>
                    <div className="text-sm font-semibold mb-1">{app.title}</div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{app.description}</p>
                  </div>
                  <div className="mt-4 text-xs flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: 'var(--c-arrow)' }}>
                    Launch
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              ))}
              <div className="flex flex-col items-center justify-center p-5 rounded-lg text-center"
                style={{ background: 'var(--c-soon-bg)', border: '1px dashed var(--c-border)', minHeight: '140px', color: 'var(--c-soon-text)' }}>
                <span className="text-sm">More soon</span>
              </div>
            </div>
          </main>
        )}

        {/* Apps — Compact view */}
        {view === 'compact' && (
          <main className="flex-1">
            <div style={{ borderTop: '1px solid var(--c-border)' }}>
              {apps.map((app) => (
                <a key={app.path} href={app.path}
                  className="group flex items-center justify-between py-3 transition-colors"
                  style={{ borderBottom: '1px solid var(--c-border)', textDecoration: 'none', color: 'inherit' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0" style={{ transform: 'scale(0.7)', transformOrigin: 'left center' }}>{app.icon}</div>
                    <span className="text-sm font-semibold">{app.title}</span>
                    <div className="flex gap-1.5">
                      {app.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{ background: 'var(--c-tag-bg)', color: 'var(--c-tag)', border: '1px solid var(--c-tag-border)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <svg className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--c-arrow)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
              <div className="py-3" style={{ borderBottom: '1px solid var(--c-border)', color: 'var(--c-soon-text)' }}>
                <span className="text-xs">More coming soon...</span>
              </div>
            </div>
          </main>
        )}

        {/* Apps — Drawer view */}
        {view === 'drawer' && (
          <main className="flex-1">
            <div className="flex flex-wrap gap-8 pt-4">
              {apps.map((app) => (
                <a key={app.path} href={app.path}
                  className="group flex flex-col items-center gap-2 transition-opacity"
                  style={{ textDecoration: 'none', color: 'inherit', width: '64px' }}>
                  <div className="transition-transform duration-150 group-hover:scale-110">{app.icon}</div>
                  <span className="text-xs text-center leading-tight" style={{ color: 'var(--c-muted)' }}>{app.title}</span>
                </a>
              ))}
              <div className="flex flex-col items-center gap-2" style={{ width: '64px', opacity: 0.25 }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--c-card)', border: '1px dashed var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-arrow)', fontSize: 18 }}>+</div>
                <span className="text-xs text-center" style={{ color: 'var(--c-arrow)' }}>Soon</span>
              </div>
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--c-border)' }}>
          <span className="text-xs" style={{ color: 'var(--c-muted)' }}>&copy; 2026 Adam Barczynski</span>
          <div className="flex gap-3">
            <a href="https://github.com/adambar88" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--c-muted)', transition: 'color 0.2s', padding: '10px', margin: '-10px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/adambarczynski88" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--c-muted)', transition: 'color 0.2s', padding: '10px', margin: '-10px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </footer>

      </div>
      {/* Theme toggle - fixed top right */}
      <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle theme" style={{ position: 'fixed', top: '0.625rem', right: '0.625rem', zIndex: 50, background: 'none', border: 'none', cursor: 'pointer', padding: '10px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-muted)' }}>
        {theme === 'dark'
          ? <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
          : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        }
      </button>
    </div>
  )
}

export default App

