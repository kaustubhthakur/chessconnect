import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import "./ProfilePage.css"; // Import the CSS for styling

const ProfilePage = () => {
  const user = useRecoilValue(userAtom); // Get the logged-in user info from Recoil state
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for handling API failures

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch(`http://localhost:9000/users/profile/${user._id}`, {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });
        
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setProfileData(data);
        }
      } catch (error) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={profileData.profilePic || "/default-profile.png"}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          <h2>{profileData.username}</h2>
          <p>{profileData.bio || "No bio available."}</p>
          <p>Email: {profileData.email}</p>
          <div className="followers-following">
            <span>{profileData.followers.length} Followers</span>
            <span>{profileData.following.length} Following</span>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        {/* Render posts here if needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
