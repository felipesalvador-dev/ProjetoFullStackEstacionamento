const express = require("express")
const cors = require("cors");
const PORTA = 3000;
const app = express();
app.use(cors());
app.use(express.json());

let VEICULOS =[
    {id: 1 , placa: "ABC-1234", modelo: "SUV", pago : true , horario_entrada : new Date().toISOString()},
    {id: 2 , placa: "ABC-1234", modelo: "Etios", pago : false ,horario_entrada : new Date().toISOString()}
]

app.get("/", (req, res) =>{
    res.status(200).json({msg: "Hello"})
})

app.get("/lerveiculos", (req, res) =>{
      res.status(200).json(VEICULOS)
})

app.get("/lerveiculos/:id", (req, res) =>{
    const id = req.params.id;
    console.log(id)
    const meuCarro = VEICULOS.find(veiculo => veiculo.id === Number(id))

    res.status(200).json(meuCarro);
})

app.patch("/atualizarpagamento/:id", (req, res) => {
    const id = Number(req.params.id);

    const veiculo = VEICULOS.find(x => x.id === id);

    if (!veiculo) {
        return res.status(404).json({ erro: "Veículo não encontrado" });
    }

    // Exemplo: atualizando pagamento
    veiculo.pago = true;

    return res.status(200).json({ mensagem: "Pagamento atualizado com sucesso", veiculo });
});


app.delete("/Deletar/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = VEICULOS.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Veículo não encontrado" });
    }

    const removido = VEICULOS.splice(index, 1)[0]; 
    res.status(200).json(removido);
})

app.listen(PORTA, ()=>{
    console.log(`Servidor funcionando http://localhost:${PORTA}`)
})