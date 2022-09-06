import { useEffect, useRef, useState } from 'react'

const RecordingTimer = ({ start }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
      
        if (start) {
          interval = setInterval(() => {
            setTime((time) => time + 10);
            // console.log(time)
          }, 10);
        } else {
          clearInterval(interval);
          setTime(0)
        }

        return () => {
          clearInterval(interval);
        };
      }, [start]);
    

  return (
    <div className='recording-timer'>
        <div className="timer text-4xl flex gap-[10px]">
            <span className="digits inline-flex w-10">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits inline-flex w-10">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec inline-flex w-10">
                {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
        </div>
    </div>
  )
}

export default RecordingTimer