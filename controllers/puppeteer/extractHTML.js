import puppeteer from "puppeteer";

export const extractHTML = async (req, res) => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("file:///C:/Users/ghous/Downloads/puppeteerTask1/puppeteerTask1/index.html", {
            waitUntil: "domcontentloaded",
        });
        await page.waitForSelector('#companyTable');

        // Extract table head data
        const tableHeadCells = await page.$$('#companyTable thead tr th');
        const tableHeadData = await Promise.all(tableHeadCells.map(async th => {
            const thData = await th.evaluate(th => th.textContent);
            return thData;
        }));
        
        // Extract row data 
        const tableRows = await page.$$('#companyTable tbody tr');
        const tableData = await Promise.all(tableRows.map(async row => {
            const rowData = await Promise.all(
            (await row.$$('td')).map(td => td.evaluate(td => td.textContent))
            );
            return rowData;
        }));



        // Close the browser
        await browser.close();

        res.status(200).json({ success: true, message: "Data extracted" ,data:{tableHead:tableHeadData,tableRows:tableData}})
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};