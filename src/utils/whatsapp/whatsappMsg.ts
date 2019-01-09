
export class WhatsMsg{


    constructor() {
      }

    public enviarMsg(telefone: string, menssagem: string){
        return `https://api.whatsapp.com/send?phone=+55${telefone}&text=${menssagem}`;
    }

    recebimentoCredito(nome: string){
        return `Olá%20${nome},%20você%20acaba%20de%20receber%20crédito%20na%20sua%20conta!%20Agora%20você%20já%20pode%20realizar%20apostas.`;
    }


}