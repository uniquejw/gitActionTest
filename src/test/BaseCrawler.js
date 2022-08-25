import puppeteer from 'puppeteer';

export class BaseCrawler {
  #isInit = false;
  #browser = null;
  #page = null;

  constructor() {}

  async init() {
    if (this.#isInit) {
      return;
    }

    this.#browser = await puppeteer.launch();
    this.#page = await this.#browser.newPage();

    await this.#page.setRequestInterception(true);
    this.#page.on('request', request => {
      if (request.resourceType() === 'image') {
        request.abort();
      } else {
        request.continue();
      }
    });

    this.#isInit = true;
  }

  async run(url, evaluate) {
    await this.init();

    try {
      const response = await this.#page.goto(url);
      const isValidStatus = response && response.status() === 200;

      if (!isValidStatus) {
        throw Error('response invalid status');
      }

      return this.#page.evaluate(evaluate);
    } catch (error) {
      throw Error(error);
    }
  }

  async destroy() {
    await this.#page?.close();
    await this.#browser?.close();
    this.#isInit = false;
  }
}