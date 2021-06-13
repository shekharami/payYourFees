import axios from 'axios';

const filterByClass = cls => {
    let tr = [...document.getElementsByTagName('tr')];
    tr = tr.splice(1,tr.length);
    let sect = [...document.getElementById('sectionFilter').options];
    sect = sect.splice(1,sect.length);
    if(cls === 'All'){
        tr.forEach(t => t.style.display = '')
        sect.forEach(o => o.style.display = '')
        return
    }else{
        const sections = []
        tr.forEach(t => { 
            if(!(t.children[2].innerText === cls)){ 
                t.style.display = 'none' ;
            } else {
                t.style.display = '';
                let sec = t.children[3].innerText;
                if(!sections.includes(sec)){
                    sections.push(sec)
                }
            }
        })

        sect.forEach(o => {
            if(!sections.includes(o.innerText)){
                o.style.display = 'none';
            }else{
                o.style.display = '';
            }
        })
    }
}

const filterBySection = sec => {
    const tr = [...document.getElementsByTagName('tr')].filter(t => t.style.display ='');
    
        tr.forEach(t => { 
            if(!t.children[2].innerText.includes(sec)){ 
                t.style.display = 'none' ;
            } else {
                t.style.display = '';
            }
        })
}

const searchStudent = document.getElementById('search-student');
if(searchStudent){
    searchStudent.addEventListener('click', async e =>{
        e.preventDefault();
        const regno = document.getElementById('regno').value;
        const name = document.getElementById('name').value.toLowerCase();
        const clas = document.getElementById('class').value;
        const section = document.getElementById('section').value;
        // Make network request
        if(!(regno || name || clas)) {
            alert('Please provide the details first.');
            return;
        }
        const res = await axios({
            method: 'GET',
            url : `/api/v1/student/search?${regno}&name=${name}&class=${clas}&section=${section}`,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        
        if(res.data.status === 'success'){

            document.getElementById('num-results').textContent = `${res.data.data.students.length} Results Found.`

            let html1 = '', html3 = '', html2 = '';

            const classes = [], section = [];
            
            res.data.data.students.forEach(o => {
                if(!classes.includes(o.class)){
                    classes.push(o.class)
                }
                if(!section.includes(o.section)){
                    section.push(o.section)
                }

                html3 += `<tr>
                <td>${o.rollNo}</td>
                <td>${o.name}</td>
                <td>${o.class}</td>
                <td>${o.section}</td>
                <td>${o.feesPaidTill}</td>
                <td><button name=${o.id}>View Details</button></td>
                </tr>
                <div id=${o.id} style='display:none;background-color:yellow;'>
                <p>Registration No. : ${o.registrationNo}</p>
                <p>Father's Name : ${o.father}</p>
                <p>Mother's Name : ${o.mother}</p>
                <p>Email : ${o.email}</p>
                <div>`;
            });

            section.sort()

            html3 += '</table>';

            html1 += `<table>
                            <tr>
                                <th>Roll No.</th>
                                <th>Name</th><th>Class : <select id='classFilter'>`;

            const wts_r = { 1:'I', 2:'II', 3:'III', 4:'IV', 5:'V', 6:'VI', 7:'VII',8:'VIII', 9:'IX', 10:'X', 11:'XI', 12:'XII' };
            const wts = { 'I':1, 'II':2, 'III':3, 'IV':4, 'V':5, 'VI':6, 'VII':7, 'VIII':8, 'IX': 9, 'X':10, 'XI':11, 'XII':12 };
            html1 += '<option>All</option>';
            classes.map(c => {
                return wts[c]
            })
            .sort((a,b) => a-b)
            .map(a => {
                return wts_r[a]
            })
            .forEach(c => {
                html1 += `<option>${c}</option>`;
            })
            html1 += ' </select></th>';

            html2 += `<th>Section : 
            <select id='sectionFilter'><option>All</option>`;
            section.forEach(s => {
                html2 += `<option>${s}</option>`
            });
            html2 += `</select>
            </th>
            <th>Fees paid upto</th>
            <th>Action</th>
            </tr>`;

            const html = html1 + html2 + html3;
            const a = document.getElementById('result-table');
            a.innerHTML = html;
            a.style.display = '';

            [...document.getElementsByTagName('button')].forEach(b => {
                b.onclick = () =>{
                    const [previousDispalyedDiv] = document.getElementsByClassName('on');
                    console.log(previousDispalyedDiv)
                    if(previousDispalyedDiv){
                        previousDispalyedDiv.style.display = 'none';
                        previousDispalyedDiv.classList.remove('on');

                    }
                    const showingDiv = document.getElementById(b.name);
                    showingDiv.classList.add('on');
                    showingDiv.style.display = '';
                    
                }
            });
            
            const [cls,sec] = document.getElementsByTagName('select');
            const classFilter = document.getElementById('classFilter');
            const sectionFilter = document.getElementById('sectionFilter');
            classFilter.onclick = () => {
                filterByClass(cls[cls.selectedIndex].innerText);
            }
            // sectionFilter.onchange = () => {
            //     filterBySection(sec[sec.selectedIndex].innerText);
            // }
        }
        
    })
}

// const resultTable = document.getElementById('result-table');
// if(resultTable){
    
// }
