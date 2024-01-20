export const HTML_TEMPLATE = (otp) => {
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Please reset your password</title>
        <style>
            body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                background-color: #f2f2f2;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
            }
    
            .header {
                text-align: center;
                padding: 20px 0;
            }
    
            .header img {
                width: 120px;
                height: auto;
                margin-bottom: 20px;
            }
    
            .greeting {
                font-size: 24px;
                font-weight: bold;
                padding: 5px;
                background-color: black;
                color: white;
            }
    
            .message {
                padding: 20px 0;
            }
    
            .reset-password-link {
                display: block;
                padding: 10px 20px;
                border: 1px solid #007bff;
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
                cursor: pointer;
            }
    
            .otp {
                padding: 10px;
                background-color: black;
                color: white;
                display: inline;
                border-radius: 10%;
            }
    
            .otp-container {
                text-align: center;
            }
    
            .ignore {
                color: gray;
            }
    
            .footer {
                text-align: center;
                padding: 20px 0;
                background-color: black;
                color: white;
            }
    
            .footer p {
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="logo.png" alt="Company logo">
            </div>
    
            <div class="greeting">
                <h1>Please reset your password</h1>
            </div>
    
            <div class="message">
                <p>We have sent you this email in response to your request to reset your password on Company Name.</p>
                <p>To reset your password, use the below OTP </p>
                <div class="otp-container">
                    <h2 class="otp">${otp}</h2>
                </div>
                <p>This OTP will expire in 2 minutes</p>
                <p class="ignore">If you did not request a password change, please ignore this email.</p>
            </div>
    
            <div class="footer">
                <p>&copy;${currentYear} Company Name All Rights Reserved</p>
                <p>Contact Us:<br>
                    1912 Mcwhorter Road, FL 11223<br>
                    +111 222 333 | Info@company.com</p>
            </div>
        </div>
    </body>
    </html>  
    `;
};

