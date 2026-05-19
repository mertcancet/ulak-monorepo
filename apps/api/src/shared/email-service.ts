import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import env from "./env";

export interface SendEmailArgs {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export interface EmailProvider {
  send(args: SendEmailArgs): Promise<void>;
}

export class AwsSesProvider implements EmailProvider {
  private readonly client: SESClient;

  constructor() {
    this.client = new SESClient({
      region: env.AWS_SES_REGION,
      credentials: {
        accessKeyId: env.AWS_SES_ACCESS_KEY,
        secretAccessKey: env.AWS_SES_SECRET_KEY,
      },
    });
  }

  async send({ to, subject, html, from }: SendEmailArgs) {
    const destinations = Array.isArray(to) ? to : [to];

    const command = new SendEmailCommand({
      Source: from || env.EMAIL_FROM,
      Destination: {
        ToAddresses: destinations,
      },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
        },
      },
    });

    await this.client.send(command);
  }
}

class EmailService {
  private readonly provider: EmailProvider;

  constructor(provider: EmailProvider) {
    this.provider = provider;
  }

  async send(args: SendEmailArgs) {
    await this.provider.send(args);
  }
}

export const emailService = new EmailService(new AwsSesProvider());

export default emailService;
