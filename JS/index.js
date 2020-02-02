const forms = document.querySelector('form');
forms.setAttribute('novalidate', true);

let message;

// adiciona a lista de estados e suas siglas;
const select = document.querySelector('#estados');
for(let i in Estados) {
  const option = document.createElement('option');
  option.setAttribute('value', Estados[i].valor);
  option.textContent = `${Estados[i].nome} (${Estados[i].valor})`;

  select.appendChild(option);
}


// verifica qual o erro cometido pelo usuário e retorna uma mensagem de erro;
let hasError = (field)=> {

  if(field.disabled || field.type ==='file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;
  let validity = field.validity;
  if(validity.valueMissing) return 'Please fill out this field.';
  if(validity.typeMissMatch) {
    //Email 
    if(field.type ==='email') return 'Please enter an email valid';
    // URL
    if(field.type ==='url') return 'Please enter a URL';
    
  }
  if(validity.tooShort) return `Please lengthen this text ${field.getAttribute('minlength')} characters or more. You are currently using ${field.value.length} characters.`;
  if(validity.tooLong) return `Please lengthen this text ${field.getAttribute('maxlength')} characters or more. You are currently using ${field.value.length} characters.`;
  if(validity.badInput) return 'Please enter only numbers.';
  if(validity.stepMissMatch) return 'Please select a valid value.';
  if(validity.rangeOverflow) return `Please select a value that is no more than ${field.getAttribute('max')}.`;
  if(validity.rangeUnderflow) return `Please select a value that is no more than ${field.getAttribute('min')}.`;
  if(validity.paternMisMatch) {
    if(field.hasAttribute('title')) {
      return field.getAttribute('title');
    } else {
      return 'Please match the requested format.';
    }
  }
  if(validity.valid) return;

  
  return 'The value you entered for this field is invalid.';
}


// exibe mensagem de erro nos campos quando se tem um;
function showError(field, error) {

  let id = field.id || field.name;
  
  if(!id) return;
  message = field.form.querySelector('.error-message#error-for-' + id);
  
  if(!message) {
    message = document.createElement('div');
    message.className = 'error-message';
    message.id = 'error-for-' + id;
    field.parentNode.insertBefore(message, field.nextSibling);
  }    
    
    field.setAttribute('aria-describedby', 'error-for-'+id);
    message.innerHTML = error;
    
    field.style.border = '2px solid red';
    message.style.display = 'block';
    message.style.visibility = 'visible';

}


//remove o erro quando o mesmo é corrigido pelo usuário e exibe uma mensagem de campo válido;
function removeError(field,) {

  field.removeAttribute('aria-describedby');

  let id = field.id || field.name;
  if(!id) return;

  message = field.form.querySelector('.error-message#error-for-' + id);

  
  if(!message) return;

    message.innerHTML= '';
    field.style.border = '1px solid #b2c0ca';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
}

function verificar(event) {
  let error = hasError(event.target);

  const cpf = document.querySelector('#CPF');
  const tel = document.querySelector('#contato');
  const date = document.querySelector('#Date');

  if(error) {
    return showError(event.target, error);
  } else {
    removeError(event.target);
  }

  formatarCPF(cpf);
  formatarTelefone (tel);
  formatarData(date);
}


// ouve todos os inputs e retorna um resultado adequado;
document.addEventListener('blur', verificar, true);


// atualiza o CPF do usuário com o formato padrão;
function formatarCPF(cpf) {
  const cpfAtual = cpf.value;

  let cpfAtualizado;

  cpfAtualizado = 
  cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (regex, arg1, arg2, arg3, arg4)=> `${arg1}.${arg2}.${arg3}-${arg4}`);

  cpf.value = cpfAtualizado;
}

// atualiza o número do usuário com o formato padrão;
function formatarTelefone (tel) {
    const numAtual = tel.value;
    const isCelular = numAtual.length === 9;
    let numeroAtualizado;
    if(isCelular) {
      numeroAtualizado = numAtual.replace(/(\d{5})(\d{4})/, (regex, arg1, arg2)=> `${arg1}-${arg2}`);

      tel.value = numeroAtualizado;

    } else {
      numeroAtualizado = numAtual.replace(/(\d{4})(\d{4})/, (regex, arg1, arg2)=> `${arg1}-${arg2}`);

      tel.value = numeroAtualizado;
    }
}

//atualiza a data do usuário com o formato padrão;
function formatarData(date) {
  const dataAtual = date.value
  let dataAtualizada;

  dataAtualizada = dataAtual.replace(/(\d{2})(\d{2})(\d{4})/,(regex, arg1, arg2, arg3)=>`${arg1}/${arg2}/${arg3}`);

  date.value = dataAtualizada;
}


// verifica se todos os campos são válidos;

document.addEventListener('submit', (event)=> {

  let fields = event.target.elements;
  let error, hasErrors;
  let Flength = fields.length;

  for(let i= 0; i < Flength; i++) {
    error = hasError(fields[i]);

    if(error) {
      showError(fields[i], error);
      if(!hasErrors) {
        hasErrors = fields[i];
      }
    }
  }

  if (hasErrors) {
    event.preventDefault();
    hasErrors.focus();
  } else {
    event.preventDefault();
      openModal();
  }
}, false)


// abre o modal;
function openModal() {
  let modal = document.querySelector('.modal');
  
  modal.style.display = 'flex';
  setTimeout(()=>{
    modal.style.opacity = '1';
  }, 200);
}

//fecha modal;
function closeModal() {
  let modal = document.querySelector('.modal');

  modal.style.opacity = '0';
  setTimeout(()=>{
    modal.style.display = 'none';
  }, 300);
}



    








