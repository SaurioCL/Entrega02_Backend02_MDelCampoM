import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export const welcomeEmail = async (userEmail) => {
  const mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: "Bienvenido a nuestra tienda",
    text: "¡Gracias por registrarte en nuestra tienda! Esperamos que disfrutes de tu experiencia.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de bienvenida enviado a ${userEmail}`);
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
};

export const sendPurchaseTicket = async (userEmail, ticket) => {
  const mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: "Tu compra ha sido realizada con éxito",
    text: `Gracias por tu compra. Aquí tienes tu ticket:\n\nCódigo: ${ticket.code}\nFecha: ${ticket.purchase_datetime}\nTotal: $${ticket.amount}\n\n¡Gracias por tu compra!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Ticket enviado a ${userEmail}`);
  } catch (error) {
    console.error("Error al enviar el ticket:", error);
  }
};
