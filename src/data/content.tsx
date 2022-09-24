import { Link } from '@nextui-org/react';

export const content = {
  sidebarMain: [
    'The internet has come to define the 21st century. Exploding from web1 & 2, we have moved beyond minor nodes of culture and into a vast beyond, a cybernetic Styx impassable without Charon. Big Tech has turned to Big Data as a means of curation, collecting and analysing a user’s preferences from hundreds of  thousands of data points to provide video and song recommendations that will yield maximum user retention, and ad revenue. A person’s taste is mapped as an nDim surface in a feature space parameterised by n metrics collected, derived and inferred when the user interacts, or doesn’t, with the served content, as well as the pattern of their retention history.',
    'As weight decay occurs across streaming platform’s algorithms, we find our cost surface slowly stabilises. Data suggested to users normalises to local maxima and minima across the surface, entrapping them in novel anonymous micro-genres, accelerated by a positive feedback loop whereby each suggestion’s recommendation prior is increased as its CTR, user interaction and retention increases also. Manual digital curation through forums and communities such as RYM, /mu/ and PMC formed proto-algorithmic taste clusters, only to be subsumed by digitally accelerated, platform centric, and community decentralised micro-genres such as Youtube Recommended Core and Spotify Muzak. Everything we listen to is tailored for us, and for everyone else.',
    'This tool utilises Spotify’s public API as an exercise of non-curation. Ten, truerandom tracks are retrieved from their database and assembled into a playlist unique for you, and completely uninfluenced by you.  You can listen to a preview of each track by clicking their cover.',
  ],
  sidebarFooter: (
    <>
      This website was inspired in part by{' '}
      <Link color="warning" href="https://petittube.com/">
        Petite Tube
      </Link>
    </>
  ),
  errorMsg:
    "The information you are trying to access is too powerful for Spotify's Service. Refresh the playlist",
};
