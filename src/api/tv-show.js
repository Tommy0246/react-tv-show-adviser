import axios from "axios";
import { BASE_URL, API_KEY_PARM } from "../config";

export class TVShowAPI {
    static async fetchPopular() {
        const response = await axios.get(
            `${BASE_URL}tv/popular${API_KEY_PARM}`
        );
        console.log(response.data.results);
        return response.data.results;
    }

    static async fetchRecommendations(tvShowId) {
        const response = await axios.get(
            `${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARM}`
        );
        return response.data.results;
    }

    static async fetchByTitle(title) {
        const response = await axios.get(
            `${BASE_URL}search/tv${API_KEY_PARM}&query=${title}`
        );
        return response.data.results;
    }
}
