function showNotif(message, type) {
    console.log(message, type);
    const notificationBox = document.createElement('div');
    notificationBox.classList.add('notification', type);
    notificationBox.textContent = message;

    document.body.appendChild(notificationBox);

    setTimeout(() => {
        notificationBox.remove();
    }, 4000);
}

const countries = {
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
    const selectedCountry = this.value;
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    stateSelect.innerHTML = '';
    citySelect.innerHTML = '';

    if (countries[selectedCountry]) {
        countries[selectedCountry].states.forEach((state) => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
});

document.getElementById('state').addEventListener('change', function () {
    const selectedState = this.value;
    const selectedCountry = document.getElementById('country').value;
    const citySelect = document.getElementById('city');

    citySelect.innerHTML = '';

    if (countries[selectedCountry] && countries[selectedCountry].cities[selectedState]) {
        countries[selectedCountry].cities[selectedState].forEach((city) => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
});

const validationRules = {
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

function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { isValid: true, message: '' };
    console.log(fieldName, value);
    
    const field = document.getElementById(fieldName);
    const errorE = document.getElementById(`${fieldName}-error`);
    
    if (!field || !errorE) {
        return { isValid: true, message: '' };
    }

    if (rules.required && (!value || value.trim() === '')) {
        field.classList.add('error');
        errorE.textContent = rules.messages.required;
        return { isValid: false, message: rules.messages.required };
    }

    if (rules.minLength && value.length < rules.minLength) {
        field.classList.add('error');
        errorE.textContent = rules.messages.minLength;
        return { isValid: false, message: rules.messages.minLength };
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        field.classList.add('error');
        errorE.textContent = rules.messages.pattern;
        return { isValid: false, message: rules.messages.pattern };
    }

    field.classList.remove('error');
    errorE.textContent = '';
    return { isValid: true, message: '' };
}

document.querySelectorAll('input, select').forEach(field => {
    if (field.type === 'radio') return;

    console.log("blur", field);

    field.addEventListener('blur', function() {
        validateField(this.id, this.value);
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

function addEntryToTable(formData) {
    const tableBody = document.getElementById('entries-body');
    const newRow = document.createElement('tr');
    
    const photoFile = document.getElementById('photo').files[0];
    const photoName = photoFile ? photoFile.name : 'No photo';
    
    const name = `${formData.get('firstname')} ${formData.get('lastname')}`;
    
    const rowContent = `
        <td>${name}</td>
        <td>${formData.get('email')}</td>
        <td>${formData.get('phoneno')}</td>
        <td>${formData.get('gender') || ''}</td>
        <td>${formData.get('qualification')}</td>
        <td>${formData.get('birth')}</td>
        <td>${formData.get('address1')}</td>
        <td>${formData.get('address2') || ''}</td>
        <td>${formData.get('postal')}</td>
        <td>${formData.get('country')}</td>
        <td>${formData.get('state')}</td>
        <td>${formData.get('city')}</td>
        <td>${photoName}</td>
    `;
    
    newRow.innerHTML = rowContent;
    tableBody.appendChild(newRow);

}

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;
    const formData = new FormData(this);

    Object.keys(validationRules).forEach(fieldName => {
        const value = formData.get(fieldName);
        const validation = validateField(fieldName, value);
        if (!validation.isValid) {
            isValid = false;
        }
    });

    if (!formData.get('gender')) {
        isValid = false;
        const genderError = document.getElementById('gender-error');
        if (genderError) {
            genderError.textContent = validationRules.gender.messages.required;
        }
    }

    if (isValid) {
        addEntryToTable(formData);
        showNotif('Form submitted successfully!', 'success');
        this.reset();
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    } else {
        showNotif('Please fix the errors before submitting.', 'error');
    }
});
