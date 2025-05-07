const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
  // Create test account (only needed if you're not using your own Ethereal credentials)
  const testAccount = await nodemailer.createTestAccount();

  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user, // or process.env.ETHEREAL_USER
      pass: testAccount.pass, // or process.env.ETHEREAL_PASS
    },
  });

  const emailOptions = {
    from: '"TiffinMitra" <no-reply@tiffinmitra.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info = await transport.sendMail(emailOptions);

  console.log('📨 Message sent: %s', info.messageId);
  console.log('🔗 Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
