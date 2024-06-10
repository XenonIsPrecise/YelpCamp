(() => {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        // Check if the form is valid
        if (!form.checkValidity()) {
          // Prevent form submission if not valid
          event.preventDefault();
          event.stopPropagation();
        }
  
        // Add Bootstrap's validation class to the form
        form.classList.add('was-validated');
      }, false);
    });
  })();
  