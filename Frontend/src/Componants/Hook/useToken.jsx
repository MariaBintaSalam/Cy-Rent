import { useEffect } from "react";
import { useState } from "react";

export default function useToken(value) {
  const [token, setToken] = useState("");
  
  useEffect(()=>{
    const currentUser = {
      uid: value?.user?.uid,
      email: value?.user?.email,
  };
  if(value?.user?.email){
    fetch(`https://swiftshop-server.vercel.app/user/${value?.user?.email}`,{
        method: "PUT",
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
    })
    .then((res) => res.json())
    .then((data) => {
      const accessToken = data.token;
      localStorage.setItem("accessToken",accessToken);
      setToken(accessToken);
      });

  }}, [value]);
  return [token];
}