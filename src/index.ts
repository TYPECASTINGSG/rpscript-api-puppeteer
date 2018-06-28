/**
 * @module Puppeteer
 */
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';
import {ElementHandle, JSHandle,Browser,Page,Response} from 'puppeteer';
import {ChromeUtil} from './util';
import { ChromeContext } from './context';

@RpsModule("puppeteer")
export default class RpsPuppeteer {

  static util:ChromeUtil = new ChromeUtil;

  constructor(ctx?:RpsContext){
    if(ctx) ctx['puppeteer'] = new ChromeContext;
  }

  @rpsAction({defaultName:'chrome'})
  async chrome (ctx:RpsContext, opts:any, ...arg:string[]) : Promise<Response> {
    let response = undefined;
    let rpsPuppeteerContext = ctx['puppeteer'];

    if(!rpsPuppeteerContext.getCurrentBrowser()) {
      await RpsPuppeteer.util.launch(rpsPuppeteerContext,opts);
      response = await rpsPuppeteerContext.getCurrentPage();
    }
    else 
      response = await RpsPuppeteer.util.newPage(rpsPuppeteerContext);
  
    //async call
    if(arg[0]) RpsPuppeteer.util.goto(rpsPuppeteerContext, opts, arg[0]);
  
    return response;
  }

  @rpsAction({defaultName:'close'})
  close (ctx:RpsContext,opts:any) : Promise<void> {
    return RpsPuppeteer.util.close(ctx['puppeteer'],opts);
  }

  @rpsAction({defaultName:'goto'})
  goto (ctx:RpsContext,opts:any, url:string) : Promise<Response> {
    return RpsPuppeteer.util.goto(ctx['puppeteer'],opts,url);
  }

  @rpsAction({defaultName:'click'})
  click (ctx:RpsContext,opts:any, selector:string) : Promise<void> {
    return RpsPuppeteer.util.click(ctx['puppeteer'],opts,selector);
  }

  @rpsAction({defaultName:'type'})
  type (ctx:RpsContext,opts:any, selector:string, text:string) : Promise<void> {
    return RpsPuppeteer.util.type(ctx['puppeteer'],opts,selector,text);
  }

  @rpsAction({defaultName:'eval'})
  eval (ctx:RpsContext,opts:any, str:string) : Promise<any> {
    return RpsPuppeteer.util.evaluate(ctx['puppeteer'],opts,str);
  }

  @rpsAction({defaultName:'pdf'})
  pdf (ctx:RpsContext,opts:any) : Promise<Buffer> {
    return RpsPuppeteer.util.pdf(ctx['puppeteer'],opts);
  }

  @rpsAction({defaultName:'screenshot'})
  screenshot (ctx:RpsContext,opts:any) : Promise<Buffer> {
    return RpsPuppeteer.util.screenshot(ctx['puppeteer'],opts);
  }
  
  @rpsAction({defaultName:'$'})
  $(ctx:RpsContext, opts:any,selector:string) : Promise<ElementHandle> {
    return RpsPuppeteer.util.$(ctx['puppeteer'],opts,selector);
  }

  @rpsAction({defaultName:'$$'})
  $$(ctx:RpsContext, opts:any,selector:string) : Promise<ElementHandle[]> {
    return RpsPuppeteer.util.$$(ctx['puppeteer'],opts,selector);
  }
  
  @rpsAction({defaultName:'emulate'})
  emulate (ctx:RpsContext,opts:any,device:string) : Promise<void> {
    if(device ==='screen' || device === 'print')
      return RpsPuppeteer.util.emulateMedia(ctx['puppeteer'],opts,device);
    else
      return RpsPuppeteer.util.emulate(ctx['puppeteer'],opts,device);
  }

}


