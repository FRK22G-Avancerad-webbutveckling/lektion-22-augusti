import { useRef } from 'react'

const ViewVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null)
	// { current: <video> }

	const handleStartStream = async () => {
		// TypeScript tror att videoRef.current kan vara antingen null eller <video>
		if( !videoRef.current ) return
		const vid: HTMLVideoElement = videoRef.current

		const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
			video: true, audio: false  // För att hindra rundgång i klassrummet
		})
	
		vid.addEventListener('loadeddata', () => {
			vid.play()
		})
		vid.srcObject = stream
	}

	return (
		<div className="view-video">
			<button onClick={handleStartStream}> Start stream </button>
			<video controls ref={videoRef}></video>
		</div>
	)
}

export default ViewVideo
