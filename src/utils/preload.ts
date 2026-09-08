// 预加载单张图片
export const preloadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
};

// 预加载多张图片
export const preloadImages = (sources: Array<string>) => {
    const promises = sources.map(src => preloadImage(src));
    return Promise.all(promises);
};