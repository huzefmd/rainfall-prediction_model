// // App.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [formData, setFormData] = useState({
//     temperature: '',
//     humidity: '',
//     windSpeed: '',
//     pressure: '',
//     sunshine: '',
//     wind_direction: '',
//     wind_speed: ''
//   });

//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/predict', formData);
//       setResult(response.data.prediction);
//     } catch (error) {
//       console.error('API Error:', error.response?.data || error.message);
//       setResult("Error occurred");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         // backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
//         // backgroundImage: "url('https://images.unsplash.com/photo-1741866987680-5e3d7f052b87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//         backgroundImage: "url('https://images.unsplash.com/photo-1741851374674-e4b7e573a9e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px"
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255, 255, 255,-3 )",
//           // color:'black',
//           padding: "30px",
//           borderRadius: "15px",
//           boxShadow: "0 0 15px rgba(0,0,0,0.3)",
//           backdropFilter: "blur(10px)",
//           width: "100%",
//           maxWidth: "500px"
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fffff" }}>Rainfall Prediction</h2>
//         <form onSubmit={handleSubmit}>
//           {Object.keys(formData).map((key) => (
//             <div key={key} style={{ marginBottom: "15px" }}>
//               <label style={{ textTransform: "capitalize", fontWeight: "bold", color: "#111" }}>
//                 {key}:
//               </label>
//               <input
//                 type="number"
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required
//                 step="any"
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   marginTop: "5px"
//                 }}
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "12px",
//               backgroundColor: "#1e90ff",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               cursor: "pointer"
//             }}
//           >
//             Predict
//           </button>
//         </form>
//         {result !== null && (
//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             <h3>Prediction: {result}</h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [loginForm, setLoginForm] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [predictionData, setPredictionData] = useState({
    temperature: "",
    humidity: "",
    windSpeed: "",
    pressure: "",
    feature5: "",
    feature6: "",
    feature7: ""
  });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAuthenticated) {
      setPredictionData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Login/Signup Submission
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const url = loginForm ? "/login" : "/signup";
      const response = await axios.post(`http://localhost:5000${url}`, formData);
      setMessage(response.data.message);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  // Prediction Submission
  const handlePrediction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", predictionData);
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
      setResult("Error occurred");
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1741851374674-e4b7e573a9e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!isAuthenticated ? (
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            {loginForm ? "Login" : "Signup"}
          </h2>
          <form onSubmit={handleAuth}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1e90ff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loginForm ? "Login" : "Signup"}
            </button>
          </form>
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            {loginForm ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setLoginForm(!loginForm)}
              style={{
                background: "none",
                color: "#00f",
                border: "none",
                cursor: "pointer",
                marginLeft: "5px",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {loginForm ? "Signup" : "Login"}
            </button>
          </p>
          {message && (
            <p style={{ color: "#ff4d4d", textAlign: "center" }}>{message}</p>
          )}
        </div>
      ) : (
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            padding: "30px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Rainfall Prediction
          </h2>
          <form onSubmit={handlePrediction}>
            {Object.keys(predictionData).map((key) => (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  {key}:
                </label>
                <input
                  type="number"
                  name={key}
                  value={predictionData[key]}
                  onChange={handleChange}
                  step="any"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              style={{
                padding: "12px",
                width: "100%",
                backgroundColor: "#1e90ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Predict
            </button>
          </form>
          {result !== null && (
            <div style={{ marginTop: "25px", textAlign: "center" }}>
              <h3
                style={{
                  backgroundColor: "#e6f7ff",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "#007acc",
                }}
              >
                Prediction: {result}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
}

export default App;
