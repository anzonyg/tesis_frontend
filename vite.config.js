import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Necesario para resolver rutas

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // Ignorar el elemento 'Line' como custom element nativo
        isCustomElement: (tag) => tag === 'Line',
      }
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Configura el alias @ a la carpeta src
    },
  },
});
