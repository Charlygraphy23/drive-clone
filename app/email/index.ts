import { readFile } from 'fs/promises';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { join } from 'path';

export class NodemailerClient {
    private transport: nodemailer.Transporter;
    private template: HandlebarsTemplateDelegate<any> | undefined
    private html: string = ""

    constructor() {
        if (typeof window !== 'undefined') throw new Error("Not supported on this browser");

        this.transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "mail.mycloud.storage@gmail.com",
                pass: "bwuliwhedizauvuy"
            }
        });
    }

    async getTemplate(name: "signup") {
        const emailTemplateSource = await readFile(join(`../templates/${name}.hbs`), "utf8")
        this.template = handlebars.compile(emailTemplateSource)
        return {
            signup: this.signupTemplate
        }
    }

    signupTemplate(data: Record<string, any>) {

        if (!this.template) throw new Error("Please create a template!")

        const templateData = this.template({
            name: data?.name,
            username: data?.username,
            password: data?.password
        })

        this.html = templateData
        return {
            send: this.send
        }
    }

    send({
        to,
        subject,
    }: {
        to: string,
        subject: string,

    }) {
        const mailOptions = {
            from: process.env.TO_EMAIL,
            to: to,
            subject: subject,
            attachment: "{LOCATION TO THE FILE THAT NEEDS TO BE ATTACHED}",
            html: this.html
        }

        this.transport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error)
            } else {
                console.log("Successfully sent email.")
            }
        })
    }
}