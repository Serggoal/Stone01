import React, { createContext, useState } from "react";

const Context = createContext();

function Provider(props) {
  const [theme, setTheme] = useState();  

  return <Context.Provider value={theme}>{props.children}</Context.Provider>;
}

export { Context, Provider };