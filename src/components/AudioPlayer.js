import { useEffect, forwardRef, useRef, useImperativeHandle } from "react"

const AudioPlayer = forwardRef(function AudioPlayer({audioFile, setAudioEnded}, ref) {
    const audioRef = useRef()
    useImperativeHandle(ref, () => ({
        playAudio() {
            audioRef.current.play()
            audioRef.current.addEventListener("ended", (event) => {
               setAudioEnded(true)
            })
        }
      }));

    useEffect(() => {
        if (audioFile) {
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], {type: "audio/mpeg" }));
            //const audio = audioRef.current
            audioRef.current.src = audioURL
            //audio.src = audioURL;
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
})

export default AudioPlayer
