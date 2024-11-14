import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import { Link } from "react-router-dom"; 

import UserPage from './UserPage.tsx'

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
 // const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  
  return (
    <Router>
      <div>
        <nav>
          <Link to="/userPage">Go to User Page</Link>
        </nav>
        <Switch>
          <Route path="/userPage" component={UserPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
