let gabarito = [
    ["Rei", "Dama", "Valete", "Ás"],
    ["Dragão", "Fada", "Psíquico", "Elétrico"],
    ["Princesa", "Duquesa", "Baronesa", "Condessa"],
    ["Gás", "Indução", "Cooktop", "Lenha"]
]
let tituloGabarito = [
    "Cartas de baralho",
    "Tipos de Pokémon",
    "Títulos de nobreza",
    "Tipos de fogão"
]
let palavras = [
    "Rei", "Dama", "Valete", "Ás",
    "Dragão", "Fada", "Psíquico", "Elétrico",
    "Princesa", "Duquesa", "Baronesa", "Condessa",
    "Gás", "Indução", "Cooktop", "Lenha",
]

let botoesEPalavras = new Map();

let slots = document.querySelectorAll(".slot");
let botoes = document.querySelectorAll(".game button");
let botoesSelecionados = [];
let tentativasHtml = document.querySelector(".mid p");
let tentativas = 0;

for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", () => Apertou(botoes[i]));
}

for (let i = 0; i < slots.length; i++) {
    let indexAleatorio = Math.floor(Math.random() * palavras.length);
    slots[i].textContent = palavras[indexAleatorio];

    botoesEPalavras.set(botoes[i], palavras[indexAleatorio]);


    palavras.splice(indexAleatorio, 1);
}
console.log("Terminei");

function Apertou(botao){
    if(botoesSelecionados.includes(botao)){
        botoesSelecionados.splice(botoesSelecionados.indexOf(botao), 1);
        botao.style.backgroundColor = "#1e293b";
        return;
    }
    
    botao.style.backgroundColor = "#4ba1f2"; 
    botoesSelecionados.push(botao);

    if(botoesSelecionados.length >= 4){
        Verificar();
    }
}

function Verificar(){
    tentativas++;
    tentativasHtml.textContent = "TENTATIVAS: " + tentativas;
    let listaDePalavras = [];
    let palavra = botoesEPalavras.get(botoesSelecionados[0]);
    let index = 0;

    for(let i = 0; i < gabarito.length; i++){
        if(gabarito[i].includes(palavra)){
            listaDePalavras = gabarito[i];
            index = i;
            break;
        }
    }

    for(let i = 1; i < botoesSelecionados.length; i++){
        let palavra = botoesEPalavras.get(botoesSelecionados[i]);
        if(!listaDePalavras.includes(palavra)){
            console.log("Errou");
            Limpar();
            return;
        }
    }
    console.log("Acertou");
    Acertou(index);
}
function Acertou(index){
    for(let i = 0; i < botoesSelecionados.length; i++){
        botoesSelecionados[i].remove();
    }
    botoesSelecionados = [];
    let acerto = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    h2.textContent = tituloGabarito[index];
    p.textContent = gabarito[index][0] + ", " + gabarito[index][1] + ", " + gabarito[index][2] + ", " + gabarito[index][3];
    acerto.appendChild(h2);
    acerto.appendChild(p);
    let div = document.querySelector(".acertos");
    div.appendChild(acerto);


}

function Limpar(){
    for(let i = 0; i < botoesSelecionados.length; i++){
        botoesSelecionados[i].style.backgroundColor = "#1e293b";
        botoesSelecionados[i].classList.add("errado");
        setTimeout(() => tiraAnimacao(botoesSelecionados[i]), 1000);
    }
    setTimeout(() => limpaBotoes(), 1050);
}
function tiraAnimacao(botao){
    if(botao == null){
        console.log("Botão nulo");
        return;  
    } 
    if(!botao.classList.contains("errado")){
        return;
    }
    botao.classList.remove("errado");
}
function limpaBotoes(){
    botoesSelecionados = [];
}
