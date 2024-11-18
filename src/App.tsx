import { useEffect, useState } from "react";
import Link from 'react-router-dom';
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
 // const { signOut } = useAuthenticator();
    
  return (
    <main>
      <button>Test</button>
    </main>
  );
}

export default App;
