import { useEffect, useCallback, useState } from "react";
import { Text, Col, Image } from "@nextui-org/react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


interface PlayableCoverProps{
    name: string,
    image: string,
    audioUrl: string,
    size?: number
}

const PlayableCover = ({name, image, audioUrl, size = 100}: PlayableCoverProps): JSX.Element => {
    const [isHover, setIsHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => { 
        if(audioUrl === null) return;
        
        setAudio(new Audio(audioUrl)) 
    }, [])

    const togglePlaying = useCallback(() => {
        if(audio === null) return;
        
        const toggle = !isPlaying;

        toggle ? audio.play() : audio.pause();

        setIsPlaying(toggle);
    }, [isPlaying, audio]);

    return(
        <Col css={{width: size, position: "relative", "&:hover": {cursor: "pointer"}}} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
            <Image 
                height={size}
                width={size}
                src={image}
                showSkeleton
                alt={`${name}-cover`}
                objectFit="cover"
                css={{
                    zIndex: 0,
                    filter: (isPlaying || isHover) ? "brightness(50%)" : undefined
                }}/>
            
            <div style={{
                 position: "absolute",
                 width: size,
                 height: size,
                 top: 0,
                 left: 0,
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center", 
                 color: "white",
                 opacity: (isPlaying || isHover) ? 1 : 0
            }} onClick={() => togglePlaying()}>
                {
                    audio ? 
                        !isPlaying ? 
                            <PlayArrowIcon fontSize="large"/> :
                            <PauseIcon fontSize="large" />
                        :
                        <Text size="$xs" css={{color: "white"}}>No Preview Found</Text>
                }
            </div>
            
        </Col>
    );
};

export default PlayableCover;