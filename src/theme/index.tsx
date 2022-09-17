import { ReactNode } from "react";
import { NextUIProvider, createTheme } from "@nextui-org/react";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      gradient: "linear-gradient(112deg, #9510f7, #9510f7)"
    }
  }
});

const NextUITheme = ({ children }: {children: ReactNode}) => {
  return <NextUIProvider theme={theme}>{children}</NextUIProvider>;
};

export default NextUITheme;