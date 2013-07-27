/* nect.js */
function nect(){
    var innerHTMLElements;
    var valueElements;
}

/* Init */
nect.init = function(){
    nect.innerHTMLElements = new Array();
    nect.valueElements = new Array();

    var input = document.getElementsByTagName("input");
    var div = document.getElementsByTagName("div");
    var select = document.getElementsByTagName("select");

    for(var i = 0; i < input.length; i++){
        nect.valueElements.push(input[i].id);
    }
    for(var i = 0; i < div.length; i++){
        nect.innerHTMLElements.push(div[i].id);
    }
    for(var i = 0; i < select.length; i++){
        nect.valueElements.push(select[i].name);
    }
}

/* Create json */
nect.to = function(url){
    var jsonStr = "{";

    for(var i = 0; i<nect.valueElements.length;i++){
        var key = nect.valueElements[i];
        var val = document.getElementById(key).value;
        jsonStr += '"'+val+'":"'+val+'",';
    }
    for(var i = 0; i< nect.innerHTMLElements;i++){
        var key = nect.valueElements[i];
        var val = document.getElementById(key).innerHTML;
        jsonStr += '"'+val+'":"'+val+'",';
    }
    
    jsonStr = jsonStr.slice(0,-1);
    jsonStr += "}";
    alert(jsonStr);
    var data = JSON.parse(jsonStr);

	//send json
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var READYSTATE_COMPLETED = 4;
        var HTTP_STATUS_OK = 200;

        if( this.readyState == READYSTATE_COMPLETED && 
            this.status == HTTP_STATUS_OK ){
                alert( this.responseText );
        }
    }
    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(EncodeHTMLForm(data));
}

window.onload = function(){
    nect.init();
}
