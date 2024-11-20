import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]); // Updated for "Post"

   // Fetch posts and observe changes
  useEffect(() => {
    const subscription = client.models.Post.observeQuery().subscribe({
      next: (data) => setPosts([...data.items]),
      error: (err) => console.error("Error fetching posts:", err),
    });

    return () => subscription.unsubscribe(); // Cleanup subscription
  }, []);
  
   // Create a new post
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
          await client.models.Post.create({
            title: postTitle,
            content: postContent,
            createdAt: new Date().toISOString(),
            image: s3ImageUrl, // Store the image URL in the Post model
          });
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

  
// Function to upload image to S3 and return the URL
async function uploadImageToS3(file, fileName) {
  const s3Storage = await import("aws-amplify").then((aws) => aws.Storage);

  try {
    // Upload image to S3
    const uploadedFile = await s3Storage.put(fileName, file, {
      contentType: file.type,
    });

    // Get the public URL of the uploaded file
    const fileUrl = await s3Storage.get(uploadedFile.key, { level: "public" });
    return fileUrl;
  } catch (err) {
    console.error("Error uploading image:", err);
    return null;
  }
}
  
 // Delete a post
  async function deletePost(id: string) {
    try {
      await client.models.Post.delete({ id });
      console.log(`Post with id ${id} deleted successfully!`);
    } catch (err) {
      console.error(`Error deleting post with id ${id}:`, err);
    }
  }
  
  return (
    <main>
     <h1>{user?.signInDetails?.loginId}'s posts</h1> {/* Updated for "posts" */}
<button onClick={createPost}>+ New Post</button>
    <ul>
  {posts.map((post) => (
    <li 
      onClick={() => deletePost(post.id)}
      key={post.id} // Ensure post.id is unique
      >
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
