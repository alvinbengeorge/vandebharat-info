"use client";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-speedometer';
import { useState, useEffect } from 'react';


export default function Home() {
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState("")
  const [time, setTime] = useState("");
  const [date, setDate] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:8000/").then(response => response.json()).then(response => {
        if (response.data.speed) {
          console.log(response.data)
          setSpeed(parseInt((response.data.speed as string).replace(" kmph", "")) || 0)
          setDistance(response.data['distance remaining'])
          setTime(response.data['time'])
          setDate(response.data['date'])
        }
      })

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='grid place-items-center h-screen'>
      <Speedometer
        value={speed}
        fontFamily=''
      >
        <Background />
        <Arc />
        <Needle />
        <Progress />
        <Marks />
        <Indicator />
      </Speedometer>
      <div className='grid place-items-center'>
        <div>
          <div>Time: {time}</div>
          <div>Date: {date}</div>
          <div>Distance Remaining: {distance}</div>          
        </div>
        

      </div>
    </main>
  )
}
