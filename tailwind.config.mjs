/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'accent-primary': '#D0E2B0',
				'bg': {
					'dark-blue': '#0F2027',
					'mid-blue': '#203A43',
					'light-blue': '#2C5364'
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}
