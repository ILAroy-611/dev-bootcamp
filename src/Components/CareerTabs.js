import '../Styles/careerstabs.css'

function CareerTabs({tab_title}) {
  return (
    <div className='careers-tab'>
        <button className="btn btn-tabs">
            {tab_title}
        </button>
    </div>
  )
}

export default CareerTabs