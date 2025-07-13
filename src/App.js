import React, { useState } from 'react';
import RecaptchaWidget from './RecaptchaWidget';
import TurnstileWidget from './TurnstileWidget';
import axios from 'axios';

export default function App() {
  const [captchaType, setCaptchaType] = useState('recaptcha'); // 'recaptcha' or 'turnstile'
  const [captchaToken, setCaptchaToken] = useState('');
  const [name, setName] = useState('');
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
        : 'http://localhost:5001/verify/turnstile';

    try {
      const res = await axios.post(endpoint, {
        name,
        token: captchaToken,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Verification failed.');
    }
  };

  // Reset token when captchaType changes (optional)
  React.useEffect(() => {
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
        <br />
        <br />

        {captchaType === 'recaptcha' ? (
          <RecaptchaWidget onChange={setCaptchaToken} />
        ) : (
          <TurnstileWidget onVerify={setCaptchaToken} />
        )}

        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
