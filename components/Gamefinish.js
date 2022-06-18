import React from 'react'

const gamefinish = ({ stats }) => {
  return (
    <div>
        <h1>{stats.wpm}</h1>
        <h1>{stats.lpm}</h1>
    </div>
  )
}

export default gamefinish