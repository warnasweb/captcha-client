import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '<ADD RECAPTCHA Secret here>'; // get the secrect from https://www.google.com/recaptcha

export default function RecaptchaWidget({ onChange }) {
  return (
    <ReCAPTCHA
      sitekey={SITE_KEY}
      onChange={onChange}
    />
  );
}
