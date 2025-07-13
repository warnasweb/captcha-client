import React from 'react';
import Turnstile from 'react-turnstile';

const SITE_KEY = '<ADD TURNSTILE Secret here>'; // get the secrect from https://dash.cloudflare.com/sign-up?to=/:account/turnstile


export default function TurnstileWidget({ onVerify }) {
  return (
    <Turnstile
      sitekey={SITE_KEY}
      onVerify={onVerify}
    />
  );
}
