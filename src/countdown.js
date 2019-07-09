import React from 'react'

function Countdown() {
  const [remainingTime, setRemainingTime] = React.useState(10000)
  const end = React.useRef(Date.now() + remainingTime)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = end.current - Date.now()
      if (newRemainingTime <= 0) {
        clearInterval(interval)
        setRemainingTime(0)
      } else {
        setRemainingTime(newRemainingTime)
      }
    })
    return () => clearInterval(interval)
  }, [])
  return remainingTime
}

export {Countdown}
