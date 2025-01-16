// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({ 
//   // server: {
//   //   proxy: {
//   //     "/": "http://10.10.15.150:8081",      
//   //   }  
//   // }, 
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.10.15.150:8081',
  //       changeOrigin: true,
  //     },
  //   },
  // },
  plugins: [react()],
})
