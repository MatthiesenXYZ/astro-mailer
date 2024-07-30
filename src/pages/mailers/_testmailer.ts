import { type MailDataRequired, MailService } from "@sendgrid/mail";
import type { APIContext, APIRoute } from "astro";
import { SENDGRID_API_KEY } from "astro:env/server";

const SendGrid = new MailService();

SendGrid.setApiKey(SENDGRID_API_KEY);

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {
	const msg: MailDataRequired = {
		to: "amatthiesen@outlook.com",
		from: "service@matthiesen.dev", // Use the email address or domain you verified above
		replyTo: "service@matthiesen.dev",
		subject: "Test email from Astro Endpoint",
		text: "Test email from Astro Endpoint, using SendGrid",
		html: "<strong>Test email from Astro Endpoint, using SendGrid</strong>",
	};

	try {
		await SendGrid.send(msg);
		return new Response("Email sent");
	} catch (error) {
		const {
			response: { body: errorResponse },
		} = error as { response: { body: string } };
		console.error(errorResponse);
		return new Response(`Email failed to send:\n${errorResponse}`, {
			status: 500,
		});
	}
};
