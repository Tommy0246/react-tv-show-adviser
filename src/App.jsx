import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";

export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationsList] = useState([]);

    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopular();
        if (populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    }

    async function fetchRecommendations(tvShowId) {
        const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
        if (recommendations.length > 0) {
            setRecommendationsList(recommendations.slice(0, 10));
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id);
        }
    }, [currentTVShow]);

    return (
        <div
            className={s.main_container}
            style={{
                background: currentTVShow
                    ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
                    : "black",
            }}
        >
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <div>
                            <Logo
                                image={logo}
                                title="Watowatch"
                                subtitle="Find a show you may like"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input type="text" style={{ width: "100%" }} />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommendations}>
                {recommendationList && recommendationList.length > 0 && (
                    <TVShowList
                        onClickItem={setCurrentTVShow}
                        tvShowList={recommendationList}
                    />
                )}
            </div>
        </div>
    );
}
