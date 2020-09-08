require('geckodriver');
//require('chromedriver');

import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
//import chrome from 'selenium-webdriver/chrome';
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
        const urlRequest = domains[i];

        await driver.get('http://www.google.com.br');
        await driver.findElement(By.name('q')).sendKeys(urlRequest, Key.RETURN);

        let elementQtd = await driver.wait(until.elementLocated(By.css('body.vasq #result-stats')), 80000);

        var qtd = await elementQtd.getAttribute('textContent');

        const result = qtd.split('Aproximadamente ');

        console.log(result);

        if (result === '' || result === undefined) continue;

        const response = result[1].split(' resultados');

        if (response === '' || response === undefined) continue;

        await ModelGoogleIndexPages.create({ uuid, url: urlRequest, quantity_pages: response[0] });
      }
      await driver.quit();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new JobInsertGoogleIndexPages();
