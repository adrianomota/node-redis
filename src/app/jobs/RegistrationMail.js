import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadasto de usuário',
      html: `Olá ${user.name}, bem vindo ao sistema de filas do Redis com Node.js`,
    });
  },
};
