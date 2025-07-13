import React from 'react';
import Turnstile from 'react-turnstile';

const SITE_KEY = '0x4AAAAAABk7LacJYysXuPUb';

export default function TurnstileWidget({ onVerify }) {
  return (
    <Turnstile
      sitekey={SITE_KEY}
      onVerify={onVerify}
    />
  );
}
