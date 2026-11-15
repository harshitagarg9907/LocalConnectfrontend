import { useEffect, useState } from 'react'

import './IIndex.css'

function Index() {

    const slides = [//Because we have three slides, and their structure is almost identical.Instead of writing three separate sections of JSX, we store their different information in an array and use map() to display them.
        {
            title: "Capture Your Special Moments",
            highlight: "With The Best Photographers",
            description: "Find talented photographers who turn your beautiful memories into unforgettable stories.",
            image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1800",
            category: "Photographers"
        },
        {
            title: "Make Your Celebrations Beautiful",
            highlight: "With Creative Decorators",
            description: "Discover amazing decorators who bring your dream celebrations to life.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1800",
            category: "Decoration"
        },
        {
            title: "Delight Your Guests",
            highlight: "With Amazing Caterers",
            description: "Connect with trusted caterers and make every occasion delicious and memorable.",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1800",
            category: "Caterers"
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)//when the user moves to login page we dont want crousel to run in the bnackground

    }, [])

    function nextSlide() {
        setActiveIndex(prev => (prev + 1) % slides.length)
    }

    function prevSlide() {
        setActiveIndex(prev => (prev - 1 + slides.length) % slides.length)
    }

    const services = [
        { icon: "📸", name: "Photographers" },
        { icon: "🎊", name: "Decoration" },
        { icon: "🍽️", name: "Caterers" },
        { icon: "💍", name: "Event Planners" },
        { icon: "💄", name: "Beauty & Salon" },
        { icon: "🔧", name: "Home Services" },
        { icon: "🛍️", name: "Shopping" }
    ]

    return (
        <div className="index-page">

            {/* HERO CAROUSEL */}

            <section className="hero-carousel">

                {slides.map((slide, index) => (

                    <div
                        key={index}
                        className={`hero-slide ${activeIndex === index ? "active" : ""}`}
                       //his hides all slides except the active one.
                        style={{
                            backgroundImage: `linear-gradient(90deg, rgba(5,35,26,0.90), rgba(5,35,26,0.35)), url("${slide.image}")`
                        }}
                    >

                        <div className="hero-content">

                            <p className="hero-tagline">
                                DISCOVER • CONNECT • CELEBRATE
                            </p>

                            <h1>
                                {slide.title}
                                <span>{slide.highlight}</span>
                            </h1>

                            <p className="hero-description">
                                {slide.description}
                            </p>

                            

                        </div>

                    </div>

                ))}

                <button
                    className="carousel-arrow left-arrow"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>

                <button
                    className="carousel-arrow right-arrow"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>

                <div className="carousel-dots">

                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={activeIndex === index ? "dot active-dot" : "dot"}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}

                </div>

            </section>


            {/* SERVICES */}

            <section className="services-section">

                <div className="section-heading">
                    <h2>Explore Our Services</h2>
                    <p>
                        Everything you need, all in one place.
                        Discover trusted local businesses.
                    </p>
                </div>

                <div className="services-container">

                    {services.map((service, index) => (
<div
                  className="service-card"
                            key={index}
                            //We use key because React needs to identify each element uniquely when we create multiple elements using .map().
                  >      

                            <div className="service-icon">
                                {service.icon}
                            </div>

                            <h3>{service.name}</h3>

                    </div>      
                      

                    ))}

                </div>

            </section>


            {/* WHY CHOOSE US */}

            <section className="trust-section">

                <div>
                    <span>🛡️</span>
                    <h3>Trusted Vendors</h3>
                    <p>Discover local businesses.</p>
                </div>

                <div>
                    <span>⭐</span>
                    <h3>Genuine Ratings</h3>
                    <p>See customer ratings.</p>
                </div>

                <div>
                    <span>📍</span>
                    <h3>Find Nearby</h3>
                    <p>Explore vendors in your city.</p>
                </div>

                <div>
                    <span>🤝</span>
                    <h3>Easy Connections</h3>
                    <p>Find the right service for you.</p>
                </div>

            </section>


            {/* CITIZEN AND VENDOR */}

            <section className="join-section">

                <div className="join-card citizen-card">
                    <h2>Looking for a Service?</h2>

                    <p>
                        Find trusted local vendors for your
                        celebrations and everyday needs.
                    </p>

                  
                </div>

                <div className="join-card vendor-card">
                    <h2>Own a Business?</h2>

                    <p>
                        Register your business and connect
                        with more customers in your city.
                    </p>

                 
                </div>

            </section>


            {/* FOOTER */}

            <footer className="home-footer">

                <h2>LocalConnect</h2>

                <p>
                    Discover local talent. Support local businesses.
                </p>

                <p>
                    © 2026 LocalConnect. All rights reserved.
                </p>

            </footer>

        </div>
    )
}

export default Index