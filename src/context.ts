import puppeteer from "puppeteer";

export class ChromeContext {

  static DEFAULT_LAUNCH_CONFIG = {
    headless:false, 
    devtools:false,
    args:['--no-sandbox']
  };

  // config:LaunchConfig = {};
  browsers:puppeteer.Browser[];

  currentBrowserIndex:number;
  currentPageIndex:number;

  constructor(){
    this.browsers = [];
    this.currentBrowserIndex = -1;
    this.currentPageIndex = -1;
  }

  getCurrentBrowser():puppeteer.Browser{
    return this.browsers[ this.currentBrowserIndex ];
  }
  async getCurrentPage (): Promise<puppeteer.Page> {
    let pages = await this.getCurrentBrowser().pages();
    return pages[this.currentPageIndex];
  }

  async addBrowser(win:puppeteer.Browser){
    this.browsers.push(win);
    this.currentBrowserIndex = this.browsers.length - 1;

    let pages = await this.browsers[ this.currentBrowserIndex ].pages();
    this.currentPageIndex = pages.length - 1;
  }
  async updateCurrentPage(){
    let pages = await this.browsers[ this.currentBrowserIndex ].pages();
    this.currentPageIndex = pages.length - 1;
  }
}

export interface LaunchConfig {
    slowMo?:number;
    timeout?:number;
    headless?:boolean;
    ignoreHTTPSErrors?:boolean;
    executablePath?:string;
    ignoreDefaultArgs?:boolean;
    handleSIGINT?:boolean;
    handleSIGTERM?:boolean;
    handleSIGHUP?:boolean;
    userdataDir?:string;
    dumpio?:boolean;
    devtools?:boolean;
    pipe?:boolean;
    args?:string[];
    env?:Object;

    //launch arguments
    // webSecurity:string;
    // debuggingPort:string;
    // winSize:string;
}

// export class ChromeConfig {
//   //launch arguments
//   webSecurity:string="false";
//   debuggingPort:string="9222";
//   userdataDir:string=".chrome/rpscript_user_profile"
//   winSize:string="1366,768";

//   // slowMo:number;
//   timeout:number;
//   headless:boolean = true;
//   ignoreHTTPSErrors:boolean;
//   dumpio:boolean;
//   devtools:boolean;

//   constructor(){}
// }

// export class ChromeWindow {
//   description:string;
//   devtoolsFrontendUrl:string;
//   id:string;
//   title:string;
//   type:string;
//   url:string;
//   webSocketDebuggerUrl:string;
//
//   cdp:any;
//
//   constructor(obj:any, cdp:any){
//     this.description = obj['description'];
//     this.devtoolsFrontendUrl = obj['devtoolsFrontendUrl'];
//     this.id = obj['id'];
//     this.title = obj['title'];
//     this.type = obj['type'];
//     this.url = obj['url'];
//     this.webSocketDebuggerUrl = obj['webSocketDebuggerUrl'];
//
//     this.cdp = cdp;
//   }
// }
