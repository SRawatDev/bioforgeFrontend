import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import Card from './Card'
import './LandingPage.css'
import Footer from './Footer'
import Navbar from '../../navbar/Navbar'

const LandingPage = () => {
    const lenisRef = useRef<Lenis | null>(null)

   useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', (e: any) => {
    });

    return () => {
      lenis.destroy();
    };
  }, []);
    const cardData = [
        {
            id: 1,
            title: 'Professional ',
            image: '../../../../public/assets/template9.png',
            description: 'Beautiful mountain scenery with snow-capped peaks',
            htmlFile: '../template-design/template1.html',
            category: 'Career'
        },
        {
            id: 2,
            title: 'Personal Brand',
            image: '../../../../public/assets/template10.png',
            description: 'Serene ocean waves crashing on the shore',
            htmlFile: '../template-design/template2.html',
            category: 'Identity-focused'
        },
        {
            id: 3,
            title: 'Humorous',
            image: '../../../../public/assets/template11.png',
            description: 'Peaceful forest trail surrounded by tall trees',
            htmlFile: '../template-design/template3.html',
            category: 'casual tone'
        },
        {
            id: 4,
            title: 'Inspirational',
            image: '../../../../public/assets/template12.png',
            description: 'Modern city skyline at sunset',
            htmlFile: '../template-design/template4.html',
            category: 'Motivational'
        },
        {
            id: 5,
            title: 'Creative/Artist',
            image: '../../../../public/assets/template13.png',
            description: 'Golden sand dunes in the desert',
            htmlFile: '../template-design/template5.html',
            category: 'photography'
        },
        {
            id: 6,
            title: 'Influencer/Content Creator',
            image: '../../../../public/assets/template14.png',
            description: 'Crystal clear waters and white sandy beach',
            htmlFile: '../template-design/template6.html',
            category: 'Niche + content schedule'
        },
        {
            id: 7,
            title: 'Entrepreneur',
            image: '../../../../public/assets/template9.png',
            description: 'Spectacular aurora borealis in the night sky',
            htmlFile: '../template-design/aurora.html',
            category: 'achievements'
        },
        {
            id: 8,
            title: 'Lifestyle ',
            image: '../../../../public/assets/template12.png',
            description: 'Majestic waterfall cascading down rocks',
            htmlFile: '../template-design/waterfall.html',
            category: 'fitness'
        },
        {
            id: 9,
            title: 'Promotes a link or offer',
            image: '../../../../public/assets/template14.png',
            description: 'Colorful wildflowers in a meadow',
            htmlFile: '../template-design/flowers.html',
            category: 'CTA'
        },
        {
            id: 10,
            title: 'Multi-platform Presence',
            image: '../../../../public/assets/template13.png',
            description: 'Beautiful night sky filled with stars',
            htmlFile: '../template-design/stars.html',
            category: 'TikTok'
        }
    ]
    // Smooth scroll to gallery section
    const scrollToGallery = () => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo('.gallery-section', {
                offset: -100,
                duration: 2
            })
        }
    }

    return (
        <>
        <Navbar />
        <div className='landing-page'>
            {/* Hero Section */}
            {/* <section className='hero-section'>
                <div className='hero-content'>
                    <div className='hero-text'>
                        <h1 className='hero-title'>
                            Discover Amazing
                            <span className='gradient-text'> Templates</span>
                        </h1>
                        <p className='hero-subtitle'>
                            Artemis – The go‑to template for fresh juice and
                            smoothie bars, featuring a vibrant, fruit‑inspired
                            design with dedicated sections to link your drink
                            menu, seasonal recipes, store locations, and
                            promotional specials—all in one juicy, scroll‑ready
                            page
                        </p>
                        <div className='hero-stats'>
                            <div className='stat'>
                                <span className='stat-number'>10</span>
                                <span className='stat-label'>Collections</span>
                            </div>
                            <div className='stat'>
                                <span className='stat-number'>4K</span>
                                <span className='stat-label'>Quality</span>
                            </div>
                            <div className='stat'>
                                <span className='stat-number'>∞</span>
                                <span className='stat-label'>Inspiration</span>
                            </div>
                        </div>
                    </div>
                    <div className='hero-image'>
                        <div className='floating-card'>
                            <img
                                src='../../../../public/assets/vansh.png'
                                alt='Featured'
                            />
                        </div>
                    </div>
                </div>
                <div className='scroll-indicator' onClick={scrollToGallery}>
                    <div className='scroll-arrow'></div>
                </div>
            </section> */}

            {/* Gallery Section */}
            <section className='gallery-section'>
                <div className='section-header'>
                    <h2 className='section-title'>Template Gallery</h2>
                    <p className='section-subtitle'>
                        Click preview to explore each landscape in detail
                    </p>
                </div>

                <div className='cards-grid'>
                    {cardData.map((card, index) => (
                        <Card
                            key={card.id}
                            title={card.title}
                            image={card.image}
                            description={card.description}
                            htmlFile={card.htmlFile}
                            category={card.category}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
        </>
    )
}

export default LandingPage
