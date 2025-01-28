const EventModule = (function($) {

    let editIndex = -1;

    function bindEvents() {
        let rowToDelete = null;
        
        function showConfirmDialog(message) {
            $('#dialogMessage').text(message);
            $('.dialog-overlay').css('display', 'flex');
        }
        
        function hideConfirmDialog() {
            $('.dialog-overlay').css('display', 'none');
        }
        
        $('.btn-cancel').on('click', function() {
            hideConfirmDialog();
            rowToDelete = null;
        });
        
        $('.btn-confirm').on('click', function() {
            if (rowToDelete) {
                TableModule.removeRow(rowToDelete);
                hideConfirmDialog();
                rowToDelete = null;
            }
        });

        $('.next-btn').on('click', function() {
            const currentStep = FormModule.getCurrentStep();
            let hasErrors = false;

            $(`#step${currentStep} input, #step${currentStep} select`).each(function() {
                const $input = $(this);
                const id = $input.attr('id');
                const name = $input.attr('name');
                
                if ($input.attr('type') === 'file' || (!id && !name)) {
                    return;
                }

                if ($input.attr('type') === 'radio') {
                    const value = $(`input[name="${name}"]:checked`).val();
                    const errors = FormModule.checkInput(name, value);
                    const $errorSpan = $('#' + name + '-error');
                    
                    if (errors.length > 0) {
                        hasErrors = true;
                        $errorSpan.text(errors[0]).show();
                    } else {
                        $errorSpan.hide();
                    }
                } 
                else if (id && FormModule.validationRules[id]) {
                    const errors = FormModule.checkInput(id, $input.val());
                    if (errors.length > 0) {
                        hasErrors = true;
                        $input.addClass('error');
                        $input.next('.error-message').remove();
                        $input.after(`<span class="error-message">${errors[0]}</span>`);
                    } else {
                        $input.removeClass('error');
                        $input.next('.error-message').remove();
                    }
                }
            });

            if (!hasErrors && currentStep < FormModule.totalSteps) {
                FormModule.setCurrentStep(currentStep + 1);
            }
        });

        $('.prev-btn').on('click', function() {
            const currentStep = FormModule.getCurrentStep();
            if (currentStep > 1) {
                FormModule.setCurrentStep(currentStep - 1);
            }
        });

        $('#studentForm').on('submit', function(e) {
            e.preventDefault();
            let hasErrors = false;

            $('input, select').each(function() {
                const $input = $(this);
                const id = $input.attr('id');
                const name = $input.attr('name');
                
                if ($input.attr('type') === 'file' || (!id && !name)) {
                    return;
                }

                if ($input.attr('type') === 'radio') {
                    const value = $(`input[name="${name}"]:checked`).val();
                    const errors = FormModule.checkInput(name, value);
                    const $errorSpan = $('#' + name + '-error');
                    
                    if (errors.length > 0) {
                        hasErrors = true;
                        $errorSpan.text(errors[0]).show();
                    }
                } 
                else if (id && FormModule.validationRules[id]) {
                    const errors = FormModule.checkInput(id, $input.val());
                    if (errors.length > 0) {
                        hasErrors = true;
                        $input.addClass('error');
                        $input.next('.error-message').remove();
                        $input.after(`<span class="error-message">${errors[0]}</span>`);
                    }
                }
            });

            if (hasErrors) {
                return;
            }
            
            const formData = FormModule.getFormData();
            
            if (editIndex !== -1) {
                formData.editIndex = editIndex;
                const $row = $('#studentTable tbody tr').eq(editIndex);
                TableModule.changeStuff(formData, $row);
                editIndex = -1;
            } else {
                TableModule.addToTable(formData);
            }
            
            TableModule.saveToLocalStorage(formData);
            this.reset();
            FormModule.setCurrentStep(1);
        });

        $('#studentTable').on('click', '.edit-btn', function() {
            const $row = $(this).closest('tr');
            editIndex = $row.index();
            
            const rowData = {
                firstname: $row.find('td').eq(0).text(),
                lastname: $row.find('td').eq(1).text(),
                email: $row.find('td').eq(2).text(),
                phoneno: $row.find('td').eq(3).text(),
                gender: $row.find('td').eq(4).text(),
                qualification: $row.find('td').eq(5).text(),
                birth: $row.find('td').eq(6).text(),
                address1: $row.find('td').eq(7).text(),
                address2: $row.find('td').eq(8).text(),
                country: $row.find('td').eq(9).text(),
                state: $row.find('td').eq(10).text(),
                city: $row.find('td').eq(11).text(),
                postal: $row.find('td').eq(12).text()
            };

            Object.keys(rowData).forEach(key => {
                if (key === 'gender') {
                    $(`input[name="gender"][value="${rowData[key]}"]`).prop('checked', true);
                } else {
                    $(`#${key}`).val(rowData[key]);
                }
            });

            $('#country').trigger('change');
            setTimeout(() => {
                $('#state').val(rowData.state).trigger('change');
                setTimeout(() => {
                    $('#city').val(rowData.city);
                }, 100);
            }, 100);
        });

        $('#studentTable').on('click', '.delete-btn', function() {
            const $row = $(this).closest('tr');
            const firstName = $row.find('td').eq(0).text();
            const lastName = $row.find('td').eq(1).text();
            rowToDelete = $row;
            
            showConfirmDialog(`Are you sure you want to delete the entry for ${firstName} ${lastName}?`);
        });

        $('input, select').on('input change', function() {
            const $input = $(this);
            const id = $input.attr('id');
            const name = $input.attr('name');
            
            if ($input.attr('type') === 'file' || (!id && !name)) {
                return;
            }

            if ($input.attr('type') === 'radio') {
                const value = $(`input[name="${name}"]:checked`).val();
                const errors = FormModule.checkInput(name, value);
                const $errorSpan = $('#' + name + '-error');
                
                if (errors.length > 0) {
                    $errorSpan.text(errors[0]).show();
                } else {
                    $errorSpan.hide();
                }
            } 
            else if (id && FormModule.validationRules[id]) {
                const errors = FormModule.checkInput(id, $input.val());
                if (errors.length > 0) {
                    $input.addClass('error');
                    $input.next('.error-message').remove();
                    $input.after(`<span class="error-message">${errors[0]}</span>`);
                } else {
                    $input.removeClass('error');
                    $input.next('.error-message').remove();
                }
            }
        });
    }

    function init() {
        FormModule.Steps();
        FormModule.populateLocations();
        TableModule.loadData();
        bindEvents();
    }

    return {
        init
    };
})(jQuery);
