const myPlaces = {
    India: {
        states: ['Odisha', 'West Bengal', 'Jharkhand'],
        cities: {
            Odisha: ['Bhubaneswar', 'Cuttack'],
            'West Bengal': ['Kolkata', 'Siliguri'],
            Jharkhand: ['Ranchi', 'Jamshedpur'],
        },
    },
    Japan: {
        states: ['Tokyo', 'Osaka', 'Kyoto'],
        cities: {
            Tokyo: ['Shibuya', 'Shinjuku'],
            Osaka: ['Umeda', 'Namba'],
            Kyoto: ['Gion', 'Arashiyama'],
        },
    },
    USA: {
        states: ['California', 'New York', 'Texas'],
        cities: {
            California: ['Los Angeles', 'San Francisco'],
            NewYork: ['New York City', 'Buffalo'],
            Texas: ['Houston', 'Dallas'],
        },
    },
};

$('#country').on('change', function() {
    const myCountry = $(this).val();
    const $myState = $('#state');
    const $myCity = $('#city');

    // myState.innerHTML = '';
    // myCity.innerHTML = '';
    $myState.empty();
    $myCity.empty();

    if (myPlaces[myCountry]) {
        myPlaces[myCountry].states.forEach((s) => {
            // const opt = document.createElement('option');
            $('<option>').val(s).text(s).appendTo($myState);
        });
    }
});

$('#state').on('change', function() {
    const myState = $(this).val();
    const myCountry = $('#country').val();
    const $myCity = $('#city');

    $myCity.empty();

    if (myPlaces[myCountry] && myPlaces[myCountry].cities[myState]) {
        myPlaces[myCountry].cities[myState].forEach((c) => {
            $('<option>').val(c).text(c).appendTo($myCity);
        });
    }
});

const checkStuff = {
    firstname: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]*$/,
        messages: {
            required: 'First name is required',
            minLength: 'First name must be at least 2 characters',
            pattern: 'First name can only contain letters'
        }
    },
    lastname: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]*$/,
        messages: {
            required: 'Last name is required',
            minLength: 'Last name must be at least 2 characters',
            pattern: 'Last name can only contain letters'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address'
        }
    },
    phoneno: {
        required: true,
        pattern: /^\d{10}$/,
        messages: {
            required: 'Phone number is required',
            pattern: 'Please enter a valid 10-digit phone number'
        }
    },
    gender: {
        required: true,
        messages: {
            required: 'Please select a gender'
        }
    },
    qualification: {
        required: true,
        messages: {
            required: 'Please select your qualification'
        }
    },
    birth: {
        required: true,
        messages: {
            required: 'Please select your birth date'
        }
    },
    address1: {
        required: true,
        messages: {
            required: 'Address Line 1 is required'
        }
    },
    postal: {
        required: true,
        pattern: /^\d{6}$/,
        messages: {
            required: 'Postal code is required',
            pattern: 'Please enter a valid 6-digit postal code'
        }
    },
    country: {
        required: true,
        messages: {
            required: 'Please select a country'
        }
    },
    state: {
        required: true,
        messages: {
            required: 'Please select a state'
        }
    },
    city: {
        required: true,
        messages: {
            required: 'Please select a city'
        }
    }
};

function checkInput(input, value) {
    const rules = checkStuff[input];
    if (!rules) return { ok: true, msg: '' };
    
    const $thing = $('#' + input);
    const $errormsg = $('#' + input + '-error');
    
    if (!$thing.length || !$errormsg.length) {
        return { ok: true, msg: '' };
    }
    console.log("rule", rules);
    console.log("inputs to check", input);

    if (rules.required && (!value || value.trim() === '')) {
        $thing.addClass('error');
        $errormsg.text(rules.messages.required);
        return { ok: false, msg: rules.messages.required };
    }

    if (rules.minLength && value.length < rules.minLength) {
        $thing.addClass('error');
        $errormsg.text(rules.messages.minLength);
        return { ok: false, msg: rules.messages.minLength };
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        $thing.addClass('error');
        $errormsg.text(rules.messages.pattern);
        return { ok: false, msg: rules.messages.pattern };
    }

    $thing.removeClass('error');
    $errormsg.text('');
    return { ok: true, msg: '' };
}

$('input, select').not('[type="radio"]').on('blur', function() {
    checkInput(this.id, $(this).val());
});

$('input[name="gender"]').on('change', function() {
    const $errorE = $('#gender-error');
    if ($('input[name="gender"]:checked').length) {
        $errorE.text('');
    }
});

let currentStep = 1;
const totalSteps = 3;

function updateSteps() {
    $('.step').each(function() {
        const stepNum = parseInt($(this).data('step'));
        $(this).toggleClass('active', stepNum === currentStep);
    });

    $('.step-content').each(function() {
        const stepNum = parseInt($(this).data('step'));
        $(this).toggleClass('active', stepNum === currentStep);
    });

    const $prevBtn = $('.prev-btn');
    const $nextBtn = $('.next-btn');
    const $submitBtn = $('.submit-btn');

    $prevBtn.toggle(currentStep !== 1);
    $nextBtn.toggle(currentStep !== totalSteps);
    $submitBtn.toggle(currentStep === totalSteps);
}

$('.prev-btn').on('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateSteps();
    }
});

$('.next-btn').on('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        updateSteps();
    }
});

$('.step').on('click', function() {
    currentStep = parseInt($(this).data('step'));
    updateSteps();
});

function loadData() {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
        const students = JSON.parse(storedData);
        students.forEach(student => addToTable(student));
    }
}

function saveToLocalStorage(data) {
    const storedData = localStorage.getItem('studentData');
    let students = storedData ? JSON.parse(storedData) : [];
    
    if (window.editingRow) {
        const index = $(window.editingRow).index();
        students[index] = data;
        window.editingRow = null;
    } else {
        students.push(data);
    }
    
    localStorage.setItem('studentData', JSON.stringify(students));
}

function addToTable(data) {
    const $tbody = $('#entries-table tbody');
    const $row = $('<tr>');
    
    $('<td>').text(data.firstname + ' ' + data.lastname).appendTo($row);
    $('<td>').text(data.email).appendTo($row);
    $('<td>').text(data.phoneno).appendTo($row);
    $('<td>').text(data.gender).appendTo($row);
    $('<td>').text(data.qualification).appendTo($row);
    $('<td>').text(data.birth).appendTo($row);
    $('<td>').text(data.address1).appendTo($row);
    $('<td>').text(data.address2 || '-').appendTo($row);
    $('<td>').text(data.postal).appendTo($row);
    $('<td>').text(data.country).appendTo($row);
    $('<td>').text(data.state).appendTo($row);
    $('<td>').text(data.city).appendTo($row);
    
    const $actionsCell = $('<td>').addClass('action-buttons');
    
    const $editButton = $('<button>')
        .addClass('edit-btn')
        .html('<i class="fas fa-edit"></i>')
        .on('click', () => changeStuff(data, $row));
    
    const $deleteButton = $('<button>')
        .addClass('delete-btn')
        .html('<i class="fas fa-trash"></i>')
        .on('click', () => removeRow($row));
    
    $actionsCell.append($editButton, $deleteButton);
    $row.append($actionsCell);
    $tbody.append($row);
}

function changeStuff(data, $row) {
    $.each(data, function(key, value) {
        const $input = $(`[name="${key}"]`);
        if ($input.length) {
            if ($input.attr('type') === 'radio') {
                $(`[name="${key}"][value="${value}"]`).prop('checked', true);
            } else {
                $input.val(value);
            }
        }
    });

    $('.submit-btn').text('Update');
    
    currentStep = 1;
    updateSteps();
    
    window.editingRow = $row[0];
}

function removeRow($row) {
    const index = $row.index();
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
        let students = JSON.parse(storedData);
        students.splice(index, 1);
        localStorage.setItem('studentData', JSON.stringify(students));
    }
    $row.remove();
}

$('form').on('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    $('.error-message').text('');
    $('.error').removeClass('error');

    const formData = new FormData(this);

    $.each(checkStuff, function(fieldName) {
        const value = formData.get(fieldName);
        const validation = checkInput(fieldName, value);
        if (!validation.ok) {
            isValid = false;
            const $field = $(`[name="${fieldName}"]`);
            const $errorElement = $(`#${fieldName}-error`);
            if ($field.length) $field.addClass('error');
            if ($errorElement.length) $errorElement.text(validation.message);
        }
    });

    if (!formData.get('gender')) {
        isValid = false;
        const $genderError = $('#gender-error');
        if ($genderError.length) {
            $genderError.text(checkStuff.gender.messages.required);
        }
    }
    

    if (isValid) {
        const formData = {};
        $(this).serializeArray().forEach(({name, value}) => {
            formData[name] = value.trim();
        });

        saveToLocalStorage(formData);
        
        $('#entries-table tbody').empty();
        loadData();
        
        this.reset();
        $('.submit-btn').text('Submit');
                
        currentStep = 1;
        updateSteps();
    } else {
        const $errorFields = $('.error');
        if ($errorFields.length) {
            const $firstErrorField = $errorFields.first();
            const $stepContent = $firstErrorField.closest('.step-content');
            if ($stepContent.length) {
                currentStep = parseInt($stepContent.data('step'));
                updateSteps();
            }
        }
    }
});

$(window).on('load', loadData);