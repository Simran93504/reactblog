import React, { useState } from 'react';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');

  const handlePublish = () => {
    if(newBlog.trim() !== ''){
      setBlogs([...blogs, { id: blogs.length + 1, content: newBlog, likes: 0, comments: [] }]);
      setNewBlog('');
    }
  };

  const handleLike = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

  const handleComment = (id, comment) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, comment] }
          : blog
      )
    );
  };

  return (
    <div className="App">
      <h1>Simple Blog App</h1>
      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Write your blog here..."
          value={newBlog}
          onChange={(e) => setNewBlog(e.target.value)}
        ></textarea>
        <br />
        <button onClick={handlePublish}>Publish</button>
      </div>
      <div>
        <h2>Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <p>{blog.content}</p>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => handleLike(blog.id)}>Like</button>
            <br />
            <input
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setNewBlog(e.target.value)}
            />
            <button onClick={() => handleComment(blog.id, newBlog)}>
              Comment
            </button>
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
