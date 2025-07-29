import { useEffect,  useState } from 'react'
import Card from './Card'
import './LandingPage.css'
import { callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import ErrorMessage from '../../../helpers/ErrorMessage'
import { ThemeShimmer } from '../../LinkShimmer'
import { Footer } from '../../Footer/Footer'

export interface ThemeData {
  _id?: string
  themeName: string
  themeImg: string
  themeDiscription: string
}

const LandingPage = () => {
  const [loader, setloader] = useState<boolean>(false)
  const [theme, setTheme] = useState<ThemeData[]>([])


  const getheme = async () => {
    setloader(true)
    try {
      const response = await callAPIWithoutAuth(
        apiUrls.getAlltheme,
        {},
        'GET',
        {}
      )
      setloader(false)
      if (response?.data?.status) {
        setTheme(response.data.data || [])
      } else {
        ErrorMessage(response?.data?.message || 'Failed to fetch users')
      }
    } catch (error) {
      setloader(true)
    }
  }
  useEffect(() => {
    getheme()
  }, [])

  return (
    <>
      <div className='landing-page'>
        <section className='gallery-section'>
          <div className='section-header'>
            <h2 className='section-title'>Choose themes</h2>
            <p className='section-subtitle'>
              Click preview to explore each landscape in detail
            </p>
          </div>

          <div className='cards-grid'>
            {loader ? (
              <ThemeShimmer />
            ) : (
              theme.map((card) => (
                <Card
                  key={card._id}
                  themeName={card.themeName}
                  themeImg={card.themeImg}
                  themeDiscription={card.themeDiscription}
                />
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage
