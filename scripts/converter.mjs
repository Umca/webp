import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
  await imagemin(['src/assets/*.{jpg,png,jpeg}'], {
    destination: 'src/assets/',
    plugins: [imageminWebp({ quality: 50 })],
  });

  console.log('Images optimized');
})();
