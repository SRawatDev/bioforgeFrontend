import React from 'react'
import Homeheader from './Homeheader'
import { HomeFooter } from './HomeFooter'
import { useNavigate } from 'react-router-dom';
import {
  IoBriefcaseOutline,
  IoChatbubblesOutline,
  IoRocketOutline
} from 'react-icons/io5';
const index: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Homeheader />
      <main>
        <article>
          <section className="hero" id="home">
            <div className="container">
              <div className="hero-content">
                <h1 className="h1 hero-title">Welcome to BioForge — Craft Your Digital Identity</h1>
                <p className="hero-text">
                  BioForge empowers you to build a personalized bio page where your story, style, and important links come together — all in one beautiful, mobile-ready experience.
                </p>
                {!localStorage.getItem("accessToken") ? <button className="btn btn-primary" onClick={() => navigate("/login")}>Get Started</button> : ""}
              </div>
              <div className="hero-banner" />
            </div>
            <img
              src="https://i.postimg.cc/HLrpzpKz/bg.png"
              alt="shape"
              className="shape-content"
            />
          </section>
          <section className="about" id="about">
            <div className="container">
              <div className="about-top">
                <h2 className="h2 section-title">What we do</h2>
                <p className="section-text">
                  BioForge helps creators, professionals, and brands design beautiful, mobile-first bio pages — fully customizable, easy to manage, and shareable via a unique public link.
                </p>
                <ul className="about-list">
                  <li>
                    <div className="about-card">
                      <div className="card-icon">
                        <IoBriefcaseOutline size={24} />
                      </div>
                      <h3 className="h3 card-title">Link Management & Personal Branding</h3>
                      <p className="card-text">
                        Create a dynamic bio page with links to your social media, portfolio, shop, and more — all in one place.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="about-card">
                      <div className="card-icon">
                        <IoChatbubblesOutline size={24} />
                      </div>
                      <h3 className="h3 card-title">Public Profiles with Custom URLs</h3>
                      <p className="card-text">
                        Share your page with a clean username-based URL (like bioforge.io/yourname) and connect with your audience instantly.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="about-card">
                      <div className="card-icon">
                        <IoRocketOutline size={24} />
                      </div>
                      <h3 className="h3 card-title">Themes, Fonts & Styling</h3>
                      <p className="card-text">
                        Customize your bio page with light/dark themes, colors, fonts, and button styles — no design skills needed.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="about-bottom">
                <figure className="about-bottom-banner">
                  <img
                    src="https://i.postimg.cc/nzjhFvtq/about-banner.png"
                    alt="about banner"
                    className="about-banner"
                  />
                </figure>
                <div className="about-bottom-content">
                  <h2 className="h2 section-title">We’re built for self-expression</h2>
                  <p className="section-text">
                    Whether you’re a creator or entrepreneur, BioForge makes it easy to build, personalize, and share your digital identity — all from one place.
                  </p>
                  <button className="btn btn-secondary">Get Started for Free</button>
                </div>
              </div>
            </div>
          </section>
          <section className="features" id="features">
            <div className="container">
              <h2 className="h2 section-title">
                Built by creators, for creators — globally
              </h2>
              <p className="section-text">
                The BioForge team brings together talent from around the world, united by a shared passion for empowering individuals to express their identity online. Our global perspective drives innovation, inclusivity, and design that speaks to everyone.
              </p>
              <ul className="features-list">
                <li className="features-item">
                  <figure className="features-item-banner">
                    <img
                      src="https://i.postimg.cc/yYjd16Z6/feature-1.png"
                      alt="feature banner"
                    />
                  </figure>
                  <div className="feature-item-content">
                    <h3 className="h2 item-title">Create & customize in minutes</h3>
                    <p className="item-text">
                      Build a beautiful bio page with your links, profile, and style — no coding required. Just pick a template, customize, and publish.
                    </p>
                  </div>
                </li>
                <li className="features-item">
                  <figure className="features-item-banner">
                    <img
                      src="https://i.postimg.cc/4N21KGCZ/feature-2.png"
                      alt="feature banner"
                    />
                  </figure>
                  <div className="feature-item-content">
                    <h3 className="h2 item-title">Always free, always yours</h3>
                    <p className="item-text">
                      BioForge is free to use, with no hidden fees. We believe your online presence shouldn’t come at a cost — transparency is our promise.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="cta">
            <div className="container">
              <div className="cta-card">
                <h3 className="cta-title">Try for 7 days free</h3>
                <p className="cta-text">
                  Focus on what matters most. We're committed to providing you
                  exceptional value
                </p>
                <form action="" className="cta-form">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                  />
                  <button type="submit" className="btn btn-secondary">
                    Try it Now
                  </button>
                </form>
              </div>
            </div>
          </section>
          <section className="contact" id="contact">
            <div className="container">
              <div className="contact-content">
                <h2 className="h2 contact-title">
                  Let's scale your brand, together
                </h2>
                <figure className="contact-banner">
                  <img
                    src="https://i.postimg.cc/4dmYSY4F/contact.png"
                    alt="contact banner"
                  />
                </figure>
              </div>
              <form action="" className="contact-form">
                <div className="input-wrapper">
                  <label htmlFor="name" className="input-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"

                    placeholder="Type Name"
                    className="input-field"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="phone" className="input-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"

                    placeholder="Type Phone Number"
                    className="input-field"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="email" className="input-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"

                    placeholder="Type Email Address"
                    className="input-field"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="message" className="input-label">
                    How can we help?
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Type Description"
                    className="input-field"
                    defaultValue={""}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </article>
      </main>
      <HomeFooter />
    </>

  )
}

export default index