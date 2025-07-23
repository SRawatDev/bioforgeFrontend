import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Card from "./Card";
import "./LandingPage.css";
import Footer from "./Footer";
import Navbar from "../../navbar/Navbar";
import { callAPIWithoutAuth } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
import ErrorMessage from "../../../helpers/ErrorMessage";
import { ThemeShimmer } from "../../LinkShimmer";

export interface ThemeData {
    _id?: string;
    themeName: string;
    themeImg: string;
    themeDiscription: string;
}

const LandingPage = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [theme, setTheme] = useState<ThemeData[]>([]);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const getheme = async () => {
        setLoader(true);
        try {
            const response = await callAPIWithoutAuth(
                apiUrls.getAlltheme,
                {},
                "GET",
                {}
            );
                    setLoader(false);
            if (response?.data?.status) {
                setTheme(response.data.data || []);
            } else {
                ErrorMessage(response?.data?.message || "Failed to fetch users");
            }
        } catch (error) {
            setLoader(true);
        }
    };
    useEffect(() => {
        getheme();
    }, []);

    return (
        <>
  
            <Navbar />
            <div className="landing-page">
                <section className="gallery-section">
                    <div className="section-header">
                        <h2 className="section-title">Choose themes</h2>
                        <p className="section-subtitle">
                            Click preview to explore each landscape in detail
                        </p>
                    </div>

                    <div className="cards-grid">
                        {loader ? <ThemeShimmer /> :
                            theme.map((card, index) => (
                                <Card
                                    key={card._id}
                                    themeName={card.themeName}
                                    themeImg={card.themeImg}
                                    themeDiscription={card.themeDiscription}
                                />
                            ))}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
