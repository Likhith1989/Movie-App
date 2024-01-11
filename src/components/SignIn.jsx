import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");

  async function handleCLick(e) {
    e.preventDefault();
    const user = JSON.stringify({ usern: username, passw: password });
    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });
      const data = await response.json();
      if (data.result === "NoUser") {
        alert("Username/Password Invalid");
      } else {
        navigate("/homepage");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div>
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
            <button onClick={handleCLick}>SignIn</button>
          </div>
          <div className="button-input-signup">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              signUp
            </button>
          </div>
        </center>
      </div>
    </>
  );
};

export default SignIn;
