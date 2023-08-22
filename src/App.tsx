// import { useState } from 'react'
import './App.css'
import DeviceList from './deviceList/DeviceList'
import ViewVideo from './viewStream/ViewVideo'

function App() {

	return (
		<div>
			<header> Media Streams demo </header>
			<main>
				<DeviceList />
				<ViewVideo />
			</main>
		</div>
	)
}

export default App
