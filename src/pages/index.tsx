import { useEffect } from 'react';
import Main from '@screens/main';
import { useDispatch } from 'react-redux';
import {
  getRandomPlaylist,
  getRandomPlaylistMeta,
} from '@redux/slice/playlist';
import { AppDispatch } from '@redux/store';
import Head from 'next/head';
import meta from '@data/meta.js';
import icons from '@data/icons.json';

const Home = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRandomPlaylist());
    dispatch(getRandomPlaylistMeta());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonicalUrl} />
        <meta name="author" content={meta.author} />
        <meta name="email" content={meta.email} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={icons.appleTouchIcon}
        />
        <link rel="icon" type="image/png" sizes="32x32" href={icons.md} />
        <link rel="icon" type="image/png" sizes="16x16" href={icons.sm} />
        <link rel="icon" type="image/png" sizes="192x192" href={icons.lg} />
        <link rel="icon" type="image/png" sizes="512x512" href={icons.xl} />
        <link rel="manifest" href={icons.manifest} />

        <meta property="og:locale" content={meta.ogLocale} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={meta.canonicalUrl} />
      </Head>
      <Main />
    </>
  );
};

export default Home;
