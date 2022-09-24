import { useEffect, useCallback, useState, useRef } from 'react';
import { Text, Col, Image } from '@nextui-org/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsPlayingUrl, setIsPlayingUrl } from '@redux/slice/audio';

interface PlayableCoverProps {
  name: string;
  image: string;
  audioUrl: string;
  size?: number;
  albumName?: string;
}

const PlayableCover = ({
  name,
  image,
  audioUrl,
  size = 100,
  albumName,
}: PlayableCoverProps): JSX.Element => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isPlayingUrl = useSelector(selectIsPlayingUrl);
  const dispatch = useDispatch();

  const audio = useRef<HTMLAudioElement | null>(null);

  // Init audio player
  useEffect(() => {
    if (audioUrl === null) return;

    audio.current = new Audio(audioUrl);

    return () => {
      if (audio.current === null) return;
      audio.current.pause();
      audio.current.currentTime = 0;
    };
  }, [audioUrl]);

  // Pause song if another is playing
  useEffect(() => {
    if (audio.current === null) return;
    if (isPlayingUrl !== audioUrl) {
      setIsPlaying(false);

      // no audio.stop() :(
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  }, [audio, audioUrl, isPlayingUrl]);

  // Toggle playing
  const togglePlaying = useCallback(() => {
    if (audio.current === null) return;

    const toggle = !isPlaying;

    toggle ? audio.current.play() : audio.current.pause();

    setIsPlaying(toggle);
    dispatch(setIsPlayingUrl(audioUrl));
  }, [isPlaying, audio]);

  return (
    <Col
      css={{
        width: size,
        position: 'relative',
        '&:hover': { cursor: 'pointer' },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        height={size}
        width={size}
        src={image}
        showSkeleton
        alt={`${name}-cover`}
        objectFit="cover"
        css={{
          zIndex: 0,
          filter: isPlaying || isHover ? 'brightness(50%)' : undefined,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          opacity: isPlaying || isHover ? 1 : 0,
        }}
        onClick={() => togglePlaying()}
      >
        {audio ? (
          !isPlaying ? (
            <PlayArrowIcon fontSize="large" />
          ) : (
            <PauseIcon fontSize="large" />
          )
        ) : (
          <Text size="$xs" css={{ color: 'white' }}>
            No Preview Found
          </Text>
        )}
      </div>
    </Col>
  );
};

export default PlayableCover;
