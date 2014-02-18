
function addClass() {
    console.log("here")
    var request = new XMLHttpRequest();
    request.onload = function () {
        if( request.status != 200 )
            alert("status was "+request.status);
        document.getElementById("response-div").innerHTML = request.responseText;
        console.log("received")
    }
    var url = "https://gamma.byu.edu/ry/ae/prod/registration/cgi/regOfferings.cgi";
    var method = "POST";
    var brownieElements = ["new_year_term", "curr_id", "new_title_code", "page_sequence", "curr_credit", "section_type", "section_num"]
    var brownie = ""
    var prefix = ""
    for( var el in brownieElements ) {
        brownie += prefix + el.id + "=" + el.value
        prefix = "&"
    }
    var postData = "c=regOfferings&e="+encodeURIComponent("@AddClass")+"&brownie="+encodeURIComponent(brownie);
    console.log("sent")
}


