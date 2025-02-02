// import React, { useEffect, useState } from "react";
// import PostDetail from "./PostDetail";
// import "./Profile.css";
// import { useParams } from "react-router-dom";

// export default function UserProfie() {
//   var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
//   const { userid } = useParams();
//   const [isFollow, setIsFollow] = useState(false);
//   const [user, setUser] = useState("");
//   const [posts, setPosts] = useState([]);

//   // to follow user
//   const followUser = (userId) => {
//     fetch("http://localhost:5000/follow", {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({
//         followId: userId,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setIsFollow(true);
//       });
//   };

//   // to unfollow user
//   const unfollowUser = (userId) => {
//     fetch("http://localhost:5000/unfollow", {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({
//         followId: userId,
//       }),
//     })
//       .then((res) => {
//         res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setIsFollow(false);
//       });
//   };

//   useEffect(() => {
//     fetch(`http://localhost:5000/user/${userid}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         setUser(result.user);
//         setPosts(result.post);
//         if (
//           result.user.followers.includes(
//             JSON.parse(localStorage.getItem("user"))._id
//           )
//         ) {
//           setIsFollow(true);
//         }
//       });
//   }, [isFollow]);

//   return (
//     <div className="profile">
//       {/* Profile frame */}
//       <div className="profile-frame">
//         {/* profile-pic */}
//         <div className="profile-pic">
//           <img src={user.Photo ? user.Photo : picLink} alt="" />
//         </div>
//         {/* profile-data */}
//         <div className="pofile-data">
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1>{user.name}</h1>
//             <button
//               className="followBtn"
//               onClick={() => {
//                 if (isFollow) {
//                   unfollowUser(user._id);
//                 } else {
//                   followUser(user._id);
//                 }
//               }}
//             >
//               {isFollow ? "Unfollow" : "Follow"}
//             </button>
//           </div>
//           <div className="profile-info" style={{ display: "flex" }}>
//             <p>{posts.length} posts</p>
//             <p>{user.followers ? user.followers.length : "0"} followers</p>
//             <p>{user.following ? user.following.length : "0"} following</p>
//           </div>
//         </div>
//       </div>
//       <hr
//         style={{
//           width: "90%",

//           opacity: "0.8",
//           margin: "25px auto",
//         }}
//       />
//       {/* Gallery */}
//       <div className="gallery">
//         {posts.map((pics) => {
//           return (
//             <img
//               key={pics._id}
//               src={pics.photo}
//               // onClick={() => {
//               //     toggleDetails(pics)
//               // }}
//               className="item"
//             ></img>
//           );
//         })}
//       </div>
//       {/* {show &&
//         <PostDetail item={posts} toggleDetails={toggleDetails} />
//       } */}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

export default function UserProfile() {
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"; // Default profile picture

  // Follow user
  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(true);
      })
      .catch((err) => console.error("Error following user:", err));
  };

  // Unfollow user
  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(false);
      })
      .catch((err) => console.error("Error unfollowing user:", err));
  };

  // Fetch user details and posts
  useEffect(() => {
    setLoading(true); // Show loading indicator while fetching data
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
        setLoading(false); // Hide loading indicator after fetching data
      })
      .catch((err) => {
        setLoading(false); // Hide loading if an error occurs
        console.error("Error fetching user data:", err);
      });
  }, [userid, isFollow]); // Refresh whenever `userid` or `isFollow` changes

  return (
    <div className="profile">
      {loading ? (
        <div>Loading...</div> // Loading message while data is being fetched
      ) : (
        <>
          {/* Profile frame */}
          <div className="profile-frame">
            {/* Profile picture */}
            <div className="profile-pic">
              <img
                src={user.Photo ? user.Photo : picLink}
                alt="User Profile"
              />
            </div>

            {/* Profile data */}
            <div className="profile-data">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h1>{user.name}</h1>
                <button
                  className="followBtn"
                  onClick={() => {
                    if (isFollow) {
                      unfollowUser(user._id);
                    } else {
                      followUser(user._id);
                    }
                  }}
                >
                  {isFollow ? "Unfollow" : "Follow"}
                </button>
              </div>

              {/* Profile info */}
              <div className="profile-info" style={{ display: "flex" }}>
                <p>{posts.length} posts</p>
                <p>{user.followers ? user.followers.length : "0"} followers</p>
                <p>{user.following ? user.following.length : "0"} following</p>
              </div>
            </div>
          </div>

          <hr
            style={{
              width: "90%",
              opacity: "0.8",
              margin: "25px auto",
            }}
          />

          {/* Gallery */}
          <div className="gallery">
            {posts.map((pics) => {
              return (
                <img
                  key={pics._id}
                  src={pics.photo}
                  alt="Post"
                  className="item"
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
