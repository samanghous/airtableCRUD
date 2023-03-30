import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

let to_email = '' 
let mail_subject = ''
let mail_text = ''
let html_text = ''

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID ;
const CLIENT_SECRET = process.env.CLIENT_SECRET ;
const REDIRECT_URI = process.env.REDIRECT_URI ;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN ;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to_email,
      subject: mail_subject,
      text: mail_text,
      html: '<h1>'+html_text+'</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

 

export const sendMailAPI = async (req, res) => {
    try{
        const { email , subject , mailtext , htmltext} = req.body;
        to_email = email
        mail_subject = subject
        mail_text = mailtext
        html_text = htmltext

        sendMail()
            .then(
                (result) => {
                    console.log('Email sent...', result)
                    res.status(200).json({ success: true, message: "mail send" })
                }
            )
            .catch(
                (error) => {
                    console.log(error.message)
                    res.status(500).json({ success: false, message: "mail not send" })
                }
            );
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};