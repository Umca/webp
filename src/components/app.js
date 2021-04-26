import { checkWebP, webpMiddleware } from '../utils';
export class Application extends PIXI.Application {
  constructor(config) {
    super(config);
    document.body.appendChild(this.view);
  }
  async load(resources) {
    const isWebpSupported = await checkWebP('lossy', (feature, res) =>
      console.log(`Webp can be used: ${res}`)
    );
    const middleware = webpMiddleware(isWebpSupported);
    return new Promise((resolve, reject) => {
      this.loader.onComplete.add((e) => {
        resolve(e);
      });
      this.loader.pre(middleware);
      this.loader.add(resources);
      this.loader.load();
    });
  }

  launch() {
    this.addSprite('kitten1');
  }
  addSprite(texture) {
    let sprite = new PIXI.Sprite(PIXI.utils.TextureCache[texture]);
    sprite.scale.set(0.5);
    this.stage.addChild(sprite);
  }
}
