
const gamefinish = ({ stats }) => {

  const round = num => {
    return Math.round(num)
  }

  return (
    <div className='container'>
      <div className="flex">
        <div className="flex">
          <div>
            <h1 className="text-3xl inline">WPM</h1>
            <h1 className="text-purple-600 font-extrabold">{round(stats.wpm)}</h1>
          </div>
          <div>
            <h1 className="text-3xl inline">LPM</h1>
            <h1 className="text-purple-600 font-extrabold">{round(stats.lpm)}</h1>
          </div>
        </div>
        <div>
          <h1 className="text-3xl">Time {stats.time} seconds</h1>
          <h1 className="text-3xl">Words {stats.words}</h1>
        </div>
      </div>
    </div>
  )
}

export default gamefinish