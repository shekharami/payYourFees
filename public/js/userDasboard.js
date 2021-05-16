
const addStudentImg = document.getElementById('addStudent-img');
if(addStudentImg){
    addStudentImg.addEventListener('click', ()=>{
        window.open(
            '/add-student',
            '_blank' 
          );
    })
}

window.onload = () => {
    let o_str, o, div;
    for(let i = 0 ; i< 5; i++){
        o_str = localStorage.getItem(`${i}`);
        if(o_str){
            o = JSON.parse(o_str);
            div = document.getElementsByClassName('students-card')[i];
            div.id = o.id;
            div.children[1].innerText = o.name;
            div.children[2].innerText = o.class;
            div.children[3].innerText = `Registration : ${o.regNo}`;
            div.children[4].innerText = `Roll No. : ${o.roll}`;
            div.children[5].innerText = `Fees Paid Upto : ${o.feesPaidUpto}`
            div.style.display = 'inline-block';
        }

        localStorage.removeItem(`${i}`);
    }
}