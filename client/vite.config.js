import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

    server: {
        //any request path that start with these keys will be proxied to the target.
        proxy: {}
    },
    plugins: [react()],
    publicDir: './src/assets'
})
