import { createTheme } from "@mui/material/styles";

// import NinoMtavruli from "../fonts/bpg_nino_mtavruli_normal.ttf";

// const ninoMtavruli = {
//   fontFamily: "NinoMtavruli",
//   fontStyle: "semi-bold",
//   fontDisplay: "swap",
//   fontWeight: "600",
//   src: `url(${NinoMtavruli}) format('ttf')`,
// };

export const theme = createTheme({
  palette: {
    success: {
      main: "#9b1414",
    },
    primary: {
      main: "#9b1414",
    },
    secondary: {
      main: "rgba(174, 19, 42, 0.7)",
    },
  },
  components: {
    // Name of the component
    MuiContainer: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: "9% 0 2% 0",
        },
      },
    },
  },
});
