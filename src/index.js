import { Application } from './components/app';
import { assets } from './assets/list';

const app = new Application({
  width: 1000,
  height: 750,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});
window.app = app;

app.load(assets).then((e) => {
  app.launch();
});
window.PIXI = PIXI;
