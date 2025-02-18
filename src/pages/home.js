import CounterSection from "../components/homeComponents/counterSection";
import HeroBanner from "../components/homeComponents/heroBanner";
import HowItWorks from "../components/homeComponents/howItsWork";

const Home = () => {
    return(<>
      <HeroBanner/>
      <CounterSection/>
      <HowItWorks/>
    </>
    )
}

export default Home;