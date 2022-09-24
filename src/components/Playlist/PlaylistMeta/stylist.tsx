import { styled, keyframes } from "@nextui-org/react";

const pulseColor = keyframes({
    "0%": {
        backgroundColor: "$gray50"
    },
    "50%": {
        backgroundColor: "$gray100"
    },
    "100%": {
        backgroundColor: '$gray50'
    }
});

// Skeleton
export const ImageSkeleton = styled("div", {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "$gray50",
    animation: `${pulseColor} 4s infinite`,
    animationTimingFunction: 'ease-in-out'
});
