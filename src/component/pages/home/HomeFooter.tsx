import moment from 'moment/moment'
import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeFooter() {
  return (
    <>
       <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <p className="footer-copyright">
                © {moment().year()} CREDO IN DEUM. All rights reserved
              </p>
            </div>
            <div className="col-lg-4">
              <div className="footer-social text-center">
                <Link to="#">
                  <i className="fa-brands fa-instagram" />
                </Link>
                <Link to="#">
                  <i className="fa-brands fa-facebook-f" />
                </Link>
                <Link to="#">
                  <i className="fa-brands fa-youtube" />
                </Link>
                <Link to="#">
                  <i className="fa-brands fa-whatsapp" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <p className="footer-copyright text-end mb-0">
                Powered by: Brain Technosys
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
