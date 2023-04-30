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
const resultText = document.querySelector('.result__text');
const messageSection = document.querySelector('.message');

// Función para encriptar o desencriptar el texto
function encryptText(encrypted) {
  // Si el texto a encriptar no está vacío
  if (encrypted !== '') {
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
    return alert('No se ha ingresado texto.');
  }
}

// Función para manejar el evento de clic en el botón de encriptar
function handleEncrypt() {
  const encrypted = textArea.value;
  const modifiedText = encryptText(encrypted);
  resultText.textContent = modifiedText;
  messageSection.classList.remove('hidden');
}

// Función para manejar el evento de clic en el botón de limpiar
function handleClear() {
  textArea.value = '';
  resultText.textContent = '';
  messageSection.classList.add('hidden');
  textArea.focus();
}

// Agregamos los manejadores de evento a los botones correspondientes
encryptButton.addEventListener('click', handleEncrypt);
clearButton.addEventListener('click', handleClear);
