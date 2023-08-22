import { useState } from 'react'

const DeviceList = () => {
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
	const [errorMessage, setErrorMessage] = useState<string>()
	
	const handleShowDevices = async () => {
		if( !navigator.mediaDevices.enumerateDevices ) {
			setErrorMessage('Please upgrade your web browser to use this feature.')
			return
		}
		const ds: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices()
		setDevices(ds)
	}

	return (
		<div className="device-list">
			<button onClick={handleShowDevices}> Show my devices </button>

			<ol>
				{devices.map(d => (
					<li> {d.deviceId} - {d.groupId} - {d.kind} - {d.label} </li>
				))}
			</ol>

			<p> {errorMessage} </p>
		</div>
	)
}

export default DeviceList
