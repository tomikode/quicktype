import { ArrowRightIcon, RefreshIcon } from "@heroicons/react/solid"

const gamefinish = ({ stats, setWordsForGame }) => {

  const round = num => {
    return Math.round(num)
  }



  return (
    <div className='container flex-col text-slate-500'>
      <div className="flex">
        <div className="flex">
          <div className="pr-3 border-r-2 border-slate-500">
            <h1 className="text-3xl inline select-none">WPM</h1>
            <h1 className="text-purple-600 font-extrabold text-6xl">{round(stats.wpm)}</h1>
          </div>
          <div className="px-3 border-r-2 border-slate-500">
            <h1 className="text-3xl inline select-none">LPM</h1>
            <h1 className="text-purple-600 font-extrabold text-6xl">{round(stats.lpm)}</h1>
          </div>
        </div>
        <div className="pl-3">
          <h1 className="select-none">Time</h1>
          <h1 className="text-purple-600 text-xl">{stats.time}s</h1>
          <h1 className="select-none">Words</h1>
          <h1 className="text-purple-600 text-xl">{stats.words}</h1>
        </div>
      </div>
      <div className="pt-3">
        <button>
          <ArrowRightIcon className="text-slate-400 -500 h-12 w-12 p-2 bg-red-500" />
        </button>
        <button onClick={() => setWordsForGame(stats.words)}>
          <RefreshIcon className="text-slate-400 -500 h-12 w-12 p-2 bg-red-500" />
        </button>
      </div>

    </div >
  )
}

export default gamefinish