const TableModule = (function($) {

    function loadData() {
        const storedData = localStorage.getItem('studentData');
        if (storedData) {
            JSON.parse(storedData).forEach(data => addToTable(data));
        }
    }

    function saveToLocalStorage(data) {
        let storedData = localStorage.getItem('studentData');
        let dataArray = storedData ? JSON.parse(storedData) : [];
        
        if (data.editIndex !== undefined) {
            dataArray[data.editIndex] = data;
        } else {
            dataArray.push(data);
        }
        
        localStorage.setItem('studentData', JSON.stringify(dataArray));
    }

    function addToTable(data) {
        const $tbody = $('#studentTable tbody');
        const $row = $('<tr>');
        
        $row.append(`
            <td>${data.firstname}</td>
            <td>${data.lastname}</td>
            <td>${data.email}</td>
            <td>${data.phoneno}</td>
            <td>${data.gender}</td>
            <td>${data.qualification}</td>
            <td>${data.birth}</td>
            <td>${data.address1}</td>
            <td>${data.address2 || ''}</td>
            <td>${data.country}</td>
            <td>${data.state}</td>
            <td>${data.city}</td>
            <td>${data.postal}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `);
        
        $tbody.append($row);
    }

    function changeStuff(data, $row) {
        $row.find('td').each(function(index) {
            const $td = $(this);
            switch(index) {
                case 0: $td.text(data.firstname); break;
                case 1: $td.text(data.lastname); break;
                case 2: $td.text(data.email); break;
                case 3: $td.text(data.phoneno); break;
                case 4: $td.text(data.gender); break;
                case 5: $td.text(data.qualification); break;
                case 6: $td.text(data.birth); break;
                case 7: $td.text(data.address1); break;
                case 8: $td.text(data.address2 || ''); break;
                case 9: $td.text(data.country); break;
                case 10: $td.text(data.state); break;
                case 11: $td.text(data.city); break;
                case 12: $td.text(data.postal); break;
            }
        });
    }

    function removeRow($row) {
        const index = $row.index();
        let storedData = JSON.parse(localStorage.getItem('studentData'));
        storedData.splice(index, 1);
        localStorage.setItem('studentData', JSON.stringify(storedData));
        $row.remove();
    }

    return {
        loadData,
        saveToLocalStorage,
        addToTable,
        changeStuff,
        removeRow
    };
})(jQuery);
