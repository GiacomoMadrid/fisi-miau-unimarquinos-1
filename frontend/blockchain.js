import { sha256 } from 'js-sha256';

class Block {
    constructor(anterior, dniImplicado, codCertificado, versionCertificado) {
        this.anterior = anterior;
        this.versionCertificado = versionCertificado;
        this.codCertificado = codCertificado;
        this.dniImplicado = dniImplicado;        
        this.hash = sha256(`${this.anterior}${this.dniImplicado}${this.codCertificado}${this.versionCertificado}`);
        
        Object.defineProperty(this, 'hash', {
            writable: false,
            enumerable: true,
            configurable: false
        });

    }

    validar(){
        console.log(this.hash);
        let nuevoHash = sha256(`${this.anterior}${this.dniImplicado}${this.codCertificado}${this.versionCertificado}`);
        console.log(nuevoHash);
        return nuevoHash === this.hash;
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

    obtenerCertificadoActual(){
        if(this.numeroCertificados >= 0){ 
            return this.cadena[this.numeroCertificados-1];
        }else{
            return null;
        }
    }
    
}

/*
Dos formas de agrefar un nuevo bloque al blockchain:
1.- Crear un bloque y añadir
    const blockchain = new Blockchain();
    const bloque = new Block('', '100000002', '14', 1);
    blockchain.agregarCertificado(bloque);

2.- Añadir directamente usando new (más tedioso, pro: no tienes que nombrar una variable):
    blockchain.agregarCertificado(new Block(blockchain.cadena[blockchain.numeroCertificados-1].hash, '100000002', '32', 2));

    Donde 
        blockchain.cadena[blockchain.numeroCertificados-1].hash 
    Representa al hash del anterior. Esta forma solo se utiliza cuando hay al menos un bloque en el blockchain

blockchain.agregarCertificado(new Block(blockchain.cadena[blockchain.numeroCertificados-1].hash, '100000002', '34', 3));
blockchain.agregarCertificado(new Block(blockchain.cadena[blockchain.numeroCertificados-1].hash, '100000002', '44', 4));
blockchain.agregarCertificado(new Block(blockchain.cadena[blockchain.numeroCertificados-1].hash, '100000002', '64', 5));
console.log(blockchain);
console.log(blockchain.longitud());
console.log(blockchain.verCertificado(3));
const bloque2 = blockchain.cadena[3];
bloque2.codCertificado = '7';
console.log(bloque2);
console.log(blockchain.cadena[1].validar());
console.log(bloque2.validar());
console.log(bloque.validar());
console.log(blockchain.cadena[0].validar());
*/
