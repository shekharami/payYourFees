import '@babel/polyfill';

const open = document.getElementById('burger')
if(open){
    open.onclick = () => {
        document.getElementById("mySidepanel").style.width = "200px";
        }
}
const close = document.getElementById('close-btn')
if(close){
    close.href = 'javascript:void(0)'
    close.onclick = () => {
        document.getElementById("mySidepanel").style.width = "0";
        }
}

require('./redirectToMain');
require('./loginSignupRedirect');
require('./loginSignupHandler');
require('./userDasboard');
require('./payment');
require('./addStudent');
require('./searchStudent');
require('./addInstituteDetails');
require('./downloadDocument');
// keep this at the end
require('./errorHandler');