/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
  	fontSize: {
  		xs: [
  			'0.75rem',
  			{
  				lineHeight: '1rem'
  			}
  		],
  		sm: [
  			'0.875rem',
  			{
  				lineHeight: '1.5rem'
  			}
  		],
  		base: [
  			'1rem',
  			{
  				lineHeight: '1.75rem'
  			}
  		],
  		lg: [
  			'1.125rem',
  			{
  				lineHeight: '2rem'
  			}
  		],
  		xl: [
  			'1.25rem',
  			{
  				lineHeight: '2rem'
  			}
  		],
  		'2xl': [
  			'1.5rem',
  			{
  				lineHeight: '2rem'
  			}
  		],
  		'3xl': [
  			'2rem',
  			{
  				lineHeight: '2.5rem'
  			}
  		],
  		'4xl': [
  			'2.5rem',
  			{
  				lineHeight: '3.5rem'
  			}
  		],
  		'5xl': [
  			'3rem',
  			{
  				lineHeight: '3.5rem'
  			}
  		],
  		'6xl': [
  			'3.75rem',
  			{
  				lineHeight: '1'
  			}
  		],
  		'7xl': [
  			'4.5rem',
  			{
  				lineHeight: '1.1'
  			}
  		],
  		'8xl': [
  			'6rem',
  			{
  				lineHeight: '1'
  			}
  		],
  		'9xl': [
  			'8rem',
  			{
  				lineHeight: '1'
  			}
  		]
  	},
  	extend: {
  		maxWidth: {
  			'7xl': '90rem'
  		},
  		keyframes: {
  			marquee: {
  				'0%': {
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			marquee2: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(0%)'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: 0
  				},
  				to: {
  					opacity: 1
  				}
  			},
  			scroller3: {
  				'100%': {
  					transform: 'translateY(-50%)'
  				}
  			},
  			disco: {
  				'0%': {
  					transform: 'translateY(-50%) rotate(0deg)'
  				},
  				'100%': {
  					transform: 'translateY(-50%) rotate(360deg)'
  				}
  			},
  			'flip-down-out': {
  				'0%': {
  					transform: 'rotateX(0deg)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotateX(90deg)',
  					opacity: '0'
  				}
  			},
  			'flip-down-in': {
  				'0%': {
  					transform: 'rotateX(-90deg)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'rotateX(0deg)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee 25s linear infinite',
  			marquee2: 'marquee2 25s linear infinite',
  			'fade-in': 'fade-in 0.2s linear forwards',
  			disco: 'disco 1.5s linear infinite',
  			'flip-down-out': 'flip-down-out 0.5s ease-in forwards',
  			'flip-down-in': 'flip-down-in 0.5s ease-out forwards'
  		},
  		colors: {
  			vulcan: {
  				'50': '#EFF0F5',
  				'100': '#DFE1EC',
  				'200': '#BFC3D9',
  				'300': '#9FA5C6',
  				'400': '#8087B3',
  				'500': '#636CA1',
  				'600': '#4E5683',
  				'700': '#3B4163',
  				'800': '#282C43',
  				'900': '#151723',
  				'950': '#0B0D13'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'5xl': '3rem',
  			'6xl': '5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'Montserrat',
                    ...defaultTheme.fontFamily.sans
                ],
  			mono: [
  				'JetBrains Mono',
                    ...defaultTheme.fontFamily.mono
                ],
  			body: [
  				'Open Sans',
                    ...defaultTheme.fontFamily.sans
                ]
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
      require("tailwindcss-animate")
],
};
