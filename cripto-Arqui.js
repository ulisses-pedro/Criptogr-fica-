const fs = require ('fs');
const crypto = require ('crypto');

// Caminhos fictícios dos arquivos
const filePath = '**:\\**\\**\\**\\nome do arquivo.tipo de arquivo'; // Para Windows
// const filePath = '/home/seuusuario/Documents/arquivo.txt'; // Para Linux/Mac

const encryptedFilePath = '**:\\**\\**\\**\\nome do arquivo.tipo de arquivo'; // Para Windows
// const encryptedFilePath = '/home/seuusuario/Documents/arquivo_criptografado.txt'; // Para Linux/Mac

// Função para criptografar um arquivo
function encryptFile(inputPath, outputPath, password) {
    try {
        console.log('Lendo o arquivo de entrada...');
        const fileContent = fs.readFileSync(inputPath);
        
        const algorithm = 'aes-256-ctr';
        console.log('Gerando IV...');
        const iv = crypto.randomBytes(16);
        
        console.log('Criando cifrador...');
        const cipher = crypto.createCipheriv(algorithm, crypto.createHash('sha256').update(password).digest(), iv);
        
        console.log('Criptografando conteúdo...');
        const encryptedContent = Buffer.concat([iv, cipher.update(fileContent), cipher.final()]);
        
        console.log('Escrevendo conteúdo criptografado no arquivo de saída...');
        fs.writeFileSync(outputPath, encryptedContent);
        
        console.log('Arquivo criptografado com sucesso.');
    } catch (error) {
        console.error('Erro ao criptografar o arquivo:', error);
    }
}

// Chama a função para criptografar o arquivo
encryptFile(filePath, encryptedFilePath, 'Crie e coloque aqui uma senha');
