"use client";
import { Turnstile } from '@marsidev/react-turnstile';

const TurnstileCaptcha = ({ onVerify }) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={(token) => {
        onVerify(token); // devuelve el token al componente padre
      }}
    />
  );
};

export default TurnstileCaptcha;
