export type Artist = {
    id: string,
    name: string,
    url: string
};

export type Album = {
    id: string,
    name: string,
    image: string,
    url: string,
}

export type Song = {
    id: string,
    url: string,
    name: string,
    duration: number,
    popularity: string,
    preview_url: string,
    artists: Artist[],
    album: Album
};

export type Playlist = Song[];

export type PlaylistMeta = {
    name: string,
    description: string,
    image: string
};