import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../CreateClient";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [subtitles, setSubtitles] = useState(false);

  const timeoutRef = useRef(null);

  function handleMouseEnter() {
    setIsHovered(true);
    clearTimeout(timeoutRef.current);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100); // Ajusta el tiempo de retraso en milisegundos
  }

  async function signOuthUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error closing session:", error);
    } else {
      console.log("Session closed successfully");
      setSession(null); // Clear session state
      navigate("/"); // Redirect after logging out
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(data.session);
      }
    };
    fetchSession();
  }, []);

  return (
    <nav className="w-full flex py-6 justify-between items-center fixed top-0 left-0 bg-gray-900 sm:bg-gradient-to-r sm:from-gray-800 sm:via-gray-900 z-50">
      
    </nav>
  );
};

export default Navbar;
