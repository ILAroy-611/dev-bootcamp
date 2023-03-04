import '../Styles/hero.css'

function Hero() {
    return (
        <section className="hero-section">
            <div className="container hero-container">
                <h2 className="hero-title">
                    DevCamper BootCamps
                </h2>
                <h4 className="hero-subtitle">
                    Everything you need to become a 'Software Developer'
                </h4>
                <p className="hero-text">
                    Find the best coding bootcamp that fits your needs, learn how to code, and join the elite in software development.
                </p>
                <ul className="camp-highlights flex">
                    <li>Free</li>
                    <li>Project Based</li>
                    <li>100% Online</li>
                </ul>
            </div>
        </section>
    )
}

export default Hero