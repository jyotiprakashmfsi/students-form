const FormModule = (function($) {

    let currentStep = 1;
    const totalSteps = 3;
    
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
                'New York': ['New York City', 'Buffalo'],
                Texas: ['Houston', 'Dallas'],
            },
        },
    };

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
        }
    };

    function checkInput(input, value) {
        const rules = validationRules[input];
        if (!rules) return [];
        
        const errors = [];

        if (rules.required && !value) {
            errors.push(rules.messages.required);
        }

        if (value && rules.minLength && value.length < rules.minLength) {
            errors.push(rules.messages.minLength);
        }

        if (value && rules.pattern && !rules.pattern.test(value)) {
            errors.push(rules.messages.pattern);
        }

        return errors;
    }

    function Steps() {
        $('.step-content').hide();
        $(`#step${currentStep}`).show();
        
        if (currentStep === 1) {
            $('.prev-btn').hide();
            $('.next-btn').show();
            $('.submit-btn').hide();
        } else if (currentStep === totalSteps) {
            $('.prev-btn').show();
            $('.next-btn').hide();
            $('.submit-btn').show();
        } else {
            $('.prev-btn').show();
            $('.next-btn').show();
            $('.submit-btn').hide();
        }
        
        $('.step').removeClass('active');
        $(`.step:lt(${currentStep})`).addClass('active');
    }

    function getCurrentStep() {
        return currentStep;
    }

    function setCurrentStep(step) {
        currentStep = step;
        Steps();
    }

    function getFormData() {
        return {
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            email: $('#email').val(),
            phoneno: $('#phoneno').val(),
            gender: $('input[name="gender"]:checked').val(),
            qualification: $('#qualification').val(),
            birth: $('#birth').val(),
            address1: $('#address1').val(),
            address2: $('#address2').val(),
            country: $('#country').val(),
            state: $('#state').val(),
            city: $('#city').val(),
            postal: $('#postal').val()
        };
    }

    function populateLocations() {
        const $country = $('#country');
        const $state = $('#state');
        const $city = $('#city');

        Object.keys(myPlaces).forEach(country => {
            $country.append(`<option value="${country}">${country}</option>`);
        });

        $country.on('change', function() {
            const country = $(this).val();
            $state.empty().append('<option value="">Select State</option>');
            $city.empty().append('<option value="">Select City</option>');

            if (country && myPlaces[country]) {
                myPlaces[country].states.forEach(state => {
                    $state.append(`<option value="${state}">${state}</option>`);
                });
            }
        });

        $state.on('change', function() {
            const country = $country.val();
            const state = $(this).val();
            $city.empty().append('<option value="">Select City</option>');

            if (country && state && myPlaces[country].cities[state]) {
                myPlaces[country].cities[state].forEach(city => {
                    $city.append(`<option value="${city}">${city}</option>`);
                });
            }
        });
    }

    return {
        checkInput,
        Steps,
        getCurrentStep,
        setCurrentStep,
        getFormData,
        populateLocations,
        totalSteps,
        validationRules
    };
})(jQuery);
