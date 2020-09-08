require('geckodriver');

import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';

import ModelLogErrors from '../app/models/LogErrors';
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
    const { uuid, domains } = values.data;

    let caps = Capabilities.firefox();
    caps.set('silent', true);

    const screen = {
      width: 640,
      height: 480,
    };

    try {

      const optionsDriver = new firefox.Options().setPreference('intl.accept_languages', 'pt,pt-BR').headless().windowSize(screen);

      let driver = await new Builder()
        .forBrowser('firefox')
        .withCapabilities(caps)
        .setFirefoxOptions(optionsDriver)
        .build();

      for (var i in domains) {
        const urlRequest = domains[i];

        await driver.get('http://www.google.com.br');
        await driver.findElement(By.name('q')).sendKeys(urlRequest, Key.RETURN);

        let elementQtd = await driver.wait(until.elementLocated(By.css('body.vasq #result-stats')), 80000);

        var qtd = await elementQtd.getAttribute('textContent');

        const pages = qtd.split(' ');

        const quantity_pages = pages[1] !== '' && pages[1] !== undefined ? pages[1] : '0';

        await ModelGoogleIndexPages.create({ uuid, url: urlRequest, quantity_pages });
      }
      await driver.quit();
      return true;
    } catch (error) {
      await ModelLogErrors.create({ uuid, params: values, error: error.stack });
      return false;
    }
  }
}

export default new JobInsertGoogleIndexPages();
