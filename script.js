// Variables globales
const encryptor = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

const textArea = document.querySelector('.main__textArea');
const encryptButton = document.querySelector('.buttons__encrypt');
const decryptButton = document.querySelector('.buttons__decrypt');
const clearButton = document.querySelector('.buttons__clear');
const copyButton = document.querySelector('.buttons__copy');
const resultText = document.querySelector('.result__text');
const noResultSection = document.querySelector('.noresult');
const resultSection = document.querySelector('.result');

// Función para validar el texto ingresado
function validateText(text) {
  // Expresión regular para validar el texto (solo letras minúsculas sin caracteres especiales)
  const regex = /^[a-z\s]+$/;
  return regex.test(text);
}

// Función para encriptar el texto
function encryptText(encrypted) {
  // Si el texto a encriptar no está vacío
  if (encrypted !== '') {
    // Validamos el texto ingresado
    if (!validateText(encrypted)) {
      alert('El texto ingresado contiene caracteres no permitidos.');
      return '';
    }

    let modifiedText = encrypted;

    // Iteramos a través del objeto encryptor para reemplazar las letras
    for (const key in encryptor) {
      // Reemplazamos todas las ocurrencias de la letra
      const regex = new RegExp(key, 'g');
      modifiedText = modifiedText.replaceAll(regex, encryptor[key]);
    }

    // Devolvemos el texto modificado
    return modifiedText;
  } else {
    // Si el texto está vacío, devolvemos un mensaje de error
    return 'No se ha ingresado texto.';
  }
}

// Función para desencriptar el texto
function decryptText(encrypted) {
  // Si el texto a desencriptar no está vacío
  if (encrypted !== '') {
    // Validamos el texto ingresado
    if (!validateText(encrypted)) {
      alert('El texto ingresado contiene caracteres no permitidos.');
      return '';
    }

    let modifiedText = encrypted;

    // Iteramos a través del objeto encryptor en sentido inverso para reemplazar las letras
    const reversedEncryptor = {};
    for (const key in encryptor) {
      reversedEncryptor[encryptor[key]] = key;
    }

    // Iteramos a través del objeto reversedEncryptor para reemplazar las letras
    for (const key in reversedEncryptor) {
      // Reemplazamos todas las ocurrencias de la letra
      const regex = new RegExp(key, 'g');
      modifiedText = modifiedText.replaceAll(
        regex,
        reversedEncryptor[key]
      );
    }

    // Devolvemos el texto modificado
    return modifiedText;
  } else {
    // Si el texto está vacío, devolvemos un mensaje de error
    return 'No se ha ingresado texto.';
  }
}

// Función para manejar el evento de clic en el botón de encriptar
function handleEncrypt() {
  const encrypted = textArea.value;
  const modifiedText = encryptText(encrypted);
  resultText.textContent = modifiedText;
  noResultSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
}

// Función para manejar el evento de clic en el botón de desencriptar
function handleDecrypt() {
  const encrypted = textArea.value;
  const modifiedText = decryptText(encrypted);
  resultText.textContent = modifiedText;
  noResultSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
}

// Función para manejar el evento de clic en el botón de limpiar
function handleClear() {
  textArea.value = '';
  resultText.textContent = '';
  noResultSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
  textArea.focus();
}

// Función para manejar el evento de clic en el botón de copiar
function handleCopy() {
  const result = resultText.textContent;
  if (result !== '') {
    // Crear un elemento de textarea temporal
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = result;

    // Agregar el elemento al DOM
    document.body.appendChild(tempTextArea);

    // Seleccionar y copiar el contenido del textarea
    tempTextArea.select();
    document.execCommand('copy');

    // Eliminar el textarea temporal
    document.body.removeChild(tempTextArea);

    // Mostrar una alerta de copiado exitoso
    alert('Texto copiado al portapapeles.');

    // Limpiar todo usando la función handleClear existente
    handleClear();
  }
}

// Agregar los manejadores de eventos a los botones correspondientes
encryptButton.addEventListener('click', handleEncrypt);
decryptButton.addEventListener('click', handleDecrypt);
clearButton.addEventListener('click', handleClear);
copyButton.addEventListener('click', handleCopy);
