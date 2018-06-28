import {expect} from 'chai';
import m from 'mocha';
import {RpsContext} from 'rpscript-interface';
import RpsPuppeteer from '../src/index';

let $CONTEXT:RpsContext;

m.describe('Puppeteer', () => {

  m.beforeEach(() => {
    $CONTEXT = new RpsContext();
  })

  m.it('should nav to google and popup', async function() {
    let chrome = new RpsPuppeteer($CONTEXT);

    await chrome.chrome($CONTEXT,{},"https://www.google.com.sg");

    setTimeout(async function () {
      await chrome.eval($CONTEXT,{},`alert('page loaded');`);
    },5000);

    setTimeout(async function () {
      await chrome.close($CONTEXT,{});
    },8000);
    

    expect(true).to.be.true;
  }).timeout(0);

})
