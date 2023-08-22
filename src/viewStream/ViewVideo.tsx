

const ViewVideo = () => {

	const handleStartStream = async () => {
		const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
			video: true, audio: false  // För att hindra rundgång i klassrummet
		})

	}

	return (
		<div className="view-video">
			<button onClick={handleStartStream}> Start stream </button>
		</div>
	)
}

export default ViewVideo
