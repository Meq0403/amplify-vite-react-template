import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<{ id: string; imageUrl: string }>>([
    {
      id: "1",
      imageUrl: "https://via.placeholder.com/150", // Example placeholder image
    },
  ]);

  function createTodo() {
    const imageUrl = window.prompt("Enter the URL of the image for your todo");
    if (imageUrl) {
      const newTodo = { id: Date.now().toString(), imageUrl };
      setTodos([...todos, newTodo]);
    }
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <main>
      <h1>Guest User's todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}
            style={{ cursor: "pointer" }}
          >
            <img
              src={todo.imageUrl}
              alt="Todo"
              style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover" }}
            />
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
