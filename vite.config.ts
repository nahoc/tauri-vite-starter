import svgr from '@honkhonk/vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import path from 'path'
import summary from 'rollup-plugin-summary'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

import { dependencies } from './package.json'

const renderChunks = (deps: Record<string, string>) => {
	const chunks = {}

	Object.keys(deps).forEach((key) => {
		if (['react', 'react-dom'].includes(key)) return
		chunks[key] = [key]
	})
	return chunks
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		AutoImport({
			imports: [
				'react',
				{
					react: [
						// named imports
						'memo',
						'createContext',
					],
				},
			],
			dts: './src/auto-imports.d.ts',
			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
		}),
		react(),
		svgr(),
		// @ts-ignore
		summary({
			showBrotliSize: false,
		}),
	],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
	},
	build: {
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					...renderChunks(dependencies),
				},
				chunkFileNames: '[name].[hash].js',
			},
		},
	},
})
