import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");

  async function handleCLick(e) {
    e.preventDefault();
    const user = JSON.stringify({ usern: username, passw: password });
    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });
      const data = await response.json();
      if (data.result === "TryAgain") {
        alert("Invalid details Try Again");
      } else if (data.result === "Success") {
        alert("Successfully Created...Please Log In!!");
      } else {
        alert("SOme Other Error");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="signup">
        <center>
          <h1>Welcome!</h1>
          <div className="username-input">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>
          <div className="pass-input">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              value={password}
            />
          </div>

          <div className="button-input">
            <button onClick={handleCLick}>signup</button>
          </div>
          <div className="button-input-signin">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              signin
            </button>
          </div>
        </center>
      </div>
    </>
  );
};

export default SignUp;
