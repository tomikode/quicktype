
const gamefinish = ({ stats }) => {

  const round = num => {
    return Math.round(num)
  }

  return (
    <div className='container'>
      <div className="flex">
        <div className="flex">
          <div className="pr-3 border-r-2 border-slate-600">
            <h1 className="text-3xl inline">WPM</h1>
            <h1 className="text-purple-600 font-extrabold text-7xl">{round(stats.wpm)}</h1>
          </div>
          <div className="px-3 border-r-2 border-slate-600">
            <h1 className="text-3xl inline">LPM</h1>
            <h1 className="text-purple-600 font-extrabold text-7xl">{round(stats.lpm)}</h1>
          </div>
        </div>
        <div className="pl-3">
          <h1 className="">Time</h1>
          <h1 className="text-purple-600 text-xl">{stats.time} s</h1>
          <h1 className="">Words</h1>
          <h1 className="text-purple-600 text-xl">{stats.words}</h1>
        </div>
      </div>
    </div>
  )
}

export default gamefinish