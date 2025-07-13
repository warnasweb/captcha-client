import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '6LftWX4rAAAAAAX4MHf17aSroP5bVwPU7RAsTszx';

export default function RecaptchaWidget({ onChange }) {
  return (
    <ReCAPTCHA
      sitekey={SITE_KEY}
      onChange={onChange}
    />
  );
}
