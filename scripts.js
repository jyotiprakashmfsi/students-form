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
    change
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

function addToTable(data) {
    const myTable = document.getElementById('entries-table');
    const myRows = myTable.querySelector('tbody') || myTable.createTBody();
    const newRow = myRows.insertRow();

    const stuffToAdd = ['firstname', 'email', 'phoneno', 'gender', 'qualification', 'birth', 'address1', 'address2', 'postal', 'country', 'state', 'city'];
    
    const nameBox = newRow.insertCell();
    nameBox.textContent = `${data.get('firstname')} ${data.get('lastname')}`;
    
    stuffToAdd.slice(1).forEach(thing => {
        const box = newRow.insertCell();
        box.textContent = data.get(thing);
    });

    const picBox = newRow.insertCell();
    const myPic = data.get('photo');
    if (myPic && myPic instanceof File) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '50px';
            img.style.height = '50px';
            picBox.appendChild(img);
        };
        reader.readAsDataURL(myPic);
    }

    const buttonBox = newRow.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = () => changeStuff(data, newRow);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => removeRow(newRow);

    buttonBox.appendChild(editButton);
    buttonBox.appendChild(deleteButton);

    saveMyStuff();
}

function saveMyStuff() {
    const myTable = document.getElementById('entries-table');
    const myRows = myTable.querySelector('tbody');
    if (!myRows) return;

    const allStuff = [];
    myRows.querySelectorAll('tr').forEach(row => {
        const boxes = row.cells;
        const stuff = {
            name: boxes[0].textContent,
            email: boxes[1].textContent,
            phone: boxes[2].textContent,
            gender: boxes[3].textContent,
            qualification: boxes[4].textContent,
            birth: boxes[5].textContent,
            address1: boxes[6].textContent,
            address2: boxes[7].textContent,
            postal: boxes[8].textContent,
            country: boxes[9].textContent,
            state: boxes[10].textContent,
            city: boxes[11].textContent,
            photo: boxes[12].querySelector('img')?.src || ''
        };
        allStuff.push(stuff);
    });

    localStorage.setItem('myStuff', JSON.stringify(allStuff));
}

function loadMyStuff() {
    const savedStuff = JSON.parse(localStorage.getItem('myStuff') || '[]');
    const myTable = document.getElementById('entries-table');
    const myRows = myTable.querySelector('tbody') || myTable.createTBody();
    myRows.innerHTML = '';

    savedStuff.forEach(stuff => {
        const newRow = myRows.insertRow();
        
        Object.values(stuff).forEach((thing, num) => {
            const box = newRow.insertCell();
            if (num === 12 && thing) { 
                const img = document.createElement('img');
                img.src = thing;
                img.style.width = '50px';
                img.style.height = '50px';
                box.appendChild(img);
            } else {
                box.textContent = thing;
            }
        });

        const buttonBox = newRow.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => changeStuff(stuff, newRow);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => removeRow(newRow);

        buttonBox.appendChild(editButton);
        buttonBox.appendChild(deleteButton);
    });
}

function changeStuff(data, row) {
    const myForm = document.querySelector('form');
    let fname, lname, mail, phone, gender, study, bday, 
        addr1, addr2, zip, country, state, city;

    if (data instanceof FormData) {
        fname = data.get('firstname');
        lname = data.get('lastname');
        mail = data.get('email');
        phone = data.get('phoneno');
        gender = data.get('gender');
        study = data.get('qualification');
        bday = data.get('birth');
        addr1 = data.get('address1');
        addr2 = data.get('address2');
        zip = data.get('postal');
        country = data.get('country');
        state = data.get('state');
        city = data.get('city');
    } else {
        [fname, lname] = data.name.split(' ');
        mail = data.email;
        phone = data.phone;
        gender = data.gender;
        study = data.qualification;
        bday = data.birth;
        addr1 = data.address1;
        addr2 = data.address2;
        zip = data.postal;
        country = data.country;
        state = data.state;
        city = data.city;
    }
    
    myForm.firstname.value = fname;
    myForm.lastname.value = lname;
    myForm.email.value = mail;
    myForm.phoneno.value = phone;
    myForm.querySelector(`input[name="gender"][value="${gender}"]`).checked = true;
    myForm.qualification.value = study;
    myForm.birth.value = bday;
    myForm.address1.value = addr1;
    myForm.address2.value = addr2;
    myForm.postal.value = zip;
    myForm.country.value = country;
    
    const event1 = new Event('change');
    myForm.country.dispatchEvent(event1);
    
    setTimeout(() => {
        myForm.state.value = state;
        const event2 = new Event('change');
        myForm.state.dispatchEvent(event2);
        
        setTimeout(() => {
            myForm.city.value = city;
        }, 100);
    }, 100);

    removeRow(row);
    
    const updateBtn = myForm.querySelector('button[type="submit"]');
    updateBtn.textContent = 'Update';
}

function removeRow(row) {
    row.remove();
    saveMyStuff();
    showMessage('Row deleted!', 'success');
}

window.addEventListener('load', loadMyStuff);

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;
    const formData = new FormData(this);

    Object.keys(checkStuff).forEach(fieldName => {
        const value = formData.get(fieldName);
        const validation = checkInput(fieldName, value);
        if (!validation.ok) {
            isValid = false;
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
        addToTable(formData);
        showMessage('Form submitted successfully!', 'success');
        this.reset();
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    } else {
        showMessage('Please fix the errors before submitting.', 'error');
    }
});
