import env from '../../config/env';
import logger from '../logger';

const mailgunlib = require('mailgun-js');

const API_KEY = env.mailgun_api_key;
const DOMAIN = env.mailgun_domain;
const mailgun = mailgunlib({ apiKey: API_KEY, domain: DOMAIN });

/**
 * Queue handler that asynchronously sends an email to a user, using a `templateId`
 *  if specified in the job data.
 * @param job
 */
export const sendMailGeneric = (data) => {
  try {
    const {
      to, templateId, dynamic_template_data, title,
    } = data;
    const mailOptions = {
      from: env.sca_email,
      to,
      template: templateId,
      'h:X-Mailgun-Variables': JSON.stringify(dynamic_template_data),
      subject: title,
    };
    mailgun.messages().send(mailOptions, (error, body) => {
      if (error) logger.error(error);
    });
  } catch (error) {
    logger.error(error);
  }
};
