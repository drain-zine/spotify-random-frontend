import axios from "axios";

export class API{
    private readonly baseURL = process.env.API_URL;
    private readonly axios = axios.create({
        baseURL: this.baseURL
    });

    constructor(){}

    public async getRandomSong(){
        const res = await this.axios.get('/spotify/song');
        return res.data;
    }

    public async getRandomPlaylist(n?: number){
        const res = await this.axios.get(`/spotify/playlist${n !== undefined ? `?n=${n}` : `` }`);
        return res.data;
    }
}