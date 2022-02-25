const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage(); 
    await page.goto("https://app-dev.condoworks.co");

    await page.type("#Email", "coop.test@condoworks.co");
    await page.type("#Password", "MyTesting711");

    await page.click('[id="btnSubmit"]');
    
    await page.waitForTimeout(1000);

    await page.goto("https://app-dev.condoworks.co/invoices/all");

    await page.waitForTimeout(1000);
   
    await page.type('[id="gs_invoices.InvoiceNumber"]', "123");

    await page.waitForTimeout(1000);

    await page.click('[href="https://app-dev.condoworks.co/invoiceadmin/edit/tscc000155/475?returnToList=%2Finvoices%2Fall"]');
    
    await page.waitForTimeout(500);
    
    await page.click('[href="/invoiceadmin/viewFile/tscc000155/475/InvoiceFile?returnToList=%2Finvoices%2Fall?key=InvoiceFile"]');
   
    console.log("Download path: C:\\Users\\YOUR_USERNAME\\Downloads");
}) ();

