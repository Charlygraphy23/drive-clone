import { readFile } from 'fs/promises';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { join } from 'path';

export class NodemailerClient {
    private transport: nodemailer.Transporter;
    private html: string = ""

    constructor() {
        if (typeof window !== 'undefined') throw new Error("Not supported on this browser");

        this.transport = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    private async getTemplate(name: "signup" | "forgot") {
        const emailTemplateSource = await readFile(join(process.cwd(), `app/email/templates/${name}.hbs`), "utf8")
        return handlebars.compile(emailTemplateSource)
    }

    async signupTemplate(data: {
        name: string,
        username: string,
        password: string
        origin: string
    }) {
        const template = await this.getTemplate("signup")

        const templateData = template({
            name: data?.name,
            username: data?.username,
            password: data?.password,
            origin: data?.origin,
        })

        this.html = templateData
        return {
            send: (data: {
                to: string,
                subject: string,

            }) => this.send(data)
        }
    }


    async forgotTemplate(data: {
        origin: string,
        emailExpiredTime: number,
        resetLink: string,
    }) {
        const template = await this.getTemplate("forgot")

        const templateData = template(data)

        this.html = templateData
        return {
            send: (data: {
                to: string,
                subject: string,

            }) => this.send(data)
        }
    }

    private send({
        to,
        subject,
    }: {
        to: string,
        subject: string,
    }) {
        console.log("Sending email to ", to)
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            // attachment: "{LOCATION TO THE FILE THAT NEEDS TO BE ATTACHED}",
            html: this.html
        }

        return new Promise((resolve, reject) => {
            this.transport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.error(`Error sending email: ${error}`)
                    return reject(error)
                }

                console.log("Successfully sent email.")
                return resolve(response)
            })
        })
    }
}