module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
      optimizeCss: false,
      enableBabelRuntime: true,
  },
}
