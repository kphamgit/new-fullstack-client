import { useEffect, useRef } from "react"
const AudioPlayer = ({audioFile}) => {
    const audioRef = useRef()
    
    useEffect(() => {
        if (audioFile) {
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], {type: "audio/mpeg" }));

            const audio = audioRef.current
            audio.src = audioURL;
            audio.play()

            return () => {
                URL.revokeObjectURL(audioURL)
            }
        }
    },[audioFile])

    return (
        <div>
            <audio ref = {audioRef} />
        </div>
    )
}

export default AudioPlayer
