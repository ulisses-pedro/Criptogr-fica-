const fs = require ('fs');
const crypto = require ('crypto');

// Caminhos fictícios dos arquivos
const encryptedFilePath = '**:\\**\\**\\**\\nome do arquivo.tipo de arquivo'; // Para Windows
// const encryptedFilePath = '/home/seuusuario/Documents/arquivo_criptografado.txt'; // Para Linux/Mac

const decryptedFilePath = '**:\\**\\**\\**\\nome do arquivo.tipo de arquivo'; // Para Windows
// const decryptedFilePath = '/home/seuusuario/Documents/arquivo_descriptografado.txt'; // Para Linux/Mac

function decryptFile(inputPath, outputPath, password) {
    try {
        console.log('Lendo o arquivo criptografado de entrada...');
        const encryptedContent = fs.readFileSync(inputPath);
        
        const algorithm = 'aes-256-ctr';
        console.log('Extraindo IV...');
        const iv = encryptedContent.slice(0, 16);
        const encryptedData = encryptedContent.slice(16);
        
        console.log('Criando decifrador...');
        const decipher = crypto.createDecipheriv(algorithm, crypto.createHash('sha256').update(password).digest(), iv);
        
        console.log('Descriptografando conteúdo...');
        const decryptedContent = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        
        console.log('Escrevendo conteúdo descriptografado no arquivo de saída...');
        fs.writeFileSync(outputPath, decryptedContent);
        
        console.log('Arquivo descriptografado com sucesso.');
    } catch (error) {
        console.error('Erro ao descriptografar o arquivo:', error);
    }
}

decryptFile(encryptedFilePath, decryptedFilePath, 'Crie e coloque aqui uma senha');
