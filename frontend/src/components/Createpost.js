// import React, { useState, useEffect } from "react";
// import "./Createpost.css";
// import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

// export default function Createpost() {
//   const [body, setBody] = useState("");
//   const [image, setImage] = useState("")
//   const [url, setUrl] = useState("")
//   const navigate = useNavigate()

//   // Toast functions
//   const notifyA = (msg) => toast.error(msg)
//   const notifyB = (msg) => toast.success(msg)


//   useEffect(() => {

//     // saving post to mongodb
//     if (url) {

//       fetch("http://localhost:5000/createPost", {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + localStorage.getItem("jwt")
//         },
//         body: JSON.stringify({
//           body,
//           pic: url
//         })
//       }).then(res => res.json())
//         .then(data => {
//           if (data.error) {
//             notifyA(data.error)
//           } else {
//             notifyB("Successfully Posted")
//             navigate("/")
//           }
//         })
//         .catch(err => console.log(err))
//     }

//   }, [url])


//   // posting image to cloudinary
//   const postDetails = () => {

//     console.log(body, image)
//     const data = new FormData()
//     data.append("file", image)
//     data.append("upload_preset", "insta-clone")
//     data.append("cloud_name", "cantacloud2")
//     fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
//       method: "post",
//       body: data
//     }).then(res => res.json())
//       .then(data => setUrl(data.url))
//       .catch(err => console.log(err))
//     console.log(url)

//   }


//   const loadfile = (event) => {
//     var output = document.getElementById("output");
//     output.src = URL.createObjectURL(event.target.files[0]);
//     output.onload = function () {
//       URL.revokeObjectURL(output.src); // free memory
//     };
//   };
//   return (
//     <div className="createPost">
//       {/* //header */}
//       <div className="post-header">
//         <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
//         <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
//       </div>
//       {/* image preview */}
//       <div className="main-div">
//         <img
//           id="output"
//           src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(event) => {
//             loadfile(event);
//             setImage(event.target.files[0])
//           }}
//         />
//       </div>
//       {/* details */}
//       <div className="details">
//         <div className="card-header">
//           <div className="card-pic">
//             <img
//               src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
//               alt=""
//             />
//           </div>
//           <h5>Ramesh</h5>
//         </div>
//         <textarea value={body} onChange={(e) => {
//           setBody(e.target.value)
//         }} type="text" placeholder="Write a caption...."></textarea>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    // Saving post to MongoDB after image upload completes (using URL)
    if (url) {
      setLoading(true); // Start loading when URL is set
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false); // Stop loading
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/"); // Redirect to homepage after post
          }
        })
        .catch((err) => {
          setLoading(false); // Stop loading
          console.log(err);
          notifyA("Error posting the content.");
        });
    }
  }, [url]);

  // Function to upload image to Cloudinary
  const postDetails = () => {
    if (!body || !image) {
      notifyA("Body and Image are required to create a post.");
      return;
    }

    setLoading(true); // Start loading before image upload
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
        setUrl(data.url); // Set image URL after successful upload
      })
      .catch((err) => {
        setLoading(false); // Stop loading in case of error
        console.log(err);
        notifyA("Error uploading the image.");
      });
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* Header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={postDetails}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Posting..." : "Share"}
        </button>
      </div>

      {/* Image Preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          alt="Preview"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>

      {/* Post details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="Profile"
            />
          </div>
          <h5>Ramesh</h5>
        </div>

        {/* Post Caption */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a caption...."
        ></textarea>
      </div>
    </div>
  );
}
