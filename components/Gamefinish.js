import { ArrowRightIcon } from "@heroicons/react/solid"

const gamefinish = ({ stats, setWordsForGame }) => {

  const round = num => {
    return Math.round(num)
  }

  const roundTime = num => {
    return Math.round(num * 100) / 100
  }



  return (
    <div className='container flex-col'>
      <div className="flex">
        <div className="flex">
          <div className="pr-3 border-r-2 border-slate-300">
            <h1 className="text-3xl inline select-none">WPM</h1>
            <h1 className="text-purple-500 font-extrabold text-6xl">{round(stats.wpm)}</h1>
          </div>
          <div className="px-3 border-r-2 border-slate-300">
            <h1 className="text-3xl inline select-none">LPM</h1>
            <h1 className="text-purple-500 font-extrabold text-6xl">{round(stats.lpm)}</h1>
          </div>
        </div>
        <div className="pl-3">
          <h1 className="select-none">Time</h1>
          <h1 className="text-purple-500 text-xl">{roundTime(stats.time)}s</h1>
          <h1 className="select-none">Words</h1>
          <h1 className="text-purple-500 text-xl">{stats.words}</h1>
        </div>
      </div>
      <div className="pt-3">
        <button onClick={() => setWordsForGame(stats.words)}>
          <ArrowRightIcon className="text-slate-300 -500 h-12 w-12 p-2 hover:bg-slate-200 rounded-md hover:text-gray-600" />
        </button>
      </div>

    </div >
  )
}

export default gamefinish