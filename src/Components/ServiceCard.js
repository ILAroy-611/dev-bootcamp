import '../Styles/servicecard.css'

function ServiceCard({service_title,service_subtitle,service_description}) {
  return (
    <div className='service-card'>
        <div className="service-container">
            <h3 className="service-card-title">
                {service_title}
            </h3>
            <h5 className="service-subtitle">
                {service_subtitle}
            </h5>
            <p className="service-description">
                {service_description}
            </p>
        </div>
    </div>
  )
}

export default ServiceCard