
import CounterSection from "../components/homeComponents/counterSection";
import HeroBanner from "../components/homeComponents/heroBanner";
import HowItWorks from "../components/homeComponents/howItsWork";
import ExpertCarousel from "../components/homeComponents/expertCarousel";
import WhyChooseUs from "../components/homeComponents/whyChooseUs";
import TestimonialSlider from "../components/homeComponents/testimonial";


const Home = () => {
    return(<>
      <HeroBanner/>
      <CounterSection/>
      <HowItWorks/> 
      <ExpertCarousel />
      <WhyChooseUs/>
      <TestimonialSlider/>
    </>
    )
}

export default Home;