import {useState} from 'react';
import './mentalwellness.css';
import FAQSectionWN from './faqSection';
import MultiStepForm from './mentalWellnessFrom';
import Stepper, { Step } from '../../helper/multiStepper';

const MentalWellnessComponent = ({ children }) => {

  const [name, setName] = useState("");
  return (
    <div>
    <div className="mental-wellness-page">
    <div className="wellness-banner">
  <p>✨ Thousands have taken the first step. Don’t wait! Start your healing journey today. ✨</p>
</div>
     

      {/* <div className="form-section">
        <div className="form-container">
        <h1 className="form-title">FORM</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message"></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
      </div> */}
       
<Stepper
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
>
  <Step>
    <h2>Welcome to the React Bits stepper!</h2>
    <p>Check out the next step!</p>
  </Step>
  <Step>
    <h2>Step 2</h2>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
    <p>Custom step content!</p>
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>  <Step>
    <h2>How about an input?</h2>
    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
  <Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step><Step>
    <h2>Final Step</h2>
    <p>You made it!</p>
  </Step>
</Stepper>
    
      </div>

      <div>
      </div>
      
      <div className='faqSectionWN'>
<h1>Frequently Asked Questions</h1>
 </div>
      <FAQSectionWN /> 
     


         </div>
  );
};

export default MentalWellnessComponent;






 