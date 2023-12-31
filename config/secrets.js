import dotenv from "dotenv";
dotenv.config();

export const {
	PORT,
	SENDER_MAIL_PWD,
	SENDER_MAIL_ID,
	SEND_CONTACT_MAIL_TO,
	MAILCHIMP_API_KEY,
	MAILCHIMP_LIST_ID,
	MAILCHIMP_SERVER_PREFIX,
	MONGO_URI,
} = process.env;
