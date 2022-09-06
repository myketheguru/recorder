import { useEffect, useRef, useState } from 'react'
import { BsDownload, BsPause, BsPlayFill } from "react-icons/bs";

const AudioPlayerCard = ({ audioObj }) => {
    const audio = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [duration, setDuration] = useState('')


    const playAudio = () => {
        setPlaying(!playing) // true or false

        if (!playing) {
            audio.current.play()
        } else {
            audio.current.pause()
        }
    }

    function getDuration(src) {
        var audio = new Audio();
        audio.onloadedmetadata = () => {
            setDuration(audio.duration)
            console.log(audio.duration)
        }
        audio.src = src;
    }

    function downloadAudio () {
        const downloadTag = document.createElement('a')
        downloadTag.href = audioObj.audioUrl
        downloadTag.download = audioObj.name
        downloadTag.click()
    }
    
    useEffect(() => {
      if (audio.current) {
        setDuration(getDuration(audioObj.audioUrl))
      }
    }, [audio.current])
    

  return (
    <div className='audio-player-card bg-[#2e2e2e] p-3 flex gap-3 items-center rounded-md'>
        <button onClick={playAudio} className='bg-[#393737] w-10 h-10 rounded-full flex items-center justify-center'>
            {playing ? <BsPause /> : <BsPlayFill />}
        </button>
        <div className="details text-sm">
            <p className='font-semibold capitalize'>{ audioObj.name }</p>
            <p>0:00</p>
        </div>
        <audio src={audioObj.audioUrl} ref={audio} />
        <button onClick={downloadAudio} className='bg-[#393737] w-10 h-10 rounded-full flex items-center justify-center ml-auto'>
            <BsDownload />
        </button>
    </div>
  )
}

export default AudioPlayerCard