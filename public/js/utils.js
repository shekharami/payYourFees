module.exports = {
    makeTable: function ({data, headers }){
        if(!Array.isArray(data)){
            throw new Error('Please provide data array.')
        } else if(!Array.isArray(headers)){
            throw new Error('Please provide headers array.')
        }
        let html = `<table>`;
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        })
        data.forEach(obj => {
            html += '<tr>';
            headers.forEach(header => {
                html += `<td>${obj[header]}<td>`;
            })
            html += '</tr>';
        })
        html += '</table>';
        return html
    }
}