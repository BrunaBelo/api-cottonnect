
import twilio from "twilio";

class VerificationPhone {
  constructor(private phoneNumber: string, private code: string){
    this.phoneNumber = phoneNumber;
    this.code = code;
  }

  async run(): Promise<boolean> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const service = process.env.TWILIO_SERVICE_SMS;
    const client = twilio(accountSid, authToken);

    try {
      await client.verify
                  .services(service)
                  .verificationChecks
                  .create({ to: `+55${this.phoneNumber}`, code: this.code });
    } catch (error) {
      console.log(`Erro ao enviar verificar número de celular ${error}`);
      return false;
    }

    return true;
  }
}

export default VerificationPhone;
