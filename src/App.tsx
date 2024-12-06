import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import UserProfile from './UserProfile.tsx';

const client = generateClient<Schema>();

function App() {
  // const { user, signOut } = useAuthenticator();
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([
    { id: "1", title: "Sample Post 1", content: "This is a hardcoded post.", createdAt: "2024-12-02", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm2-IiCQnnEHH1dk5HN2K60xrv8Wyu8VRW7Q&s" },
    { id: "2", title: "Sample Post 2", content: "This is another hardcoded post.", createdAt: "2024-12-01", image: "" },
  ]);
  
   // Fetch posts and observe changes
<<<<<<< HEAD
  // useEffect(() => {
  //   const subscription = client.models.Post.observeQuery().subscribe({
  //     next: (data) => setPosts([...data.items]),
  //     error: (err) => console.error("Error fetching posts:", err),
  //   });

  //   return () => subscription.unsubscribe(); // Cleanup subscription
  // }, []);
  
   // Create a new post
  // Create a new post and update state
async function createPost() {
  const postTitle = window.prompt("Enter post title:");
  const postContent = window.prompt("Enter post content:");
  const postImage = window.prompt("Please provide an image URL (if any):");

  // Prompt user to upload an image
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = `post-images/${Date.now()}-${file.name}`; // Unique file name
      const s3ImageUrl = await uploadImageToS3(file, fileName); // Upload the image to S3

      // Now create the post with the image URL
      if (postTitle && postContent) {
        try {
          const newPost = {
            title: postTitle,
            content: postContent,
            createdAt: new Date().toISOString(),
            image: s3ImageUrl, // Store the image URL in the Post model
          };

          // Save to the database
          const savedPost = await client.models.Post.create(newPost);

          // Update the posts state directly
          setPosts((prevPosts) => [...prevPosts, savedPost]); // Append new post to the list
          console.log("Post created successfully!");
        } catch (err) {
          console.error("Error creating post:", err);
        }
      } else {
        console.log("Post creation cancelled or invalid input.");
      }
    }
  };

  fileInput.click();
}

=======
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
>>>>>>> e845fee298b18c8c3d1aadeddf44ba8d335f9039
  
  new: function deletePost(id: string) {
  client.models.Post.delete({ id });
  console.log(Post with id ${id} deleted successfully!);
}
  
  return (
    <main>
<<<<<<< HEAD
     {/* <h1>{user?.signInDetails?.loginId}'s posts</h1> {} */}
=======
         <h1>{user?.signInDetails?.loginId}'s posts</h1> {/* Updated for "posts" */}
>>>>>>> e845fee298b18c8c3d1aadeddf44ba8d335f9039
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
        {/* <button onClick={signOut}>Sign out</button> */}
      </div>
    </main>
  );
}



export default App;
