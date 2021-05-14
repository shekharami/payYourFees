const loginRedirectBtn = document.getElementById('login-redirect-btn');
if(loginRedirectBtn){
    loginRedirectBtn.addEventListener('click', ()=>{
        let redirectlink
        document.getElementsByName('login-radio').forEach(e => {
            if(e.checked){
                redirectlink = e.value;
            }
        })
        if(!redirectlink){
            alert('Please select an option')
            return
        }
        redirectlink = '/' + redirectlink + '-login'
        document.getElementById('login-redirect-link').href = redirectlink
    })

}

const signupRedirectBtn = document.getElementById('signup-redirect-btn');
if(signupRedirectBtn){
    
    signupRedirectBtn.addEventListener('click', ()=>{
        let redirectlink
        document.getElementsByName('signup-radio').forEach(e => {
            if(e.checked){
                redirectlink = e.value;
            }
        })
        if(!redirectlink){
            alert('Please select an option')
            return
        }
        redirectlink = '/' + redirectlink + '-signup'
        document.getElementById('signup-redirect-link').href = redirectlink
    })

}

