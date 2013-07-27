/* nect.js */
function nect(){
    var innerHTMLElements;
    var valueElements;
    var selectElements;
}

/* Init */
nect.init = function(){
    nect.innerHTMLElements = new Array();
    nect.valueElements = new Array();
    nect.selectElements = new Array();

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
        nect.selectElements.push(select[i].name);
    }
}

/* Create json */
nect.to = function(url){
    var jsonStr = "{";

    for(var i = 0; i<nect.valueElements.length;i++){
        var key = nect.valueElements[i];
        var val = document.getElementById(key).value;
        jsonStr += '"'+key+'":"'+val+'",';
    }
    for(var i = 0; i<nect.selectElements.length;i++){
        var key = nect.selectElements[i];
        var val = document.getElementsByName(key)[0].selectedIndex;
        jsonStr += '"'+key+'":"'+val+'",';
    }
    for(var i = 0; i<nect.innerHTMLElements.length;i++){
        var key = nect.innerHTMLElements[i];
        var val = document.getElementById(key).firstChild.nodeValue;
        alert(val);
        jsonStr += '"'+key+'":"'+val+'",';
    }

    jsonStr = jsonStr.slice(0,-1);
    jsonStr += "}";

	//send json
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var READYSTATE_COMPLETED = 4;
        var HTTP_STATUS_OK = 200;

        if( this.readyState == READYSTATE_COMPLETED && 
            this.status == HTTP_STATUS_OK ){
                alert(xhr.responseText);
        }
    }
    xhr.open('POST',url);
    xhr.setRequestHeader('Content-Type','text/plain');
    xhr.send(jsonStr);
}

window.onload = function(){
    nect.init();
}
