import { useEffect, useCallback, useState } from "react";
import { Text, Col, Image } from "@nextui-org/react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from "react-redux";
import { selectIsPlayingUrl, setIsPlayingUrl } from "../../../slice/audio";


interface PlayableCoverProps{
    name: string,
    image: string,
    audioUrl: string,
    size?: number
}

const PlayableCover = ({name, image, audioUrl, size = 100}: PlayableCoverProps): JSX.Element => {
    const [isHover, setIsHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const isPlayingUrl = useSelector(selectIsPlayingUrl);
    const dispatch = useDispatch();

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    // Init audio player
    useEffect(() => { 
        if(audioUrl === null) return;
        
        setAudio(new Audio(audioUrl)) 
    }, []);

    // Pause song if another is playing
    useEffect(() => {
        if(audio === null) return;
        if(isPlayingUrl !== audioUrl){
            setIsPlaying(false);
            audio.pause();
            audio.currentTime = 0;
        };

    }, [audio, isPlayingUrl]);

    // Toggle playing
    const togglePlaying = useCallback(() => {
        if(audio === null) return;
        
        const toggle = !isPlaying;

        toggle ? audio.play() : audio.pause();

        setIsPlaying(toggle);
        dispatch(setIsPlayingUrl(audioUrl));
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