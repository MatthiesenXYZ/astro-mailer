import { type MailDataRequired, MailService } from "@sendgrid/mail";
import type { APIContext, APIRoute } from "astro";
import { SENDGRID_API_KEY } from "astro:env/server";
import { CONSTS } from "../../consts";

const { FROM_EMAIL, STUDIOCMS_TO_EMAIL } = CONSTS;

const SendGrid = new MailService();

SendGrid.setApiKey(SENDGRID_API_KEY);

function makeEmailBody(
	replyTo: string,
	displayName: string,
	message: string,
): { text: string } {
	return {
		text: `StudioCMS Beta Feedback\n\nFrom: ${displayName} (${replyTo})\n\nMessage: ${message}`,
	};
}

export const GET: APIRoute = async (): Promise<Response> => {
	const JSONResponseObject = {
		error: "GET request not supported",
	};

	return new Response(JSON.stringify(JSONResponseObject, null, 2), {
		status: 405,
	});
};

export const POST: APIRoute = async (
	context: APIContext,
): Promise<Response> => {
	const formData = await context.request.formData();
	const replyTo = formData.get("email") as string;
	const displayName = formData.get("name") as string;
	const subject = formData.get("subject") as string;
	const message = formData.get("message") as string;

	const { text } = makeEmailBody(replyTo, displayName, message);

	const msg: MailDataRequired = {
		to: STUDIOCMS_TO_EMAIL,
		from: FROM_EMAIL,
		replyTo,
		subject,
		text,
	};

	try {
		await SendGrid.send(msg);
		return new Response("Email sent", { status: 200 });
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
