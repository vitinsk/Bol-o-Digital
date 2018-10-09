export class ErrorMessage {
    
msgError(error : string){
    let position = error.lastIndexOf('message');
    let positionFim = error.indexOf('path');
    let msgErro = error.substring(position + 10, positionFim - 3)
    return msgErro;
  }
}