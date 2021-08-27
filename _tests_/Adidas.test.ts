import { Builder, Capabilities, By, Key } from "selenium-webdriver"

const chromedriver = require("chromedriver")

const fs = require('fs')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

test("Can it search Adidas", async () => {
    // Navigating to Google and doing a search
    await driver.get('https://www.adidas.com/')
    driver.manage().window().maximize();
    let searchBar = await driver.findElement(By.css('input[name="q"]'))
    await searchBar.sendKeys(`mens shoes ${Key.ENTER}`)
    let result = await driver.findElement(By.xpath('//*[@id="app"]/div/div[1]/div/div/div/div[2]/div/div[1]/div/div/div[2]/div/div/h1/span')).getText();
    // expect(result).toEqual("MEN'S SHOES - MEMBERS GET 33% OFF WITH CODE*: ALLACCESS");
    expect(result).toContain("MEN'S SHOES");
    // Screenshot code is as follows
    fs.writeFile(
        // This will save the screenshot 2 folders up 
        // Feel free to change the file path here
        // `${__dirname}/../../googleScreenshot.png`,
        `${__dirname}/googleScreenshot.png`,
        await driver.takeScreenshot(),
        'base64',
        (e) => {
            if (e) {
                console.error(e)
            }
            else {
                console.log('You saved a screenshot!')
            }
        }
    )

    // A short pause to be sure the screenshot saved
    await driver.sleep(500)

    //Un-comment to close the browser window after the search
    await driver.quit()
})