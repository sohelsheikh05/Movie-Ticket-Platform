import twilio from 'twilio';


// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

async function sendSMS(mess,phone){
    const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
    console.log(phone);
  
    const message = await client.messages.create({
      body: mess,
      from: '+15722325724',
      to:'+18777804236'
    });

    console.log('Message SID:', message.sid);

}

export default sendSMS;