import React from 'react';
import Turnstile from 'react-turnstile';
import { TURNSTILE_SITE_KEY } from './constants';

export default function TurnstileWidget({ onVerify }) {
  return (
    <Turnstile
      sitekey={TURNSTILE_SITE_KEY}
      onVerify={onVerify}
    />
  );
}
