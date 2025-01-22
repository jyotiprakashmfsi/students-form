function showMessage(msg, type) {
    const box = document.createElement('div');
    box.classList.add('notification', type);
    box.textContent = msg;

    document.body.appendChild(box);

    setTimeout(() => {
        box.remove();
    }, 4000);
}

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

document.getElementById('country').addEventListener('change', function () {
    const myCountry = this.value;
    const myState = document.getElementById('state');
    const myCity = document.getElementById('city');

    myState.innerHTML = '';
    myCity.innerHTML = '';

    if (myPlaces[myCountry]) {
        myPlaces[myCountry].states.forEach((s) => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s;
            myState.appendChild(opt);
        });
    }
});

document.getElementById('state').addEventListener('change', function () {
    const myState = this.value;
    const myCountry = document.getElementById('country').value;
    const myCity = document.getElementById('city');

    myCity.innerHTML = '';

    if (myPlaces[myCountry] && myPlaces[myCountry].cities[myState]) {
        myPlaces[myCountry].cities[myState].forEach((c) => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            myCity.appendChild(opt);
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
    
    const thing = document.getElementById(input);
    const errormsg = document.getElementById(`${input}-error`);
    
    if (!thing || !errormsg) {
        return { ok: true, msg: '' };
    }
    console.log("rule", rules);
    console.log("inputs to check", input);

    if (rules.required && (!value || value.trim() === '')) {
        thing.classList.add('error');
        errormsg.textContent = rules.messages.required;
        return { ok: false, msg: rules.messages.required };
    }

    if (rules.minLength && value.length < rules.minLength) {
        thing.classList.add('error');
        errormsg.textContent = rules.messages.minLength;
        return { ok: false, msg: rules.messages.minLength };
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        thing.classList.add('error');
        errormsg.textContent = rules.messages.pattern;
        return { ok: false, msg: rules.messages.pattern };
    }

    thing.classList.remove('error');
    errormsg.textContent = '';
    return { ok: true, msg: '' };
}

document.querySelectorAll('input, select').forEach(item => {
    if (item.type === 'radio') return;
    
    item.addEventListener('blur', function() {
        checkInput(this.id, this.value);
    });
});

const genderInputs = document.querySelectorAll('input[name="gender"]');
genderInputs.forEach(input => {
    input.addEventListener('change', function() {
        const errorE = document.getElementById('gender-error');
        if (document.querySelector('input[name="gender"]:checked')) {
            errorE.textContent = '';
        }
    });
});

let currentStep = 1;
const totalSteps = 3;

function updateSteps() {
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    document.querySelectorAll('.step-content').forEach(content => {
        const stepNum = parseInt(content.dataset.step);
        if (stepNum === currentStep) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');

    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    nextBtn.style.display = currentStep === totalSteps ? 'none' : 'block';
    submitBtn.style.display = currentStep === totalSteps ? 'block' : 'none';
}

document.querySelector('.prev-btn').addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateSteps();
    }
});

document.querySelector('.next-btn').addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        updateSteps();
    }
});

document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('click', () => {
        currentStep = parseInt(step.dataset.step);
        updateSteps();
    });
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
        const index = Array.from(window.editingRow.parentNode.children).indexOf(window.editingRow);
        students[index] = data;
        window.editingRow = null;
    } else {
        students.push(data);
    }
    
    localStorage.setItem('studentData', JSON.stringify(students));
}

function addToTable(data) {
    const table = document.getElementById('entries-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    
    const nameCell = row.insertCell();
    nameCell.textContent = data.firstname + ' ' + data.lastname;
    
    const emailCell = row.insertCell();
    emailCell.textContent = data.email;
    
    const phoneCell = row.insertCell();
    phoneCell.textContent = data.phoneno;
    
    const genderCell = row.insertCell();
    genderCell.textContent = data.gender;
    
    const qualificationCell = row.insertCell();
    qualificationCell.textContent = data.qualification;
    
    const birthdayCell = row.insertCell();
    birthdayCell.textContent = data.birth;
    
    const address1Cell = row.insertCell();
    address1Cell.textContent = data.address1;
    
    const address2Cell = row.insertCell();
    address2Cell.textContent = data.address2 || '-';
    
    const postalCell = row.insertCell();
    postalCell.textContent = data.postal;
    
    const countryCell = row.insertCell();
    countryCell.textContent = data.country;
    
    const stateCell = row.insertCell();
    stateCell.textContent = data.state;
    
    const cityCell = row.insertCell();
    cityCell.textContent = data.city;
    
    const actionsCell = row.insertCell();
    actionsCell.className = 'action-buttons';
    
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = 'edit-btn';
    editButton.onclick = () => changeStuff(data, row);
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => removeRow(row);
    
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
}

function changeStuff(data, row) {
    Object.keys(data).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'radio') {
                document.querySelector(`[name="${key}"][value="${data[key]}"]`).checked = true;
            } else {
                input.value = data[key];
            }
        }
    });

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Update';
    
    currentStep = 1;
    updateSteps();
    
    window.editingRow = row;
}

function removeRow(row) {
    const index = Array.from(row.parentNode.children).indexOf(row);
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
        let students = JSON.parse(storedData);
        students.splice(index, 1);
        localStorage.setItem('studentData', JSON.stringify(students));
    }
    row.remove();
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });

    const formData = new FormData(this);

    Object.keys(checkStuff).forEach(fieldName => {
        const value = formData.get(fieldName);
        const validation = checkInput(fieldName, value);
        if (!validation.ok) {
            isValid = false;
            const field = document.querySelector(`[name="${fieldName}"]`);
            const errorElement = document.getElementById(`${fieldName}-error`);
            if (field) field.classList.add('error');
            if (errorElement) errorElement.textContent = validation.message;
        }
    });

    if (!formData.get('gender')) {
        isValid = false;
        const genderError = document.getElementById('gender-error');
        if (genderError) {
            genderError.textContent = checkStuff.gender.messages.required;
        }
    }
    
    if (isValid) {
        const formData = {};
        new FormData(this).forEach((value, key) => {
            formData[key] = value.trim();
        });

        saveToLocalStorage(formData);
        
        const tbody = document.querySelector('#entries-table tbody');
        tbody.innerHTML = '';
        loadData();
        
        this.reset();
        document.querySelector('.submit-btn').textContent = 'Submit';
                
        currentStep = 1;
        updateSteps();
    } else {
        const errorFields = document.querySelectorAll('.error');
        if (errorFields.length > 0) {
            const firstErrorField = errorFields[0];
            const stepContent = firstErrorField.closest('.step-content');
            if (stepContent) {
                currentStep = parseInt(stepContent.dataset.step);
                updateSteps();
            }
        }
    }
});

window.addEventListener('load', loadData);