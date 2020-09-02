require('geckodriver');

import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';

import BaseService from './BaseService';

import ModelIndexPageGoogle from '../models/IndexPageGoogle';

class IndexPageGoogleService extends BaseService {
  constructor() {
    super();

    this.screen = {
      width: 640,
      height: 480,
    };
  }
  async getURLPageGoogle(domains) {
    try {
      let caps = Capabilities.firefox();
      caps.set('silent', true);

      let driver = await new Builder()
        .forBrowser('firefox')
        .withCapabilities(caps)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(this.screen))
        .build();

      for (var i in domains) {
        const domain = domains[i];

        if (domain.domain === null) continue;

        const urlRequest = `https://${domain.domain}`;

        await driver.get('http://www.google.com.br');
        await driver.findElement(By.name('q')).sendKeys(urlRequest, Key.RETURN);

        let elementoQuantidadeAnuncios = await driver.wait(until.elementLocated(By.css('body.vasq #result-stats')), 200000);

        var qtdAnuncios = await elementoQuantidadeAnuncios.getAttribute('textContent');

        const result = qtdAnuncios.split('Aproximadamente ');

        const response = result[1].split(' resultados');

        await ModelIndexPageGoogle.create({ domain: urlRequest, response: response[0] });
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new IndexPageGoogleService();
