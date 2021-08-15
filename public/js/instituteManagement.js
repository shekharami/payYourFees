import axios from 'axios';

const actionsDropdwonFunctionality = () => {
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
}

const searchInstibtn = document.getElementById('search-institutes');
if(searchInstibtn){
    searchInstibtn.onclick = () => {
        document.getElementById('list-all-insti').style.display = 'none';
        document.getElementById('search-insti').style.display = '';
    }
}

const listAllInstitutes = document.getElementById('list-all-institutes');
if(listAllInstitutes){
    listAllInstitutes.onclick = async ()=>{
        document.getElementById('search-insti').style.display = 'none';
        document.getElementById('spinner').style.display = '';
        const res = await axios({
            method: 'GET',
            url : '/api/v1/institute/list',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if(res.data.status === 'success'){
            let html = `<div>
                        <p>${res.data.data.length} Institutes Available.</p>
                        <table>
                                <tr>
                                    <th>Actions</th>
                                    <th>Institute</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                </tr>`;
            res.data.data.institutes.forEach(inst => {
                html += `<tr>
                        <td>
                            <div class="dropdown">
                                <div class="common-style student-card action-list-all-insti" style="margin:0;padding:0;width:20px;height:40px;text-align:center;">
                                    <h6 style="margin:0;">.</h6>
                                    <h6 style="margin:0;">.</h6>
                                    <h6 style="margin:0;">.</h6>
                                </div>
                                <div style="display:none;" class="dropdown-content">
                                    <a href="#">View</a>
                                    <a href="#">Edit</a>
                                    <a href="#">Delete</a>
                                </div>
                            </div>
                        </td>
                        <td>${inst.name}</td>
                        <td>${inst.email}</td>
                        <td>${inst.phone.join(', ')}</td>
                        <td>${inst.address}, ${inst.addressDistrict} ${inst.addressPincode}, ${inst.addressState}</td>
                    </tr>`
            })
            html += `</table></div>`;
        
      
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('list-all-insti').innerHTML = html;
        document.getElementById('list-all-insti').style.display = '';
        actionsDropdwonFunctionality()
        }
    }
}

const adminInstiSearch = document.getElementById('admin-insti-search');
if(adminInstiSearch){

    adminInstiSearch.addEventListener('click', async e => {
        e.preventDefault();
        const id = document.getElementById('inst-id').value;
        const name = document.getElementById('inst-name').value;
        const district = document.getElementById('inst-dist').value;
        const res = await axios({
            method: 'POST',
            url : '/api/v1/institute/search',
            data : { id, name, district },
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        console.log(res)
        //modify below code for generating table
        let html = `<div>
                        <table>
                                <tr>
                                    <th>Actions</th>
                                    <th>Institute</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                </tr>`;
        for(let i = 0; i<2; i++){
            html += `<tr>
                        <td>
                            <div class="dropdown">
                                <div class="common-style student-card action-list-all-insti" style="margin:0;padding:0;width:20px;height:40px;text-align:center;">
                                    <h6 style="margin:0;">.</h6>
                                    <h6 style="margin:0;">.</h6>
                                    <h6 style="margin:0;">.</h6>
                                </div>
                                <div style="display:none;" class="dropdown-content">
                                    <a href="#">View</a>
                                    <a href="#">Edit</a>
                                    <a href="#">Delete</a>
                                </div>
                            </div>
                        </td>
                        <td>ABC Institute </td>
                        <td>abcinstite@gmail.com</td>
                        <td>9876543210</td>
                        <td>Lorem Ipsum, Doler Sit Amet, 8788, JH</td>
                    </tr>`
        }
        html += `</table></div>`;
        document.getElementById('adm-srch-inst-rslt').innerHTML = html;
        actionsDropdwonFunctionality()
    })

}