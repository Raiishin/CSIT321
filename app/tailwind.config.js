/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				purple: "#343a5e",
				blue: "#1E40AF",
				"light-blue": "#3B82F6",
				brown: "#AC8B54",
				"light-brown": "#4C453C",
				"dark-brown": "#272320",
				"light-gray": "#d1d5db",
				"dark-gray": "#4b5563",
				red: "#ef4444",
				cyan: "#06b6d4",
				"dark-cyan": "#0e7490",
			},
		},
	},
	plugins: [],
};
