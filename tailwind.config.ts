import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                dark: '#050505',
                card: '#0f0f0f',
                accent: '#ffffff',
                muted: '#888888',
            },
        },
    },
    plugins: [],
}

export default config
