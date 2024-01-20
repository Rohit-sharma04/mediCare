import nodemailer from 'nodemailer'
import { HTML_TEMPLATE } from '../lib/HTML_Templete.js';
import colors from "colors";

let  transporter;

export const nodeMailerConfig=()=>{
    transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        // secure: true,
        // logger:true,
        // debug:true,
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        
      });

      console.log("node mailer configed".bgYellow.white )
}

export const sendEmail = async (mailTo, token) => {
    try {
        
        const info = await transporter.sendMail({
            from:{
                name:"Rohit",
                address:'<support@medicare.com>',
            },
            to: mailTo,
            subject: "Password rest mail",
            html: HTML_TEMPLATE(token),
        });
        console.log("Email sent:", info);
    } catch (error) {
        console.log("error while sending mail",error)
    }
    
    // return info
}



// export function sendEmail( recipient_email, OTP ) {
//     return new Promise((resolve, reject) => {
//         var transporter = nodemailer.createTransport({
//             host: process.env.NODEMAILER_HOST,
//             port: process.env.NODEMAILER_PORT,
//             // secure: true,
//             logger: true,
//             debug: true, 
//             auth: {
//                 user: process.env.NODEMAILER_USERNAME,
//                 pass: process.env.NODEMAILER_PASSWORD,
//             },
//         });

//         const mail_configs = {
//             from:'<support@medicare.com>' ,
//             to: recipient_email,
//             subject: "KODING 101 PASSWORD RECOVERY",
//             html: `<h1>${OTP}</h1>`,
//         };
//         transporter.sendMail(mail_configs, function (error, info) {
//             if (error) {
//                 console.log(error);
//                 return reject({ message: `An error has occured` });
//             }
//             return resolve({ message: "Email sent succesfuly" });
//         });
//     });
// }

