// -- check url --

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
    "check url valid information": function (client) {
        client
                .setValue('#url_0', 'google.com')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://google.com', "check for added http://")
                .clearValue('#url_0')

                .setValue('#url_0', 'https://google.com')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://google.com', "check for changed https:// to http://")
                .clearValue('#url_0')

                .setValue('#url_0', 'www.google.com')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://google.com', "check for deleted www.")
                .clearValue('#url_0')

                .setValue('#url_0', 'www.google.com/index.php')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://google.com', "check for deleted /index.php")
                .clearValue('#url_0')

                .setValue('#url_0', 'www.google.com/index.html')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://google.com', "check for deleted /index.html")
                .clearValue('#url_0')

                .setValue('#url_0', 'site@site')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#url_status_0', "display", "block", "check for invalid url")
                .clearValue('#url_0')

                .setValue('#url_0', 'kosmos.ru')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#url_status_0', "display", "block", "check for added existed url")
                .clearValue('#url_0')
        
                .setValue('#url_0', 'вася.рф')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://вася.рф', "test kirilic symbols")
                .clearValue('#url_0')

                .setValue('#url_0', 'xn--80ad0c0c.xn--p1ai')
                .keys(client.Keys.TAB)
                .verify.value('#url_0', 'http://вася.рф', "punycode converts to kirilic")
                .clearValue('#url_0')
                .end();
    }
}	