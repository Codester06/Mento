
import CounterSection from "../components/homeComponents/counterSection";
import HeroBanner from "../components/homeComponents/heroBanner";
import HowItWorks from "../components/homeComponents/howItsWork";
import ExpertCarousel from "../components/homeComponents/expertCarousel";
import WhyChooseUs from "../components/homeComponents/whyChooseUs";
import TestimonialSlider from "../components/homeComponents/testimonial";
import MentalHealthServices from "../components/homeComponents/helpYouSection";
// import QuoteCards from "../components/quotes/quotesText";


const Home = () => {
    return(<>
      <HeroBanner/>
      <CounterSection/>
      <HowItWorks/> 
      <ExpertCarousel />
      <MentalHealthServices/>
      {/* <QuoteCards/> */}
      <WhyChooseUs/>
      <TestimonialSlider/>
    </>
    )
}

export default Home;