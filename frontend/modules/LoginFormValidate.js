import validator from "validator";

export default class Login {
    
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validate(event);
        });
    }

    validate(event) {
        const element = event.target;
        const emailInput = element.querySelector('input[name="email"]');
        const passwordInput = element.querySelector('input[name="password"]');
        let hasError = false;

        if (!emailInput.value) {
            hasError = true;
            alert('E-mail inválido!');
        }

        if (!validator.isEmail(emailInput.value)) {
            hasError = true;
            alert('E-mail inválido!');
        }

        if (!passwordInput.value) {
            hasError = true;
            alert('Senha inválida!');
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length >= 50 ) {
            hasError = true;
            alert('Tamanho de senha inválido! (3 - 50)');
        }

        if (!hasError) element.submit();

    }

};