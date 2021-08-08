const listAllInstitutes = document.getElementById('list-all-institutes');
if(listAllInstitutes){
    listAllInstitutes.onclick = ()=>{
        document.getElementById('spinner').style.display = '';
        setTimeout(()=>{
            document.getElementById('spinner').style.display = 'none';
            document.getElementById('list-all-insti').style.display = '';
        }, 3000)
    }
}

const actions = [...document.getElementsByClassName('dropdown')];
if(actions.length){

    actions.forEach(kebabMenu => {
        kebabMenu.onclick = function(){
            if(this.children[1].style.display === 'none'){
                this.children[1].style.display = 'block'
            }else{
                this.children[1].style.display = 'none'
            }
        }
    })


    window.onclick = function(e){
        if(e.target.parentNode.classList.contains('action-list-all-insti')){
        
        }else if(!e.target.parentNode.classList.contains('dropdown-content')){
            [...document.getElementsByClassName('dropdown-content')].forEach(d=>{
                d.style.display = 'none';
            })
        }
    }
    

}