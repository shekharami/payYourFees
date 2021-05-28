const queryString = document.location.href.split('?');
if(queryString.length > 1){
    const error = queryString[1].split('=')[1];
    switch(error) {
        case ('error-parsing-file') : {
            const errElem = document.getElementById('error');
            errElem.textContent = 'Error : File parse error, Please try uploading an excel file.'
            errElem.style.color = 'red';
            break;
        }
    }
}
