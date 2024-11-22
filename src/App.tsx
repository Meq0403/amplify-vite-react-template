import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import UserProfile from './UserProfile.tsx';

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]); // Updated for "Post"

   // Fetch posts and observe changes
  useEffect(() => {
      client.models.Post.observeQuery().subscribe({
    next: (data) => setPosts([...data.items]), // Updated for "Post"
  });
}, []);
  
   // Create a new post
   function createPost() {
    const postTitle = window.prompt("Enter post title:");
    const postContent = window.prompt("Enter post content:");
      if (postTitle && postContent) {
      client.models.Post.create({
        title: postTitle,
        content: postContent,
        createdAt: new Date().toISOString(), // Optional: add a timestamp
      });
      console.log("Post created successfully!");
    } else {
      console.log("Post creation cancelled or invalid input.");
    }
  }
  
  new: function deletePost(id: string) {
  client.models.Post.delete({ id });
  console.log(Post with id ${id} deleted successfully!);
}
  
  return (
    <main>
         <h1>{user?.signInDetails?.loginId}'s posts</h1> {/* Updated for "posts" */}
<button onClick={createPost}>+ New Post</button>
     new: <ul>
  {posts.map((post) => (
    <li 
      onClick={() => deletePost(post.id)}
      key={post.id}>
      <strong>{post.title}</strong>: {post.content}
    </li>
  ))}
</ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        idk anymore, please work maybe?
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
}

export default App;
