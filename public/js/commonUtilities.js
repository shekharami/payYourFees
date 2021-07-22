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

const togglePassword = document.getElementById('togglePassword');
if(togglePassword){
    togglePassword.addEventListener ('click', function(e){
        document.getElementsByName('password')[0]
        if(document.getElementsByName('password')[0].type === 'password'){
            document.getElementsByName('password')[0].type = 'text'
        }else{
            document.getElementsByName('password')[0].type = 'password'
        }
        this.classList.toggle('bi-eye');
    })
}
    