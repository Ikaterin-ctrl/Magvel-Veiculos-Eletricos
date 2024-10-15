require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para receber dados do formulário
app.post('/endpoint', async (req, res) => {
    const { name, email, message } = req.body;

    // Validar os dados recebidos
    if (!name || !email || !message) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    // Enviar dados para o Make
    try {
        await axios.post('hfvs1yp4etxkuw2upjyqwaj5j9hyxvqn@hook.us2.make.com', {
            name,
            email,
            message
        });
        res.status(200).send('Dados enviados com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar os dados:', error.response ? error.response.data : error.message);
        res.status(500).send('Erro ao enviar os dados.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
