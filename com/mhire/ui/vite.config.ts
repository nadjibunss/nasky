import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // We no longer use `root` to avoid pathing issues in Vercel's build environment.
  // Instead, we specify the input directly in rollupOptions.
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      // Alias must point to the full path from the project root
      "@": path.resolve(__dirname, "com/mhire/ui/src")
    }
  },
  build: {
    // Output to a 'dist' directory at the project root
    outDir: 'dist',
    sourcemap: mode === 'development',
    rollupOptions: {
      // Specify the entry point of the application
      input: 'com/mhire/ui/index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));