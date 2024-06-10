const PostManager = ({ posts, onPublish }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <button onClick={() => onPublish(post._id)}>Publish</button>
        </div>
      ))}
    </div>
  );
};

export default PostManager;
