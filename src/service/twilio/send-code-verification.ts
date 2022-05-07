
import twilio from "twilio";

class SendCondeVerification {
  constructor(private phoneNumber: string){
    this.phoneNumber = phoneNumber;
  }

  async run() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const service = process.env.TWILIO_SERVICE_SMS;
    const client = twilio(accountSid, authToken);

    try {
      await client.verify
                  .services(service)
                  .verifications
                  .create({ to: `+55${this.phoneNumber}`, channel: 'sms' });
    } catch (error) {
      console.log(`Erro ao enviar sms de confirmação da conta ${error}`);
    }
  }
}

export default SendCondeVerification;
