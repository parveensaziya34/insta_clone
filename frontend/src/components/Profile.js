// import React, { useEffect, useState } from "react";
// import PostDetail from "./PostDetail";
// import "./Profile.css";
// import ProfilePic from "./ProfilePic";

// export default function Profie() {
//   var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
//   const [pic, setPic] = useState([]);
//   const [show, setShow] = useState(false)
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState("")
//   const [changePic, setChangePic] = useState(false)


//   const toggleDetails = (posts) => {
//     if (show) {
//       setShow(false);
//     } else {
//       setShow(true);
//       setPosts(posts);
//     }
//   };

//   const changeprofile = () => {
//     if (changePic) {
//       setChangePic(false)
//     } else {
//       setChangePic(true)
//     }
//   }


//   useEffect(() => {
//     fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result)
//         setPic(result.post);
//         setUser(result.user)
//         console.log(pic);
//       });
//   }, []);

//   return (
//     <div className="profile">
//       {/* Profile frame */}
//       <div className="profile-frame">
//         {/* profile-pic */}
//         <div className="profile-pic">
//           <img
//             onClick={changeprofile}
//             src={user.Photo ? user.Photo : picLink}
//             alt=""
//           />
//         </div>
//         {/* profile-data */}
//         <div className="pofile-data">
//           <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
//           <div className="profile-info" style={{ display: "flex" }}>
//             <p>{pic ? pic.length : "0"} posts</p>
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
//         {pic.map((pics) => {
//           return <img key={pics._id} src={pics.photo}
//             onClick={() => {
//               toggleDetails(pics)
//             }}
//             className="item"></img>;
//         })}
//       </div>
//       {show &&
//         <PostDetail item={posts} toggleDetails={toggleDetails} />
//       }
//       {
//         changePic &&
//         <ProfilePic changeprofile={changeprofile} />
//       }
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import ProfilePic from "./ProfilePic";

export default function Profile() {
  const defaultPicLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState(null); // Store the post detail data
  const [user, setUser] = useState({});
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (post) => {
    setShow(!show);  // Toggle show state
    setPosts(post);   // Set the post details
  };

  const changeProfile = () => {
    setChangePic(!changePic);  // Toggle change profile state
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const token = localStorage.getItem("jwt");
    
    fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.posts); // Assuming 'result.posts' contains all the posts
        setUser(result.user); // Assuming 'result.user' contains user details
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* Profile picture */}
        <div className="profile-pic">
          <img
            onClick={changeProfile}
            src={user.Photo ? user.Photo : defaultPicLink}
            alt="Profile"
          />
        </div>
        
        {/* Profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />

      {/* Gallery */}
      <div className="gallery">
        {pic.map((post) => {
          return (
            <img
              key={post._id}
              src={post.photo}
              alt="Post"
              onClick={() => toggleDetails(post)}  // Pass individual post to toggleDetails
              className="item"
            />
          );
        })}
      </div>

      {/* Show Post Details */}
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      
      {/* Change Profile Picture Modal */}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}
