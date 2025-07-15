// RecaptchaV3Widget.jsx
import { useEffect } from 'react';
import { RECAPTCHA_V3_SITE_KEY } from './constants';

export default function RecaptchaV3Widget({ action = 'submit_form', setToken }) {
  useEffect(() => {
    const loadScript = () => {
      if (document.getElementById('recaptcha-v3')) return;

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_V3_SITE_KEY}`;
      script.id = 'recaptcha-v3';
      script.async = true;
      document.body.appendChild(script);
    };

    const executeCaptcha = () => {
      if (!window.grecaptcha) return;

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_V3_SITE_KEY, { action })
          .then((token) => {
            setToken(token);
          });
      });
    };

    loadScript();

    const interval = setInterval(() => {
      if (window.grecaptcha) {
        executeCaptcha();
        clearInterval(interval);
      }
    }, 500); // Wait for grecaptcha to load

    return () => clearInterval(interval);
  }, [action, setToken]);

  return null; // No visual element for v3
}
