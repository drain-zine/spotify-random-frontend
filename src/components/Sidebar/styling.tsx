import { styled } from "@nextui-org/react";

// IconButton component will be available as part of the core library soon
export const Divider = styled("div", {
    width: "100%",
    height: 2,
    background: "var(--nextui-colors-text)",
    marginLeft: "-3rem",
    "@smMax": {
        marginLeft: '-10rem',
        width: '120%'
    },
    "@xsMax": {
        width: "150%"
    }
});
