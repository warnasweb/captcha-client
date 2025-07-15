import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from './constants';

export default function RecaptchaWidget({ onChange }) {
  return (
    <ReCAPTCHA
      sitekey={RECAPTCHA_SITE_KEY}
      onChange={onChange}
    />
  );
}
