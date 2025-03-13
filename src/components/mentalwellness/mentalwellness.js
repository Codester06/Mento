import "./mentalwellness.css";
import FAQSectionWN from "./faqSection";
import IndividualForm from "../Forms/IndividualForm";

const MentalWellnessComponent = ({ children }) => {
  return (
    <div className="mental-wellness-page">
      <div className="wellness-banner">
        <p>
          ✨ Thousands have taken the first step. Don’t wait! Start your healing
          journey today. ✨
        </p>
      </div>
      <div className="content-container">
        <div className="individual-form">
          <IndividualForm />
        </div>
        <FAQSectionWN />
      </div>
    </div>
  );
};

export default MentalWellnessComponent;
