import { useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import postsAtom from "../../atoms/postsAtom";
import { useParams } from "react-router-dom";
import "./CreatePost.css";

const MAX_CHAR = 500;

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [imgUrl, setImgUrl] = useState("");
  const imageRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const { username } = useParams();

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
        return;
      }
      alert("Success: Post created successfully");
      if (username === user.username) {
        setPosts([data, ...posts]);
      }
      setPostText("");
      setImgUrl("");
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="create-post-button"
        onClick={() => document.getElementById("create-post-modal").style.display = "block"}
      >
        Create Post
      </button>

      <div id="create-post-modal" className="create-post-modal">
        <h2>Create Post</h2>
        <textarea
          className="post-textarea"
          placeholder="Post content goes here.."
          onChange={handleTextChange}
          value={postText}
        />
        <div className="remaining-char">
          {remainingChar}/{MAX_CHAR}
        </div>

        <input
          type="file"
          hidden
          ref={imageRef}
          onChange={handleImageChange}
        />
        <button
          className="select-image-button"
          onClick={() => imageRef.current.click()}
        >
          Select Image
        </button>

        {imgUrl && (
          <div className="image-preview">
            <img src={imgUrl} alt="Selected" className="selected-image" />
            <button
              className="remove-image-button"
              onClick={() => setImgUrl("")}
            >
              X
            </button>
          </div>
        )}

        <div className="modal-footer">
          <button
            onClick={handleCreatePost}
            disabled={loading}
            className="post-submit-button"
          >
            {loading ? "Posting..." : "Post"}
          </button>
          <button
            onClick={() => document.getElementById("create-post-modal").style.display = "none"}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
