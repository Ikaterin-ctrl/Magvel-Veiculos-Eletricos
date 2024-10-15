require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/endpoint', async (req, res) => {
    const { name, email, message } = req.body;

    // Enviar dados para o Make
    try {
        await axios.post('https://hook.integromat.com/seu_hook', {
            name,
            email,
            message
        });
        res.status(200).send('Dados enviados com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        res.status(500).send('Erro ao enviar os dados.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
