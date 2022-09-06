import { useRef, useState } from 'react'
import AudioSpectrum from 'react-av'
import { BiVideoRecording } from 'react-icons/bi'
import { VscRecord } from 'react-icons/vsc'
import PopupModal from './components/PopupModal'
import RecordingTimer from './components/RecordingTimer'
import StartButton from './components/StartButton'
import StopButton from './components/StopButton'
import { recordAudio } from './utils/recorder'
import AudioPlayerCard from './components/AudioPlayerCard'

const App = () => {

  const [started, setStarted] = useState(false)
  const [recordingStopped, setRecordingStopped] = useState(false)
  const [recordedAudios, setRecordedAudios] = useState([])
  const [showRecordedAudios, setShowRecordedAudios] = useState(false)
  const [audioName, setAudioName] = useState('')
  const recorder = useRef(null)
  const audio = useRef(null)
  const stream = useRef(null)
  const audioRef = useRef(null)
  

  const startRecording = async () => {
    if (!recorder.current) {
      recorder.current = await recordAudio()
    }

    stream.current = recorder.current.start()
    audioRef.current.srcObject = stream.current
  }

  const stopRecording = async () => {
    setRecordingStopped(true)
    audio.current = await recorder.current.stop()
    // audio.current.play()
  }
  
  const saveAudio = () => {
    if (!audioName.trim()) return
    
    let newAudio = { ...audio.current, name: audioName }
    setRecordedAudios([ ...recordedAudios, newAudio ])
    setRecordingStopped(false)
  }

  const saveOnKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      saveAudio()
    }
  }

  const discardAudio = () => {
    audio.current = null
    setAudioName('')
    setRecordingStopped(false)
  }


  return (
    <div className='App h-screen bg-[#1c1c1c] p-10 px-[10%] text-white flex flex-col'>
      <h1 className='text-2xl flex items-center gap-2'>
        <VscRecord className='text-red-500' size={24} />
        <span>ApexRecord</span>  
      </h1>
      <p className='text-xs ml-8 mb-10'>Elite Audio recorder</p>

      <button className='fixed right-[10%] top-10 border border-[#303030] p-2 px-4 text-gray-500 rounded-md md:hidden flex items-center gap-2' onClick={() => setShowRecordedAudios(!showRecordedAudios)}>
        <BiVideoRecording />
        <span className='hidden md:inline-block'>Recorded</span>
      </button>

      <main className='flex flex-1 gap-10'>
        <div className="recorder-section flex-1 bg-[#202020] flex flex-col p-10 items-center gap-5 overflow-hidden">
          <div className="visualizer flex-1">
          <audio id="audio-element"
            ref={audioRef}
            // src={TestAudio}
            autoPlay
            muted
          />
          <AudioSpectrum
            id="audio-canvas"
            height={200}
            width={300}
            audioId={'audio-element'}
            // capColor={'red'}
            // capHeight={2}
            // meterWidth={2}
            // meterCount={512}
            // meterColor={[
            //   {stop: 0, color: '#f00'},
            //   {stop: 0.5, color: '#0CD7FD'},
            //   {stop: 1, color: 'red'}
            // ]}
            // gap={4}
          />
          </div>
          <div className="timer-block">
            <RecordingTimer start={started === true} />
          </div>
          <div className="controls">
            { 
            !started ? <StopButton onClick={() => { setStarted(true); startRecording() }} /> : <StartButton onClick={() => { setStarted(false); stopRecording() }} /> 
             
            }
          </div>
        </div>
        <div className={`audio-list flex-1 bg-[#252525] ${showRecordedAudios ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 fixed w-full h-full md:static p-5 top-0 left-0 transition-all`}>
        <button className='fixed right-5 top-4 border border-[#303030] p-1 px-3 text-gray-500 rounded-md md:hidden flex items-center gap-2' onClick={() => setShowRecordedAudios(!showRecordedAudios)}>
          <span>Close</span>
        </button>
          <h3>Recorded Audios</h3>
          <div className="audio-list flex flex-col gap-3 mt-5">
            {
              recordedAudios.map((audioObj, index) => (
                <AudioPlayerCard audioObj={audioObj} key={index} />
                ))
              }
          </div>
        </div>
      </main>
      
      <PopupModal show={recordingStopped}>
        <div className="save-audio bg-[#2c2c2c] p-5 flex flex-col gap-2">
          <h1 className='text-md mb-1'>Save Audio</h1>
          <input type="text" placeholder='Enter a name for the file' className='outline-none p-2 border border-[#404040] bg-[#2d2d2d] text-sm' onChange={(evt) => setAudioName(evt.target.value)} value={audioName} onKeyDown={saveOnKeyPress} />

          <div className="actions flex gap-2">
            <button className='p-[6px] px-5 text-sm  border border-[#404040] bg-[#3fae84]' onClick={saveAudio}>Save</button>
            <button className='p-[6px] px-5 text-sm  border border-[#404040] bg-[#2d2d2d] transition-all hover:bg-[#503737] hover:border-0' onClick={discardAudio}>Discard</button>
          </div>
        </div>
      </PopupModal>
    </div>
  )
}

export default App