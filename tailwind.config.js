/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        // etc...
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        header: ['Outfit', 'sans-serif']
      },
      colors: {
        bg: '#FAFAFA',
        primary: '#FF5400',
        secondaryo: '#FFECE3',
        secondary2: '#FFCBB2',
        black: '#333333',
        success: '#108A00',
        greyDark: '#8A8A8A',
        greyCold: '#E7E7E7',
        darkPrimary: '#D24500',
        border: '#E7E7E7', // ta3 les border kamel + ta3 scroll kima wilaya w contact list...
        input: '#FF5400', //l border ta3 l input // gla3tha manich nekhdem biha
        ring: '#FF5400', // li tekhroj ki t focus 3la input // gla3tha manich nekhdem biha
        background: 'white',
        foreground: '#333333',
        primary: {
          DEFAULT: '#FF5400',
          foreground: 'white' // l ketba li dakhel el button el orange
        },
        secondary: {
          DEFAULT: '#FFCBB2',
          foreground: '#FF5400'
        },
        destructive: {
          DEFAULT: '#C01813',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px'
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.2s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.2s ease-in forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
