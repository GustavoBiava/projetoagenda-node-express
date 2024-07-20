import 'core-js/stable';
import 'regenerator-runtime/runtime';
//import './assets/css/style.css';

import formValidate from './modules/LoginFormValidate';

const formRegisterValidate = new formValidate('.form-register');
const formLoginValidate = new formValidate('.form-login');

formRegisterValidate.init();
formLoginValidate.init();

