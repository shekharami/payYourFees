import '@babel/polyfill';
import { updateNote } from '../../controllers/noteController';
import { update } from '../../models/noteModel';
import { postOrGet, deleteNote, updateNoteAxios, updateUser} from './postGetUpdateDelete';
import { signUp, login, logout  } from './loginSignup';


const submit = document.querySelector('.submit_text');
const form = document.querySelector('.form_note');
const form_before_login = document.querySelector('.form_note--before_login');
const form_get = document.querySelector('.form_get');
const get_notes = document.querySelector('.get_items');
const greeting = document.getElementById('greeting');
const contents = document.querySelector('.contents');
const created = document.querySelector('.created');
const signup_homepage = document.querySelector('.signup_btn_homepage');
const login_homepage = document.querySelector('.login_btn_homepage');
const logout_button = document.querySelector('.logout_button');
const create_button = document.querySelector('.create_button');
const profile = document.querySelector('.profile');

const note_before_login = document.querySelector('#unique')
let item_before_login;



if(form_before_login){
    form_before_login.addEventListener('submit', (e)=>{
        e.preventDefault()
        if(note_before_login.value){
            localStorage.setItem('item', note_before_login.value)
        } 
        alert('Please login to save a note.')
        location.assign('/login')
        
    })
}

if(profile){
    profile.addEventListener('click', () =>{
        location.assign('/my_profile')
    })
}

if(login_homepage){
    login_homepage.addEventListener('click', ()=>{
        location.assign('/login')
    })
}

if(signup_homepage){
    signup_homepage.addEventListener('click',()=>{
        location.assign('/signup')
    })
}

if(logout_button){
    logout_button.addEventListener('click', async ()=>{
        await logout()
        location.assign('/logout')
    })
}

if(create_button){
    create_button.addEventListener('click',()=>{
        location.assign('/')
    })
}

if(form){

    const note = document.querySelector('.todoitem');
    let item = localStorage.getItem('item');
    if(item){
        note.textContent = item
        localStorage.removeItem('item');
    }

    form.addEventListener('submit', async (e)=> {
        //e. stopImmediatePropagation(); 
        e.preventDefault();

        const name = note.name;
        const email = note.id;
        item = note.value;

        localStorage.removeItem('item')
        
        submit.value= "Saving";
        await postOrGet({name, email,item}, 'posting');
        location.reload();
        submit.value= "Submit";
        
    
    });
}

const signup_form = document.querySelector('.form_signup');

if(signup_form){
    signup_form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const name = document.getElementById('signup_name').value 
        const email = document.getElementById('signup_email').value 
        const password = document.getElementById('signup_password').value 
        const confirmPassword = document.getElementById('signup_confirmPassword').value 
    
        if(!name||!email||!password||!confirmPassword){
            
            alert('Please fill all the fields')
        }
        else if(password !== confirmPassword){
            alert('Passwords do not match')
            document.getElementById('signup_password').value = ''
            document.getElementById('signup_confirmPassword').value = ''
        }
        else{
            await signUp({ name, email, password, confirmPassword }) 
        }  
    });
}

const login_form = document.querySelector('.login_form');

if(login_form){
    login_form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login_email').value 
        const password = document.getElementById('login_password').value
    
        if(!email || !password){
            alert('please provide email and password')
            return
        }else{
            await login({ email, password })
        }
        
    })
}

const results = document.querySelector('.returned_results');
if(logout_button && results){

    let length = results.childElementCount;

    if(length>1){
        for(let i = 0; i< length-1 ; i++){

            document.getElementById(`delete_${i+1}`).addEventListener("click", function(){

                document.getElementById(`div_${i+1}`).style.display = 'none';

                deleteNote(document.getElementById(`div_${i+1}`).classList[1]);

                counter-=1;
                if(counter === 0){
                    greeting.innerHTML = create_notes ;
                }
            });

            document.getElementById(`update_${i+1}`).addEventListener("click", async function(){
                const item = document.getElementById(`textarea_${i+1}`).value;
                await updateNoteAxios({ id: document.getElementById(`div_${i+1}`).classList[1], item  })
                document.getElementById(`timestamp_${i+1}`).textContent = `SAVED AT:[${new Date(Date.now() - 1000).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}]:👉`;
                
            });
        }
    }
}

const profile_update = document.querySelector('.profile_update')
if(profile_update){
    profile_update.addEventListener('click', async () => {
        //alert('clicked me')
        let name = document.querySelector('.profile_name').value
        let email = document.querySelector('.profile_email').value
        let id = document.querySelector('.table').id

        if(!name || !email){
            alert('Please fill both the fields!')
        }

        const res = await updateUser({ id, name, email })

        name = res.name
        email = res.email

    })
}

document.querySelector('.fa-github').addEventListener('click',()=>{
    window.open("https://github.com/shekharami/notes")
})

document.querySelector('.fa-linkedin').addEventListener('click',()=>{
    window.open("https://www.linkedin.com/in/amit-shekhar-a25523187")
})



