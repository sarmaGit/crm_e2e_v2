// -- check legal address --

var user = require('../../credentials/userCredentials.js');
var site = require('../../credentials/projectConstants.js');
module.exports = {
    //'@disabled': true,
    tags: ['create company'],
    beforeEach: function (client) {
        client
                .url(site.url)
                .waitForElementVisible('body', 1000)
                .assert.visible('#auth-form')
                .setValue('input#login', user.login)
                .setValue('input#password', user.password)
                .click('input[type=submit]')
                .waitForElementVisible('#taskbar', 10000)
                .url(site.url + '/clients.php?tab=4#ui-tabs-4')
                .pause(5000)
                .click('#nodoubles_confirmation');
    },
    "check legal address if only text field filled and no select": function (client) {
        var randomValue = new Date().getTime();
        var phone = '79617' + Math.floor(100000 + Math.random() * 900000);
        client
                .setValue('#cname', randomValue)
                .click('#directionid')
                .keys(client.Keys.DOWN_ARROW) // hit arrow down
                .keys(client.keys.ENTER) // hit enter
                .click('#ownerid')
                .keys(client.Keys.DOWN_ARROW) // hit arrow down
                .keys(client.keys.ENTER)
                .click('div#ui-accordion-accordion-panel-1 select#address-level-1')
                .keys(client.Keys.DOWN_ARROW) // hit arrow down
                .keys(client.keys.ENTER)
                .setValue('#phone_0', phone)
                .pause(1000)

                .setValue('div#ui-accordion-accordion-panel-2 p.ci_addr input[type=text]', 'Elm Street, 13')
                .click('.clientsubmit')
                .pause(2000)
                .verify.cssProperty('#alert', "display", "block", "first level address not selected")
                .keys(client.keys.ENTER)
                .end();
    }
}