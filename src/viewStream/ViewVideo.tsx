import { useRef } from 'react'

const ViewVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null) // { current: <video> }
	const imgRef = useRef<HTMLImageElement>(null)

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

	const handleTakePicture = async () => {
		// 1. Starta strömmen - klart
		// 2. Kopiera innehållet i <video> till en <canvas>
		// - 2b. Skapa ett canvas-element
		// - 2c. Anpassa storleken på canvas för att kopiera rätt
		// 3. Be <canvas> om en Blob
		// 4. Skapa en "object URL" av Blob
		// 5. Be <img> att visa "object URL"

		if( !videoRef.current ) return

		const canvas: HTMLCanvasElement = document.createElement('canvas')
		const context: CanvasRenderingContext2D | null  = canvas.getContext('2d')
		if( !context ) return

		// Ta reda på hur stort video-elementet är
		// Canvas behöver vara lika stort
		const w = videoRef.current.offsetWidth
		const h = videoRef.current.offsetHeight
		canvas.width = w
		canvas.height = h

		// Kopiera från övre vänstra hörnet på <video>
		context.drawImage(videoRef.current, 0, 0, w, h)
		canvas.toBlob(blob => {
			if( !blob || !imgRef.current ) return
			const objectURL: string = URL.createObjectURL(blob)
			imgRef.current.src = objectURL
		})
	}

	return (
		<div className="view-video">
			<button onClick={handleStartStream}> Start stream </button>
			<button onClick={handleTakePicture}> Take picture </button>
			<video controls ref={videoRef}></video>
			<img ref={imgRef} />
		</div>
	)
}

export default ViewVideo
