// -- check email --

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
    "check email valid information": function (client) {
        client
                .setValue('#email_0', 'google')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "without @")
                .clearValue('#email_0')

                .setValue('#email_0', 'google@')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "without hostname")
                .clearValue('#email_0')

                .setValue('#email_0', 'google@gmail')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "without country domain")
                .clearValue('#email_0')

                .setValue('#email_0', 'google@gmail..com')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "invalid symbols in hostname")
                .clearValue('#email_0')

                .setValue('#email_0', '.google@gmail.com')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "user name starts from .")
                .clearValue('#email_0')

                .setValue('#email_0', 'g..oogle@gmail.com')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "twice or more .. in user name")
                .clearValue('#email_0')

                .setValue('#email_0', 'aprel@optima.com.ua')
                .keys(client.Keys.TAB)
                .verify.cssProperty('#email_status_0', "display", "block", "existed email")
                .clearValue('#email_0')

                .setValue('#email_0', 'вася@вася.рф')
                .keys(client.Keys.TAB)
                .verify.value('#email_0', 'вася@вася.рф', "not changed after losing focus")
                .clearValue('#email_0')
        
                .setValue('#email_0', 'xn--@-7sbbfc2gd2ie.xn--p1ai')
                .keys(client.Keys.TAB)
                .verify.value('#email_0', 'вася@вася.рф', "convert punycode to kirilic symbols")
                .clearValue('#email_0')
                
                .end();
    }
}	