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
                main : "#b2b5be",
                dark : "#000000",
                light : "#000000",
                contrastText : "#b2b5be",
            },
            secondary : {
                dark : "#e60052",
                main : "#4CC9F0",
                light : "#dadada",
                contrastText: "#434651",
            },
            text :{
                primary : "#b2b5be",
                secondary : "#b2b5be",
                
            },
            background:{
                paper : "rgba(0,0,0,0)",
                default :"#000000",
            },
            typography: {
                fontFamily: 'Orbitron', // Set your desired font family
              },
          }),
    },
  });
  export default getDesignTokens ;