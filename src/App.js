import React, { useState, useEffect } from 'react';
import RecaptchaWidget from './RecaptchaWidget';       // v2
import TurnstileWidget from './TurnstileWidget';       // Turnstile
import RecaptchaV3Widget from './RecaptchaV3Widget';   // v3
import axios from 'axios';

export default function App() {
  const [captchaType, setCaptchaType] = useState('recaptcha'); // 'recaptcha', 'recaptcha-v3', 'turnstile'
  const [captchaToken, setCaptchaToken] = useState('');
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('pass');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    const endpoint =
      captchaType === 'recaptcha'
        ? 'http://localhost:5001/verify/recaptcha'
        : captchaType === 'recaptcha-v3'
        ? 'http://localhost:5001/verify/recaptcha-v3'
        : 'http://localhost:5001/verify/turnstile';

    try {
      const res = await axios.post(endpoint, {
        name,flag,
        token: captchaToken,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Verification failed.');
    }
  };

  // Reset token when captchaType changes
  useEffect(() => {
    setCaptchaToken('');
  }, [captchaType]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Choose CAPTCHA Type</h2>

      <label>
        <input
          type="radio"
          value="recaptcha"
          checked={captchaType === 'recaptcha'}
          onChange={() => setCaptchaType('recaptcha')}
        />
        Google reCAPTCHA v2
      </label>

      <label style={{ marginLeft: '1rem' }}>
        <input
          type="radio"
          value="recaptcha-v3"
          checked={captchaType === 'recaptcha-v3'}
          onChange={() => setCaptchaType('recaptcha-v3')}
        />
        Google reCAPTCHA v3
      </label>

      <label style={{ marginLeft: '1rem' }}>
        <input
          type="radio"
          value="turnstile"
          checked={captchaType === 'turnstile'}
          onChange={() => setCaptchaType('turnstile')}
        />
        Cloudflare Turnstile
      </label>

      <hr />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your name"
          required
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        />
        <br /><br />

        {/* Dynamically render CAPTCHA widget based on selection */}
        {captchaType === 'recaptcha' && (
          <RecaptchaWidget onChange={setCaptchaToken} />
        )}

        {captchaType === 'recaptcha-v3' && (
          <RecaptchaV3Widget action="submit_form" setToken={setCaptchaToken} />
        )}

        {captchaType === 'turnstile' && (
          <TurnstileWidget onVerify={setCaptchaToken} />
        )}

        <br /><br />
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
