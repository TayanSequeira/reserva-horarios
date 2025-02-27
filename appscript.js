// Defina o ID da planilha (substitua pelo ID real da sua planilha)
const SHEET_ID = "15F38ksO8NiVuCkZFAN8YlELrH746x93ijZYF7-VS16k";

// Função principal para servir a página HTML quando o usuário acessa o Web App
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index') // Carrega o arquivo 'index.html'
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Permite que o HTML seja incorporado em iframes
}

// Função para obter os horários de uma planilha específica
function getHorarios(sheetName) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName); // Usa o ID da planilha

  if (!sheet) { // Se a planilha não existir, retorna uma lista vazia
    return [];
  }

  var data = sheet.getDataRange().getValues(); // Pega todos os dados da planilha

  return data.slice(1); // Retorna os dados sem a primeira linha (cabeçalho)
}

// Função para reservar um horário na planilha
function reservarHorario(unidade, linha, coluna, nomeMonitor) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(unidade); // Usa o ID da planilha

  if (!sheet) { // Se a planilha não for encontrada, retorna uma mensagem de erro
    return "Planilha da unidade não encontrada.";
  }

  // Calcula a célula correta na planilha ajustando os índices (linha + 2, coluna + 1)
  var cell = sheet.getRange(parseInt(linha) + 2, parseInt(coluna) + 1);

  if (cell.getValue() === "") {  // Se a célula estiver vazia, permite a reserva
    cell.setValue(nomeMonitor); // Define o nome do monitor no horário selecionado
    return "Horário reservado com sucesso!";
  } else {
    return "Esse horário já foi reservado."; // Se a célula já estiver preenchida, impede a reserva
  }
}
