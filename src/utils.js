// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, isSupported)' will be passed back the detection result (in an asynchronous way!)
export const checkWebP = async (feature, callback) => {
  return new Promise((resolve, reject) => {
    const kTestImages = {
      lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
      alpha:
        'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
      animation:
        'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    };
    const img = new Image();
    img.onload = function () {
      const result = img.width > 0 && img.height > 0;
      callback(feature, result);
      resolve(result);
    };
    img.onerror = function () {
      callback(feature, false);
      reject(false);
    };
    img.src = 'data:image/webp;base64,' + kTestImages[feature];
  });
};

export const webpMiddleware = (isWebpSupported) => (res, next) => {
  if (isWebpSupported) {
    const [path, extension] = res.url.split('.');
    res.url = `${path}.webp`;
  }
  next();
};
