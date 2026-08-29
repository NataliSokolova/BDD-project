exports.config = {
  tests: './tests/*_test.js',
  
  
  output: './output',
  
  
  helpers: {
    
    Playwright: {
      url: 'https://www.saucedemo.com',
      
      
      show: true,  
      
      
      windowSize: '1200x800',
      
      
      browser: 'chromium',  
      
      
      waitForNavigation: 'networkidle0',
      
     
      waitForTimeout: 10000,
      
      
      launchOptions: {
        
        args: ['--start-maximized']  
      }
    }
  },
  
  
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    
   
    autoDelay: {
      enabled: true,
      delayBefore: 500
    },
    
    
    retryFailedStep: {
      enabled: true,
      retries: 2
    },
    
    
    stepByStepReport: {
      enabled: false,  
      screenshotsForAllure: true
    }
  },
  

  bootstrap: null,
  teardown: null,
  hooks: [],
  
  
  include: {
   
    loginPage: './pages/LoginPage.js',
    inventoryPage: './pages/InventoryPage.js',
    cartPage: './pages/CartPage.js',
    checkoutPage: './pages/CheckoutPage.js'
  },
  
  
  name: 'SauceDemo Tests'
}

