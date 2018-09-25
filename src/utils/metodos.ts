export class Metodos {

    arrayNumeros(variavel, resposta){

    }
    
    passaParaArray(dado: String){
        const numerosarray = []
        for (let index = 0; index < dado.length; index++) {      
          numerosarray.push(dado.substring(index, index+=2));           
        }
        return numerosarray;
      }


}