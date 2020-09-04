require('geckodriver');

import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';

import ModelGoogleIndexPages from '../app/models/GoogleIndexPages';

class JobInsertGoogleIndexPages
{
  constructor()
  {
    this.key = 'JobInsertGoogleIndexPages';
    this.options = {
      attemps: 2,
    };
  }

  async handle(values)
  {
    try {
      const { uuid, domains } = values.data;

      let caps = Capabilities.firefox();
      caps.set('silent', true);

      const screen = {
        width: 640,
        height: 480,
      };

      let driver = await new Builder()
        .forBrowser('firefox')
        .withCapabilities(caps)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();

      for (var i in domains) {
        const domain = domains[i];

        const urlRequest = `https://${domain}`;

        await driver.get('http://www.google.com.br');
        await driver.findElement(By.name('q')).sendKeys(urlRequest, Key.RETURN);

        let elementQtd = await driver.wait(until.elementLocated(By.css('body.vasq #result-stats')), 200000);

        var qtd = await elementQtd.getAttribute('textContent');

        const result = qtd.split('Aproximadamente ');

        const response = result[1].split(' resultados');

        await ModelGoogleIndexPages.create({ uuid, url: urlRequest, quantity_pages: response[0] });
      }

      return true;
    } catch (error) {
      console.log(error);
    } finally {
      await driver.quit();
    }
  }
}

export default new JobInsertGoogleIndexPages();
