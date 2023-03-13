// Context<API>
// context(warehouse)
// Provider(delivery)
// consumer/(useContext(you))

import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

// https://www.omdbapi.com/  ===>  for API
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
// const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=titanic`;

// create context
const AppContext = createContext();

// we need to create a provider
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("titanic");

  const getMoviesApi = async (url) => {
    // data nhi mila to loading krte rahega
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      // console me print krega sab
      // console.log("data from context =>", data);
      // console.log("data type of context =>", typeof data);

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", msg: "" });
      } else {
        setIsError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log("my error==", error);
    }
  };

  // Debouncing concept used here
  useEffect(() => {
    var timerOut = setTimeout(() => {
      getMoviesApi(`${API_URL}&s=${query}`);
    }, 400);

    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    // <AppContext.Provider value="Ali">
    <AppContext.Provider value={{ movie, isLoading, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

// create global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
