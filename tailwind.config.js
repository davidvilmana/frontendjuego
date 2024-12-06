/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Usa 'media' para cambiar automáticamente según el sistema operativo
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que Tailwind procese tus archivos
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
