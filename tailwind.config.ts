// tailwind.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			prefix: 'nextui', // prefix for themes variables
			addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
			defaultTheme: 'light', // default theme from the themes object
			defaultExtendTheme: 'light', // default theme to extend on custom themes
			layout: {
				radius: {
					small: '2px', // rounded-small
					medium: '4px', // rounded-medium
					large: '6px', // rounded-large
				},
				borderWidth: {
					small: '1px', // border-small
					medium: '1px', // border-medium
					large: '2px', // border-large
				},
			},

			themes: {
				light: {
					layout: {},
					colors: {
						primary: {
							DEFAULT: '#00B4CC',
							10: '#e6f8fa',
							20: '#a3e4ec',
							30: '#D6F3F7',
							40: '#38DAE0',
							50: '#00B4CC',
							60: '#008CAF',
							70: '#006A92',
							80: '#004C76',
							90: '#003761',
							foreground: '#ffffff',
						},

						secondary: {
							DEFAULT: '#003F80',
							10: '#F5F7FA',
							20: '#A3BAD1',
							30: '#d6e0eb',
							40: '#2C75B2',
							50: '#003F80',
							60: '#00306E',
							70: '#00245C',
							80: '#00194A',
							90: '#00123D',
							foreground: '#ffffff',
						},

						danger: {
							DEFAULT: '#f87171',
							10: '#FEF2E6',
							20: '#FDE1CE',
							30: '#FBCCB5',
							40: '#F7B7A1',
							50: '#F39682',
							60: '#D06A5F',
							70: '#AE4441',
							80: '#8C292E',
							90: '#741824',
							foreground: '#ffffff',
						},

						success: {
							DEFAULT: '#83C036',
							10: '#F2FBD7',
							20: '#E2F8B1',
							30: '#C8EC86',
							40: '#AAD964',
							50: '#83C036',
							60: '#67A527',
							70: '#4F8A1B',
							80: '#396F11',
							90: '#295C0A',
							foreground: '#ffffff',
						},

						warning: {
							DEFAULT: '#F3C682',
							10: '#FEF8E6',
							20: '#FDF0CE',
							30: '#FBE5B5',
							40: '#F7D8A1',
							50: '#F3C682',
							60: '#D09E5F',
							70: '#AE7A41',
							80: '#8C5929',
							90: '#744118',
							foreground: '#ffffff',
						},
					},
				},
				dark: {
					layout: {}, // dark theme layout tokens
					colors: {}, // dark theme colors
				},
				// ... custom themes
			},
		}),
	],
};
