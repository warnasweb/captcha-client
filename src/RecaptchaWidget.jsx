import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from './constants';

const SITE_KEY = '6Lf3loErAAAAALWLxPDOfwFnLp23Svzfo1MuEbdf'; // Replace with your reCAPTCHA v2 site key

export default function RecaptchaWidget({ onChange }) {
  return (
    <ReCAPTCHA
      sitekey={RECAPTCHA_SITE_KEY}
      onChange={onChange}
    />
  );
}
