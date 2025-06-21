import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode})  => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {port: env.VITE_PORT !== undefined ? parseInt(env.VITE_PORT) : 3001},
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    }
  }
})
