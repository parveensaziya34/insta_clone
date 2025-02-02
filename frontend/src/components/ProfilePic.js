// import React, { useState, useEffect, useRef } from "react";

// export default function ProfilePic({ changeprofile }) {
//   const hiddenFileInput = useRef(null);
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");

//   // posting image to cloudinary
//   const postDetails = () => {
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "insta-clone");
//     data.append("cloud_name", "cantacloud2");
//     fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => setUrl(data.url))
//       .catch((err) => console.log(err));
//     console.log(url);
//   };

//   const postPic = () => {
//     // saving post to mongodb
//     fetch("http://localhost:5000/uploadProfilePic", {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({
//         pic: url,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         changeprofile();
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleClick = () => {
//     hiddenFileInput.current.click();
//   };

//   useEffect(() => {
//     if (image) {
//       postDetails();
//     }
//   }, [image]);
//   useEffect(() => {
//     if (url) {
//       postPic();
//     }
//   }, [url]);
//   return (
//     <div className="profilePic darkBg">
//       <div className="changePic centered">
//         <div>
//           <h2>Change Profile Photo</h2>
//         </div>
//         <div style={{ borderTop: "1px solid #00000030" }}>
//           <button
//             className="upload-btn"
//             style={{ color: "#1EA1F7" }}
//             onClick={handleClick}
//           >
//             Upload Photo
//           </button>
//           <input
//             type="file"
//             ref={hiddenFileInput}
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//             }}
//           />
//         </div>
//         <div style={{ borderTop: "1px solid #00000030" }}>
//           <button className="upload-btn" style={{ color: "#ED4956" }}>
//             {" "}
//             Remove Current Photo
//           </button>
//         </div>
//         <div style={{ borderTop: "1px solid #00000030" }}>
//           <button
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "15px",
//             }}
//             onClick={changeprofile}
//           >
//             cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );




import React, { useState, useEffect, useRef } from "react";

export default function ProfilePic({ changeprofile }) {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the image upload

  // Posting image to Cloudinary
  const postDetails = () => {
    setLoading(true); // Start loading when uploading image
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "cantacloud2");

    fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setLoading(false); // Stop loading when the image is uploaded
      })
      .catch((err) => {
        setLoading(false); // Stop loading in case of error
        console.log(err);
        alert("Error uploading image. Please try again.");
      });
  };

  // Updating profile picture on server
  const postPic = () => {
    if (!url) return; // Avoid posting if no URL is available
    fetch("http://localhost:5000/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeprofile(); // Update profile
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating profile picture.");
      });
  };

  // Handle file input click
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // Handle file change and initiate image upload
  useEffect(() => {
    if (image) {
      postDetails(); // Upload the image to Cloudinary when selected
    }
  }, [image]);

  // Handle URL change and update the profile
  useEffect(() => {
    if (url) {
      postPic(); // Once the image is uploaded, update the profile
    }
  }, [url]);

  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
            disabled={loading} // Disable button while uploading
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        {image && (
          <div style={{ marginTop: "20px" }}>
            <h5>Image Preview:</h5>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#ED4956" }}>
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={changeprofile}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
