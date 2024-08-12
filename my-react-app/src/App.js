import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// 백엔드 API 도메인 설정
const API_BASE_URL = "https://uploader.p-e.kr";

function App() {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userName) {
      fetchImages(userName);
    }
  }, [userName]);

  const fetchImages = async (user) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/image/user/${user}`);
      setImages(response.data.data.path);
    } catch (error) {
      console.error("Error fetching images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i]);
    }
    formData.append("user", userName);

    try {
      await axios.post(`${API_BASE_URL}/image/user`, formData);
      alert("Images uploaded successfully");
      fetchImages(userName);
    } catch (error) {
      console.error("Error uploading images", error);
    }
  };

  const handleDelete = async (uuidName) => {
    try {
      await axios.delete(`${API_BASE_URL}/image/user/${uuidName}`);
      alert("Image deleted successfully");
      fetchImages(userName);
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div className="container">
      <h1>Image Upload and Display</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <ImageList images={images} onDelete={handleDelete} loading={loading} />
    </div>
  );
}

function ImageList({ images, onDelete, loading }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!images.length) {
    return <p className="no-images">No images uploaded yet.</p>;
  }

  return (
    <ul>
      {images.map((image) => (
        <li key={image.uuidName}>
          <img src={image.url} alt="Uploaded" />
          <button onClick={() => onDelete(image.uuidName)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
