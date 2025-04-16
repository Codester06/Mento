import { initiatePayment } from "../../utils/payment_fetch.js";

import {sendemailapi} from "../../utils/mail_service.js";
import { postData  } from "../../utils/awsService.js";
import { EmailFormat , GenerateEmailHTML } from "../mail/mailformat.js";

export const handle_service = async (formData , form ) => {

    const submitted_date = new Date().toISOString().split("T")[0];
    formData.submitted_date = submitted_date;
    if (form === "individual"){
        const response = await postData("/individual", formData);
    }


}