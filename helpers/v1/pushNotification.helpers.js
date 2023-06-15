const fcm = require('fcm-notification')
const nFPath = require('./../../config/v1/norvell-napp-firebase-adminsdk-aunk7-62663f9a8b.json');
module.exports = class PushNotificationHelper {
    constructor(){
        try{
            //console.log(process.env.FCM_KEY);
            this.FCM = new fcm(nFPath);
        }
        catch(err){
            console.log("Error :", err.message);
            throw new Error(err.message);
            return false;
            
        }
    }

    sendSingleNotification(token, dataRequest, title, body){
        let dataString = JSON.stringify(dataRequest)
        let message = {
            data : {
                appointment : JSON.stringify(dataRequest)
            },
            notification: {
                title: title,
                body: body
            },
            token: token
        }
        console.log("FCM Object :", this.FCM);
        console.log("Message Object :", message)
        this.FCM.send(message, (err,response) => {
            console.log("INSIDE THE SEND FUNCTION");
            if(err){
                console.log("Testing Error:", err);
                throw new Error(err);
            }
            else 
            {
                console.log("Testing Response :",response)
                return true
            }
        })
    }  
    
    sendMultipleNotification(token, data={}, title, body){
        let message = {
            ...data,
            notification: {
                title: title,
                body: body
            }
        }

        this.FCM.sendToMultipleToken(message, token, (err, response) => {
            if(err){
                throw new Error(err.message);
            }
            else
            {
                return true
            }
        })
    }
}