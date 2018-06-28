import R from 'ramda';
import {ChromeContext,LaunchConfig} from './context';

import puppeteer from 'puppeteer';
import {ElementHandle, JSHandle,Browser,Page,Response} from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';


export class ChromeUtil {

  constructor(){}

  async launch(ctx:ChromeContext,opts:LaunchConfig) : Promise<Browser>{
    let browser = await this.launchNewChrome(opts);
    ctx.addBrowser(browser);

    return browser;
  }

  async newPage(ctx:ChromeContext) : Promise<Page>{
    let page = await ctx.getCurrentBrowser().newPage();
    await ctx.updateCurrentPage();

    return page;
  }

  async close(ctx:ChromeContext, opts:any) :Promise<void>{
    let result = await this.run(ctx,'page.close',opts);
    await ctx.updateCurrentPage();
  }

//======  page

  $ = (ctx:ChromeContext, opts:any, selector:string) : Promise<ElementHandle> => this.run(ctx,'page.$',opts, selector);
  $$ = (ctx:ChromeContext, opts:any, selector:string) : Promise<ElementHandle[]> => this.run(ctx,'page.$$',opts,selector);
  $$eval = (ctx:ChromeContext, opts:any, selector:string, pageFn:any, ...args) : Promise<ElementHandle[]> => this.run(ctx,'page.$$eval',opts,selector,pageFn,...args)
  $eval = (ctx:ChromeContext, opts:any, selector:string, pageFn:any, ...args) : Promise<ElementHandle[]>  => this.run(ctx,'page.$eval',opts,selector,pageFn,...args)
  $x = (ctx:ChromeContext, opts:any, expression:string) : Promise<ElementHandle[]> => this.run(ctx,'page.$x',opts,expression);

  addScriptTag = (ctx:ChromeContext, opts:any) : Promise<ElementHandle> => this.run(ctx,'page.addScriptTag',opts)
  addStyleTag = (ctx:ChromeContext, opts:any) : Promise<ElementHandle> => this.run(ctx,'page.addStyleTag',opts)

  authenticate = (ctx:ChromeContext, opts:any, credential:Object) : Promise<void> => this.run(ctx,'page.authenticate',opts, credential)

  bringToFront = (ctx:ChromeContext, opts:any) : Promise<any> => this.run(ctx,'page.bringToFront',opts)

  browser = (ctx:ChromeContext, opts:any) : Promise<Browser> => this.run(ctx,'page.browser',opts);
  click = (ctx:ChromeContext, opts:any, selector:string) : Promise<void> => this.run(ctx,'page.click',opts, selector);
  content = (ctx:ChromeContext, opts:any) : Promise<string> => this.run(ctx,'page.content',opts)

  cookies = (ctx:ChromeContext, opts:any, ...urls:string[]) : Promise<Object[]> => this.run(ctx,'page.cookies',opts,...urls)
  deleteCookie = (ctx:ChromeContext, opts:any, ...cookies:Object[]) : Promise<any> => this.run(ctx,'page.deleteCookie',opts,...cookies);
  setCookie = (ctx:ChromeContext, opts:any, ...cookies:Object[]) : Promise<any> => this.run(ctx,'page.setCookie',opts,...cookies);

  emulate = (ctx:ChromeContext, opts:any, device:string) : Promise<void> => this.run(ctx,'page.emulate',opts, devices[device]);
  emulateMedia = (ctx:ChromeContext, opts:any, mediaType:string) : Promise<void> => this.run(ctx,'page.emulateMedia',opts, mediaType);
  
  evaluate = (ctx:ChromeContext, opts:any, str:string|Function,...args ) : Promise<any> => this.run(ctx,'page.evaluate',opts,str,args)
  evaluateHandle = (ctx:ChromeContext, opts:any, str:string|Function,...args ) : Promise<JSHandle> => this.run(ctx,'page.evaluateHandle',opts,str,args)
  evaluateOnNewDocument = (ctx:ChromeContext, opts:any, pageFn:string|Function,...args ) : Promise<void> => this.run(ctx,'page.evaluate',opts,pageFn,args)
  exposeFunction = (ctx:ChromeContext, opts:any, name:string, pageFn:Function ) : Promise<void> => this.run(ctx,'page.exposeFunction',opts,name, pageFn)

  focus = (ctx:ChromeContext, opts:any, selector:string ) : Promise<void> => this.run(ctx,'page.focus',opts,selector)

  goBack = (ctx:ChromeContext, opts:any ) : Promise<Response> => this.run(ctx,'page.goBack',opts)
  goForward = (ctx:ChromeContext, opts:any ) : Promise<Response> => this.run(ctx,'page.goForward',opts)
  goto = (ctx:ChromeContext, opts:any, url:string) : Promise<Response> => this.run(ctx,'page.goto',opts,url);  
  hover = (ctx:ChromeContext, opts:any, selector:string ) : Promise<void> => this.run(ctx,'page.hover',opts);
  isClosed = (ctx:ChromeContext, opts:any ) : Promise<boolean> => this.run(ctx,'page.isClosed',opts);
  pdf = (ctx:ChromeContext, opts:any ) : Promise<Buffer> => this.run(ctx,'page.pdf',opts);
  
  queryObject = (ctx:ChromeContext, opts:any, prototypeHandle:JSHandle ) : Promise<JSHandle> => this.run(ctx,'page.queryHandle',opts, prototypeHandle);
  reload = (ctx:ChromeContext, opts:any ) : Promise<Buffer> => this.run(ctx,'page.reload',opts);
  screenshot = (ctx:ChromeContext, opts:any ) : Promise<Buffer> => this.run(ctx,'page.screenshot',opts);

  select = (ctx:ChromeContext, opts:any, selector:string, ...values:string[] ) : Promise<string[]> => this.run(ctx,'page.select',opts,selector,...values);

  setBypassCSP = (ctx:ChromeContext, opts:any, enabled:boolean ) : Promise<void> => this.run(ctx,'page.setBypassCSP',opts,enabled);
  setCacheEnabled = (ctx:ChromeContext, opts:any, enabled:boolean ) : Promise<void> => this.run(ctx,'page.setCacheEnabled',opts,enabled);
  setContent = (ctx:ChromeContext, opts:any, html:string ) : Promise<void> => this.run(ctx,'page.setContent',opts,html);
  setDefaultNavigationTimeout = (ctx:ChromeContext, opts:any, timeout:number ) : Promise<void> => this.run(ctx,'page.setDefaultNavigationTimeout',opts,timeout);
  setExtraHTTPHeaders = (ctx:ChromeContext, opts:any, header:Object ) : Promise<void> => this.run(ctx,'page.setExtraHTTPHeaders',opts,header);
  setJavaScriptEnabled = (ctx:ChromeContext, opts:any, enabled:boolean ) : Promise<void> => this.run(ctx,'page.setExtraHTTPHeaders',opts,enabled);
  setOfflineMode = (ctx:ChromeContext, opts:any, enabled:boolean ) : Promise<void> => this.run(ctx,'page.setOfflineMode',opts,enabled);
  setRequestInterception = (ctx:ChromeContext, opts:any, value:boolean ) : Promise<void> => this.run(ctx,'page.setOfflineMode',opts,value);
  setUserAgent = (ctx:ChromeContext, opts:any, userAgent:string ) : Promise<void> => this.run(ctx,'page.setUserAgent',opts,userAgent);
  setViewport = (ctx:ChromeContext, opts:any, viewPort:Object ) : Promise<void> => this.run(ctx,'page.setUserAgent',opts,viewPort);

  tap = (ctx:ChromeContext, opts:any, selector:string ) : Promise<void> => this.run(ctx,'page.tap',opts, selector);

  title = (ctx:ChromeContext, opts:any) : Promise<string> => this.run(ctx,'page.tap',opts);
  type = (ctx:ChromeContext, opts:any, selector:string, text) : Promise<void> => this.run(ctx,'page.type',opts, selector,text);

  waitFor = (ctx:ChromeContext, opts:any,selectorOrFunctionOrTimeout:string|number|Function) : Promise<JSHandle> => this.run(ctx,'page.waitFor',opts, selectorOrFunctionOrTimeout);
  waitForFunction = (ctx:ChromeContext, opts:any, pageFn:Function|string) : Promise<JSHandle> => this.run(ctx,'page.waitForFunction',opts,pageFn);
  waitForNavigation = (ctx:ChromeContext, opts:any) : Promise<Response> => this.run(ctx,'page.waitForNavigation',opts);
  waitForSelector = (ctx:ChromeContext, opts:any, selector:string) : Promise<ElementHandle> => this.run(ctx,'page.waitForSelector',opts, selector);
  waitForXPath = (ctx:ChromeContext, opts:any, xpath:string) : Promise<ElementHandle> => this.run(ctx,'page.waitForXPath',opts);

  url = async (ctx:ChromeContext, opts:any) : Promise<string> => (await ctx.getCurrentPage()).url();
  viewport = async (ctx:ChromeContext, opts:any) : Promise<Object> => (await ctx.getCurrentPage()).viewport();
  metrics = async (ctx:ChromeContext, opts:any) : Promise<Object> => this.run(ctx,'page.metrics',opts);

  //======  mouse
  mouseClick = (ctx:ChromeContext, opts:any, x:number,y:number) : Promise<void> => this.run(ctx,'mouse.click',opts, x, y);
  mouseMove = (ctx:ChromeContext, opts:any, x:number,y:number) : Promise<void> => this.run(ctx,'mouse.move',opts, x, y);
  mouseDown = (ctx:ChromeContext, opts:any) : Promise<void> => this.run(ctx,'mouse.down',opts);

  //======  keyword
  keyboardDown = (ctx:ChromeContext, opts:any,key:string) : Promise<void> => this.run(ctx,'keyboard.down',opts,key);
  keyboardPress = (ctx:ChromeContext, opts:any,key:string) : Promise<void> => this.run(ctx,'keyboard.down',opts,key);
  keyboardSendChar = (ctx:ChromeContext, opts:any, char:string) : Promise<void> => this.run(ctx,'keyboard.sendCharacter',opts,char);
  keyboardType = (ctx:ChromeContext, opts:any,text:string) : Promise<void> => this.run(ctx,'keyboard.type',opts,text);
  keyboardUp = (ctx:ChromeContext, opts:any,key:string) : Promise<void> => this.run(ctx,'keyboard.up',opts,key);

  //====== touchscreen
  touchscreenTap = (ctx:ChromeContext, opts:any,x:number,y:number) : Promise<void> => this.run(ctx,'touchscreen.tap',opts,x,y);

  //======  coverage
  startCSSCoverage = (ctx:ChromeContext, opts:any) : Promise<void> => this.run(ctx,'coverage.startCSSCoverage',opts);
  stopCSSCoverage = (ctx:ChromeContext, opts:any) : Promise<Object[]> => this.run(ctx,'coverage.stopCSSCoverage',opts);
  startJSCoverage = (ctx:ChromeContext, opts:any) : Promise<void> => this.run(ctx,'coverage.startJSCoverage',opts);
  stopJSCoverage = (ctx:ChromeContext, opts:any) : Promise<Object[]> => this.run(ctx,'coverage.stopJSCoverage',opts);

  //======  tracing
  tracingStart = (ctx:ChromeContext, opts:any) : Promise<void> => this.run(ctx,'tracing.start',opts);
  tracingStop = (ctx:ChromeContext, opts:any) : Promise<Buffer> => this.run(ctx,'tracing.stop',opts);

  // =================================

  //command: example
  // page.click , {button:'left', delay:1000}, '#select'
  async run(ctx:ChromeContext, command:string, opts:any, ...args:any[]) : Promise<any>{

    let clazz = command.split('.')[0];
    let action = command.split('.')[1];
    let params = [].concat(args, opts);

    let result = null;
    let entity = null;
    
    if(clazz === 'page') entity = await ctx.getCurrentPage();
    else if(clazz === 'browser') entity = ctx.getCurrentBrowser();
    else if(clazz === 'coverage') entity = (await ctx.getCurrentPage()).coverage;
    else if(clazz === 'keyboard') entity = (await ctx.getCurrentPage()).keyboard;
    else if(clazz === 'mouse') entity = (await ctx.getCurrentPage()).mouse;
    else if(clazz === 'touchscreen') entity = (await ctx.getCurrentPage()).touchscreen;
    else if(clazz === 'tracing') entity = (await ctx.getCurrentPage()).tracing;
    

    result = await entity[action].apply(entity, params);

    return result;
  }

  private async launchNewChrome(config:LaunchConfig): Promise<puppeteer.Browser> {
    console.log('before merge')
    let conf = R.merge(ChromeContext.DEFAULT_LAUNCH_CONFIG,config);console.log(conf);
    return await puppeteer.launch(conf);
  }

}
