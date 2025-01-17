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

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;
    let errorMessage = '';

    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phoneno').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const qualification = document.getElementById('qualification').value;
    const birth = document.getElementById('birth').value;
    const address1 = document.getElementById('address1').value;

    if (!firstName) {
        isValid = false;
        errorMessage = 'First name is required.';
    } else if (!lastName) {
        isValid = false;
        errorMessage = 'Last name is required.';
    } else if (!email || !/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    } else if (!phoneNo || phoneNo.length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    } else if (!gender) {
        isValid = false;
        errorMessage = 'Please select your gender.';
    } else if (!qualification) {
        isValid = false;
        errorMessage = 'Please select your highest qualification.';
    } else if (!birth) {
        isValid = false;
        errorMessage = 'Please select your birthdate.';
    } else if (!address1) {
        isValid = false;
        errorMessage = 'Address line 1 is required.';
    }

    if (isValid) {
        showNotif('Form submitted successfully!', 'success');
    } else {
        showNotif(errorMessage, 'error');
    }
});
