export const preloadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
};

export const preloadImages = (sources: Record<string, string>) => {
    return Promise.all(Object.values(sources).map(src => preloadImage(src)));
};

export const IMAGE_URLS = {
    house: new URL("../assets/background/house.jpg", import.meta.url).href,
    moon: new URL("../assets/background/moon.jpg", import.meta.url).href,
    theatre: new URL("../assets/background/theatre.jpg", import.meta.url).href,
    xiaoGaze: new URL("../assets/character/xiao-gaze.png", import.meta.url).href,
    xiaoGive: new URL("../assets/character/xiao-give.png", import.meta.url).href,
    xiaoLay: new URL("../assets/character/xiao-lay.png", import.meta.url).href,
    xiaoLean: new URL("../assets/character/xiao-lean.png", import.meta.url).href,
    xiaoSitting: new URL("../assets/character/xiao-sitting.png", import.meta.url).href,
    yunjin: new URL("../assets/character/yunjin.png", import.meta.url).href,
    lantern: new URL("../assets/item/lantern.png", import.meta.url).href,
    sweetDreamEaten: new URL("../assets/item/sweet-dream-eaten.png", import.meta.url).href,
    sweetDream: new URL("../assets/item/sweet-dream.png", import.meta.url).href,
};