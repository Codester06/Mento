import ToolBanner from "../components/assessment/cards_tool";
import DepressionTest from "../components/assessment/depressionTest";
import FAQtool from "../components/assessment/ass-faq";
import { useState } from "react";

const ToolPage = () => {
  const [showtest, setshowtest] = useState(false);

  const TestON = () => {
    setshowtest(true);
  };
  
  const TestOff = () => {
    setshowtest(false);
  };
  return (
    <>
      {!showtest && <ToolBanner test={TestON}/>}
      {showtest && <DepressionTest test={TestOff}/>}
      {!showtest && <FAQtool />}
    </>
  );
};

export default ToolPage;
