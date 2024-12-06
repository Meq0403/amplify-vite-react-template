import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

//testing code start ----
// Mock Client
const mockClient = {
  models: {
    Post: {
      // Mock method for observing queries
      observeQuery: () => ({
        subscribe: ({ next }: any) => {
          // Simulate initial fetch of posts
          setTimeout(() => {
            next({
              items: [
                { id: "1", title: "Sample Post 1", content: "Mock content 1", createdAt: "2024-12-02" },
                { id: "2", title: "Sample Post 2", content: "Mock content 2", createdAt: "2024-12-01" },
              ],
            });
          }, 500);

          // Mock unsubscribe
          return { unsubscribe: () => {} };
        },
      }),
      // Mock method for creating a post
      create: (data: any) => {
        console.log("Mock create post:", data);
      },
      // Mock method for deleting a post
      delete: ({ id }: { id: string }) => {
        console.log(`Mock delete post with id: ${id}`);
      },
    },
  },
};

// Use the mock client instead of the real client
const client = mockClient;


//testing code end ----

function App() {
  // const { user, signOut } = useAuthenticator();
  const [posts, setPosts] = useState<Array<Schema["Post"]["type"]>>([]);

  // Fetch posts and observe changes
  useEffect(() => {
    const subscription = client.models.Post.observeQuery({}).subscribe({
      next: (data) => setPosts(data.items),
    });
    return () => subscription.unsubscribe(); // Cleanup subscription
  }, []);


  function createPost() {
    const postTitle = window.prompt("Enter post title:");
    const postContent = window.prompt("Enter post content:");
    if (postTitle && postContent) {
      const newPost = {
        id: (Math.random() * 1000).toString(),
        title: postTitle,
        content: postContent,
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]); // Add new post to state
      client.models.Post.create(newPost); // Mock backend call
    }
  }

    // Delete a post
    const deletePost = (id: string) => {
      client.models.Post.delete({ id });
      console.log(`Post with id ${id} deleted successfully!`);
      setPosts(posts.filter((post) => post.id !== id)); // Remove post locally

    };
 


  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>My Social Media</h1>
        <button style={styles.newPostButton} onClick={createPost}>
          + New Post
        </button>
      </header>

      {/* Profile Section */}
      <section style={styles.profile}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={styles.profilePicture}
        />
        <h2>Your Profile</h2>
        <p>Welcome back! Share something with your friends.</p>
      </section>

      {/* Feed Section */}
      <section style={styles.feed}>
        <h2>Recent Posts</h2>
        <ul style={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} style={styles.post}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p>{post.content}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
              <button style={styles.deleteButton} onClick={() => deletePost(post.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
    borderBottom: "1px solid #ccc",
  },
  newPostButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0",
    borderBottom: "1px solid #ccc",
  },
  profilePicture: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    marginRight: "1rem",
  },
  feed: {
    padding: "1rem 0",
  },
  postList: {
    listStyle: "none",
    padding: 0,
  },
  post: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
  },
  postTitle: {
    margin: "0 0 0.5rem",
  },
  deleteButton: {
    marginTop: "0.5rem",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#FF4D4F",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;