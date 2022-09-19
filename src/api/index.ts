import axios from "axios";
import { Song, Playlist } from "../type";

export class API{
    private readonly baseURL = process.env.NEXT_PUBLIC_API_URL;
    private readonly axios = axios.create({
        baseURL: this.baseURL
    });

    constructor(){}

    public async getRandomSong(): Promise<Song>{
        const res = await this.axios.get('/spotify/song');
        return res.data;
    }

    public async getRandomPlaylist(n?: number): Promise<Playlist>{
        const res = await this.axios.get(`/spotify/playlist${n !== undefined ? `?n=${n}` : `` }`);
        return res.data;
    }

    public async createPlaylist(title: string, description: string, imageUrl: string, trackIds: string[], token: string){
        const res = await this.axios.post(`/spotify/create-playlist`, {
            title,
            description,
            imageUrl,
            trackIds,
            token
        });
        return res.data;
    }
}