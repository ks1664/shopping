"use strict";
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')
module.exports = class NodeMailerService {


    async sendMail(from = 'itechnolabs.biz',to,subject,html){
        console.log("NodeMailerService@sendMail")
        try{

            sgMail.setApiKey(process.env.SENDGRID_API_KEY)

            let msg = {
                to: to, // Change to your recipient
                from: from, // Change to your verified sender
                subject: subject,
                //text: 'and easy to do anywhere, even with Node.js',
                html: html,

            }

            await sgMail.send(msg)
            return true
        }
        catch(error){
            console.error(error);

            if (error.response) {
            console.error(error.response.body)
            }
            return false
        }
    }

    async sendMailNodemailer(from,to,subject,html){
        console.log("NodeMailerService@sendMailNodemailer")
        try{
            
            // create reusable transporter object using the default SMTP transport
            let transporter = await nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.MAIL_USERNAME, // generated ethereal user
                    pass: process.env.MAIL_PASSWORD, // generated ethereal password
                },
            });
           
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: html, // html body
            });

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            return info.messageId
        }
        catch(ex){
            console.log("Mail Status :", ex.message)
            return false
        }
    }

}
