function detectIfRecaptchaIsNecessary() {
    if( Cookies.get('recaptchaChallenge') === undefined || Cookies.get('recaptchaAnswer') === undefined ) {
        console.log("recaptcha necessary")
        document.getElementById('main-content').innerHTML += '<button onclick="saveRecaptchaAndRegister()">Submit</button>'
    } else {
        console.log("no recaptcha necessary. registering")
        document.getElementById("recaptcha_widget_div").style = "display: none"
        register()
    }

}

function saveRecaptchaAndRegister() {
    Cookies.set('recaptchaChallenge', document.getElementById('recaptcha_challenge_field').value, {expires: 1800})
    Cookies.set('recaptchaAnswer', document.getElementById('recaptcha_response_field').value, {expires: 1800})
    register();
}

function register() {
    var classes = JSON.parse(Cookies.get('classes'));

    for( var i=0; i<classes.length; i++ ) {
        var brownie = ''
        var klass = classes[i];

        brownie += 'new_year_term='+getTerm()
        brownie += '&curr_id='+klass.courseId
        brownie += '&new_title_code='+klass.titleCode
        brownie += '&page_sequence='+'-241450180'
        brownie += '&curr_credit='+klass.credits
        brownie += '&section_type='+klass.sectionType
        brownie += '&section_num='+klass.sectionId
        brownie += '&captcha_challenge='+Cookies.get('recaptchaChallenge')
        brownie += '&captcha_value='+Cookies.get('recaptchaAnswer')

        document.getElementById('c').value = Cookies.get('c')
        document.getElementById('e').value = klass.e
        document.getElementById('brownie').value = brownie
        document.getElementById('registration-form').submit()
    }

    //expire all cookies except the recaptcha response
    Cookies.set('classes', 'this should expire', {expires: -1})
    Cookies.set('c', 'this should expire', {expires: -1})
    Cookies.set('e', 'this shoudl expire', {expires: -1})
    window.resizeTo(0, 0)
}

function getTerm() {
    return '20143'
}