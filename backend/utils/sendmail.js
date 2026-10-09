const nodemailer = require('nodemailer');


const transporter =nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

const sendEmail = async (recipient,subject,text,html)=>{
    const options ={
        from: process.env.SMTP_USER,
        to:recipient,
        subject:subject,
        text:text,
        html:html,
    };
    
    await transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log("sent :",info.response);
        }
    });
}

module.exports={sendEmail};