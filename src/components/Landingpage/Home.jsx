import React, { useEffect } from 'react'

import HeroSection from '../Homepage/HeroSection'
import PopularBooks from '../Homepage/PopularBooks'
import ExchangeBook from '../Homepage/Exchange'
import RentBook from '../Homepage/RentBook'
import Chooseus from '../Homepage/Chooseus'
import FeedbackForm from '../Homepage/Feedback'


const Home = () => {
  useEffect(()=>{
    const handleBeforeLoad=()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
    }
    window.addEventListener("before",handleBeforeLoad)

    return(
      window.removeEventListener("before",handleBeforeLoad)
    )
  },[])
  return (
    <div>
      {/* hero section  */}
      <HeroSection/>
      {/*popular books*/}
      <PopularBooks/>
      {/* exchange books  */}
      <ExchangeBook/>
      {/* rent books  */}
      <RentBook/>
      {/* Why choose us */}
      <Chooseus/>
      <FeedbackForm/>
    </div>
  )
}

export default Home
