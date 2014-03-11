var recaptchaChallenge;

function detectIfRecaptchaIsNecessary() {
    if( Cookies.get('recaptchaChallenge') === undefined || Cookies.get('recaptchaAnswer') === undefined ) {
        $.get('/public-api/recaptcha', function(data) {
            console.log("Data = "+data)
            var response = JSON.parse(data);
            console.log(response)
            $("#recaptcha").html(
                '<img src="data:image/jpeg;base64,'+response.image.replace('"', '&quot;')+'">' +
                '<a href="javascript:detectIfRecaptchaIsNecessary()">Refresh</a>' +
                '<br><input id="recaptchaAnswer" type="text">'
            );
            recaptchaChallenge = response.challenge
        });
    } else {
        register(false)
    }

}

function saveRecaptchaAndRegister() {
    Cookies.set('recaptchaChallenge', recaptchaChallenge)
    Cookies.set('recaptchaAnswer', document.getElementById('recaptchaAnswer').value, {expires: 1800})
    register(true);
}

function register(useRecaptcha) {
    var classes = JSON.parse(Cookies.get('classes'));

    for( var i=0; i<classes.length; i++ ) {
        var brownie = ''
        var klass = classes[i];

        brownie += 'new_year_term='+getTerm()
        brownie += '&curr_id='+klass.courseId
        brownie += '&new_title_code='+klass.titleCode
        brownie += '&page_sequence='+'1016452204'
        brownie += '&curr_credit='+klass.credits
        brownie += '&section_type='+klass.sectionType
        brownie += '&section_num='+klass.sectionId
        if( useRecaptcha ) {
            brownie += '&captcha_challenge='+Cookies.get('recaptchaChallenge')
            brownie += '&captcha_value='+Cookies.get('recaptchaAnswer')
        }

        document.getElementById('c').value = Cookies.get('c')
        document.getElementById('e').value = klass.e
        document.getElementById('brownie').value = brownie
        console.log("c = "+document.getElementById('c').value)
        console.log("e = "+document.getElementById('e').value)
        console.log("brownie = "+document.getElementById('brownie').value)

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