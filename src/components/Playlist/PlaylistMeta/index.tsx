import {
  Text,
  Loading,
  Grid,
  Image,
  Row,
  Container,
  Button,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "@api";
import { useIsTablet } from "@hooks/useMediaQuery";
import { setIsPlayingUrl } from "@redux/slice/audio";
import {
  getRandomPlaylist,
  getRandomPlaylistMeta,
  selectIsPlaylistErrored,
  selectIsPlaylistLoading,
  selectIsPlaylistMetaLoading,
  selectPlaylist,
} from "@redux/slice/playlist";
import { AppDispatch } from "@redux/store";
import { PlaylistMeta } from "@type";
import { getAuthPopup } from "@utils";
import { ImageSkeleton } from "./stylist";
import { useEffect } from "react";

interface PlaylistMetaProps {
  meta: PlaylistMeta;
}

const PlaylistMeta = ({ meta }: PlaylistMetaProps) => {
  const isPlaylistLoading = useSelector(selectIsPlaylistLoading);
  const isPlaylistErrored = useSelector(selectIsPlaylistErrored);
  const isPlaylistMetaLoading = useSelector(selectIsPlaylistMetaLoading);

  const dispatch = useDispatch<AppDispatch>();
  const playlist = useSelector(selectPlaylist);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevMeta, setPrevMeta] = useState(meta);
  const isTablet = useIsTablet();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if(meta.name !== '' && meta.description !== '' && meta.image !== ''){
      setPrevMeta(meta);
    }else{
      setPrevMeta
    }
  }, [meta]);

  const refreshPlaylist = useCallback(() => {
    setIsImageLoaded(false);
    dispatch(getRandomPlaylist());
    dispatch(getRandomPlaylistMeta());
    dispatch(setIsPlayingUrl(""));
  }, [dispatch]);

  const createPlaylist = useCallback(async () => {
    const popup = getAuthPopup(
      `${process.env.NEXT_PUBLIC_API_URL}/spotify/auth`
    );

    const popupWindow = popup.open();
    try {
      if (popupWindow === null) return false;
      setIsSubmitting(true);
      const api = new API();
      const { name, description, image} = prevMeta;

      const rawToken = await popup.handleMessageCallback(popupWindow);
      const trackIds = playlist.map((song) => `spotify:track:${song.id}`);
      await api.createPlaylist(
        name,
        description,
        image,
        trackIds,
        (rawToken as any).token
      );
      setIsSubmitting(false);
      return true;
    } catch {
      setIsSubmitting(false);
      return false;
    }
  }, [prevMeta, playlist]);

  return (
    <Grid.Container
      css={{ "@smMin": { marginTop: isTablet ? "25vh" : "15vh" }, "@mdMax": { padding: "0 var(--nextui-space-sm)"}, "@smMax": { justifyContent: "center", marginTop: "$20" }}}
    >
      <Grid md={4} css={{minWidth: 300, position: "relative"}}>
            <Image
            height={300}
            width={300}
            src={prevMeta.image}
            alt={`${prevMeta.name}-cover`}
            onLoad={() => setIsImageLoaded(true)} />
          
            {!isImageLoaded && <ImageSkeleton/> }
        
        
      </Grid>
      <Grid
        md={6}
        justify="center"
        alignItems="center"
        css={{ position: "relative", "@smMax": { marginTop: "$4", maxWidth: 350 }, "@smMin": { maxWidth: "calc(100% - 300px)"} }}
      >
        <Container css={{"@smMax": { padding: 0}}}>
          <Row css={{
              opacity: isPlaylistMetaLoading ? 0 : 1,
              "@smMax": {
                  margin: "$5 0",
                  justifyContent: "center"
              },
              "@mdMax": {
                  margin: "$5 0"
              }
          }}>
            <Text h3 size={32}>
              {prevMeta.name}
            </Text>
          </Row>
          <Row css={{
            opacity: isPlaylistMetaLoading ? 0 : 1,
          }}>
            <Text size={16}>{prevMeta.description}</Text>
          </Row>
          <Row
            css={{
              display: "flex",
              marginTop: "$12",
              "@smMax": {
                justifyContent: "center",
              },
              "@smMin": {
                position: "absolute",
                bottom: "0",
                left: "1.5rem",
              },
            }}
          >
            <Button
              onClick={() => refreshPlaylist()}
              disabled={(isPlaylistLoading && !isPlaylistErrored) || isSubmitting}
              auto
              bordered
              css={{ maxWidth: "25%", marginRight: "$4" }}
            >
              Refresh
            </Button>
            <Button
              onClick={() => createPlaylist()}
              disabled={isPlaylistLoading || isSubmitting}
              auto
              css={{
                "& > .nextui-button-text": {
                  color: "$secondary",
                },
              }}
            >
              {isSubmitting ? <Loading /> : "Save"}
            </Button>
          </Row>
        </Container>
      </Grid>
    </Grid.Container>
  );
};

export default PlaylistMeta;
