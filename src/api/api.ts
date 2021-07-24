import axios, { AxiosResponse } from "axios";
import { AnimeType, AnimeSearch } from "@/models/anime.interface";
const api = axios.create({
  baseURL: "https://api.jikan.moe/v3",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => api.get(url).then(responseBody),
  post: (url: string, body: Record<string, unknown>) =>
    api.get(url, body).then(responseBody),
};

export const Anime = {
  getAnimeItem: (id: number): Promise<AnimeType> =>
    requests.get(`/anime/${id}`),
  getSearchItem: (type: string, search: string): Promise<AnimeSearch> =>
    requests.get(`/search/${type}?q=${search}&limit=5`),
};
