const clientes = require("../../data/clientes");

const listarClientes = async (req, res) => {
    try {
        return res.status(200).json({
            sucesso: true,
            total: clientes.length,
            dados: clientes
        })
    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar clientes",
            error: error.message,
        })
    }
}

const buscarClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || id.trim() === "") {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID é obrigatório"
            })
        }
        
        const idParsed = parseInt(id);
        if (isNaN(idParsed)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID inválido"
            })

        }
        const cliente = clientes.find((c) => c.id === idParsed);

        if (!cliente) {
            return res.status(404).json({
                sucesso: false,
                mensagem: `Cliente com id ${idParsed} não encontrado`,
            })
        }

        return res.status(200).json({
            sucesso: true,
            dados: cliente
        });

    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao buscar cliente",
            error: error.message,
        });
    }

}

module.exports = {
    listarClientes,
    buscarClientePorId
};
