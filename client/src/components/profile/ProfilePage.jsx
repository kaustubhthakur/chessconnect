import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import postsAtom from "../../atoms/postsAtom";

const ProfilePage = () => {
  const { username } = useParams();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [user, setUser] = useState(null); // State for storing user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:9000/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          alert("Error: " + data.error);
        } else {
          setUser(data);
        }
      } catch (error) {
        alert("Error fetching user profile: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [username]);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        alert("Error fetching posts: " + error.message);
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, user, setPosts]);

  if (!user && loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <div className="profile-page">
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      {user.profilePic && <img src={user.profilePic} alt="Profile" />}
      <p>Bio: {user.bio}</p>
      <p>Followers: {user.followers.length}</p>
      <p>Following: {user.following.length}</p>

      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
      {fetchingPosts && (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* Display posts here, if necessary */}
      <div>
        {posts.length > 0 && posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
