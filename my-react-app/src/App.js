import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://uploader.p-e.kr";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일들
  const [previews, setPreviews] = useState([]); // 미리보기 URL들
  const [userName, setUserName] = useState("");
  const [images, setImages] = useState([]); // 조회된 이미지 리스트
  const [selectedImageIds, setSelectedImageIds] = useState([]); // 선택된 이미지들의 ID들

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // 파일의 미리보기 URL 생성
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  // 파일 업로드
  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i]);
    }
    formData.append("user", userName);

    try {
      const response = await axios.post(`${API_BASE_URL}/image/user`, formData);
      alert("Images uploaded successfully");
      setPreviews([]); // 업로드 후 미리보기 초기화
      setSelectedFiles([]); // 업로드 후 선택된 파일 초기화
    } catch (error) {
      console.error("Error uploading images", error);
      alert("Failed to upload images");
    }
  };

  // 이미지 조회
  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/image/user/${userName}`
      );
      setImages(response.data.data.path);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  // 이미지 삭제
  const handleDelete = async () => {
    try {
      for (let id of selectedImageIds) {
        await axios.delete(`${API_BASE_URL}/image/user/${id}`);
      }
      alert("Selected images deleted successfully");
      fetchImages(); // 삭제 후 목록 갱신
      setSelectedImageIds([]); // 선택된 이미지 초기화
    } catch (error) {
      console.error("Error deleting images", error);
      alert("Failed to delete images");
    }
  };

  // 이미지 선택 처리
  const handleImageSelect = (uuidName) => {
    setSelectedImageIds((prevState) =>
      prevState.includes(uuidName)
        ? prevState.filter((id) => id !== uuidName)
        : [...prevState, uuidName]
    );
  };

  return (
    <div className="container">
      <h1>Image Upload and Management</h1>

      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>

        <h2>Selected Images Preview</h2>
        <div className="preview-container">
          {previews.map((preview, index) => (
            <img key={index} src={preview} alt="Preview" />
          ))}
        </div>
      </div>

      <div className="management-section">
        <button onClick={fetchImages}>Fetch Uploaded Images</button>

        <h2>Uploaded Images</h2>
        {images.length > 0 ? (
          <ul>
            {images.map((image) => (
              <li key={image.uuidName}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleImageSelect(image.uuidName)}
                  />
                </label>
                <img src={image.url} alt={image.originName} />
                <span>{image.originName}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No images uploaded yet.</p>
        )}

        {selectedImageIds.length > 0 && (
          <button onClick={handleDelete}>Delete Selected Images</button>
        )}
      </div>
    </div>
  );
}

export default App;
