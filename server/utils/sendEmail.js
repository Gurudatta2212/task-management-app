import { Resend } from "resend";

const sendEmail = async (to, subject, html) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Task Manager <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default sendEmail;