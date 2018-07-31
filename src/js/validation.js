var Validation = (function () {

    var username = 'bobby.ray@brainstation.io';
    var password = '12345';
    var form;
    var emailField;
    var passwordField;

    var _validateEmail = function (e) {
        _toggleFeedbackMessage(this,emailField.checkValidity());
    };

    var _validateLoginAttempt = function () {
        _toggleFeedbackMessage(passwordField, true);
        if(passwordField.value !== password || emailField.value !== username){
            _toggleFeedbackMessage(passwordField, false);
            return false;
        }

        return true;
    };

    var _toggleFeedbackMessage = function (element, isValid) {
        var feedback = document.querySelector( '#' + element.id + ' ~ .invalid-feedback');
        console.log(isValid ? 'block' : 'none');
        feedback.style.display = isValid ? 'none' : 'block';
    };
  
    var validate = function (formId) {
         form = document.querySelector('#' + formId);
         emailField = form.querySelector('#email-field');
         passwordField = form.querySelector('#pass-field');

        emailField.addEventListener('blur', _validateEmail);
        form.addEventListener('submit', (e)=>{
            if(!form.checkValidity() || !_validateLoginAttempt()){
                e.preventDefault();
                return false;
            }
        });
    };
    
    return {
      validate: validate
    };
  
  })();

  Validation.validate('sign-in');