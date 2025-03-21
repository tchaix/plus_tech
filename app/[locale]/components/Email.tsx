import * as React from 'react';

interface EmailProps {
  email: string;
  message: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({
  email, message
}) => (
  <div>
    <h1>Nouveau message de : {email}!</h1>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
  </div>
);