
const gamefinish = ({ stats }) => {

  const round = num => {
    return Math.round(num)
  }  

  

  return (
    <div className='container'>
      <div>
        <h1>{round(stats.wpm)}</h1>
        <h1>{round(stats.lpm)}</h1>
        <h1>{stats.time}</h1>
      </div>
    </div>
  )
}

export default gamefinish