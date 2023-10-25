const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
                main : "#1b1b1b",
                dark : "#18181f",
                light : "#1f2326",
                contrastText : "#e9e9e9",
            },
            secondary : {
                dark : "#e60052",
                main : "#e60052",
                light : "#18181f",
                contrastText: "#2e2e39",
            },
            text :{
                primary : "#18181f",
                secondary : "#2e2e39",
                
            },
            background:{
                paper : "#f6f6fa",
                default :"#eaeaf2",
            },
          }
        : {
            primary: {
                main : "#000000",
                dark : "#000000",
                light : "#000000",
                contrastText : "#e9e9e9",
            },
            secondary : {
                dark : "#e60052",
                main : "#e60052",
                light : "#e60052",
                contrastText: "#2e2e39",
            },
            text :{
                primary : "#e9e9e9",
                secondary : "#e9e9e9",
                
            },
            background:{
                paper : "#111111",
                default :"#000000",
            },
            action:{
                
            },
          }),
    },
  });
  export default getDesignTokens ;