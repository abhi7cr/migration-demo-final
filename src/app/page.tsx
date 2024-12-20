'use client';

import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplify_outputs.json'
Amplify.configure(config);

function App({ signOut, user }: WithAuthenticatorProps) {
  return (
      <>
        <h1>Hello {user?.username}</h1>
        <button onClick={signOut}>Sign out</button>
      </>
  );
}

export default withAuthenticator(App);
