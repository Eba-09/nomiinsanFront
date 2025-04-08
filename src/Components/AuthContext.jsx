import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [sanchToken, setsanchToken] = useState(null);
  const [user, setUser] = useState(null);
  const [sanch, setSanch] = useState(null);
  const [error, setError] = useState(null);  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      // Токен байгаа тохиолдолд хэрэглэгчийн мэдээлэл авах
      fetch("https://library-kjji.onrender.com/api/lib/user/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch user info: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          setUser(data.user.id);
          setError(null); 
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setError("Failed to fetch user info");
          setUser(null);
        });
    } else {
      setUser(null);
      setError("No token found");
    }
  }, [token]);
  useEffect(() => {
    const storedToken = localStorage.getItem("sanchToken");
    setsanchToken(storedToken);
    if (storedToken) {
      // Токен байгаа тохиолдолд хэрэглэгчийн мэдээлэл авах
      fetch("https://library-kjji.onrender.com/api/lib/nomsanch/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch user info: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          setSanch(data.user.id);
          setError(null); 
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
          setError("Failed to fetch user info");
          setSanch(null);
        });
    } else {
      setSanch(null);
      setError("No token found");
    }
  }, [sanchToken]);
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  const sanchLogin = (newToken) => {
    localStorage.setItem("sanchToken", newToken);
    setsanchToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
  };
  const sanchlogout = () => {
    localStorage.removeItem("sanchToken");
    setsanchToken(null);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ token, sanchToken, user,sanch, login,sanchLogin, sanchlogout, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
