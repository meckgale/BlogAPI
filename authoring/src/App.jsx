import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostEditor from "./components/PostEditor";
import PostManager from "./components/PostManager";
import PrivateRoute from "./components/PrivateRoute";
import { useContext } from "react";

function App() {
  const { authToken } = useContext(AuthContext);
  console.log("Auth Token:", authToken); // Add this line to log the token

  const handleSave = async (post) => {
    const url = post._id
      ? `http://localhost:5000/posts/${post._id}`
      : "http://localhost:5000/posts";
    const method = post._id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Ensure authToken is being sent correctly
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Post saved:", data);
    } catch (error) {
      console.error("Save post error:", error);
      alert("Failed to save post: " + error.message);
    }
  };

  const handlePublish = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Ensure authToken is accessible here
        },
        body: JSON.stringify({ published: true }), // Assuming you want to set published to true
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Post published:", data);
      } else {
        throw new Error(data.message || "Unable to publish post");
      }
    } catch (error) {
      console.error("Publish post error:", error);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <div className="App">
              <h1>Blog Authoring</h1>
              <PostEditor onSave={handleSave} />
              <PostManager posts={[]} onPublish={handlePublish} />
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
