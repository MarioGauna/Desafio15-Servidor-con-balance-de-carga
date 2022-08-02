function generador(n) {
    const arrayNumeros = [];
    
    for (let i = 0; i < n; i++) {
        arrayNumeros.push(
            Math.floor(Math.random() * 1000)
        )
    }
    return arrayNumeros;
}

process.on('message', (num) => {
    const numeros = generador(num);
    process.send(numeros);
})