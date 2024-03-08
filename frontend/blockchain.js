import { sha256 } from 'js-sha256';

class Block{
    constructor(anterior, dniImplicado, codCertificado, versionCertificado){
        this.anterior = anterior;
        this.versionCertificado = versionCertificado;
        this.codCertificado = codCertificado;
        this.dniImplicado = dniImplicado;
        this.hash =  this.hashear();  
    }

    hashear(){
        return sha256(`${this.anterior}${this.dniImplicado}${this.codCertificado}${this.versionCertificado}`);        
    }
}


class Blockchain{
    constructor(){
        this.numeroCertificados = 0;
        this.cadena = [];
    }

    longitud(){
        let tamanno = this.numeroCertificados;
        return tamanno;
    }

    agregarCertificado(bloque){
        if(this.numeroCertificados == 0){
            bloque.anterior = '';
            this.cadena[this.numeroCertificados] = bloque;
            this.numeroCertificados++;

        }else{
            bloque.anterior = this.cadena[this.numeroCertificados-1].hash;
            this.cadena[this.numeroCertificados] = bloque;
            this.numeroCertificados++;
        }

    }

    verCertificado(posicion){
        if(this.numeroCertificados >= 0){
            let pos = posicion;
            return this.cadena[pos];

        }else{
            return null;
        }
    }


}

//Ejemplo:
const blockchain = new Blockchain();
const bloque = new Block('', '100000002', '14', 1);
blockchain.agregarCertificado(bloque);
blockchain.agregarCertificado(new Block('', '100000002', '32', 2));
blockchain.agregarCertificado(new Block('', '100000002', '34', 3));
blockchain.agregarCertificado(new Block('', '100000002', '44', 4));
blockchain.agregarCertificado(new Block('', '100000002', '64', 5));
console.log(blockchain);
console.log(blockchain.longitud());
console.log(blockchain.verCertificado(3))