// @ts-nocheck
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { appWindow } from '@tauri-apps/api/window'

import App from './App'

document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize())
//document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize())
document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close())

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root'),
)
