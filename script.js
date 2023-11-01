const novaTarefa = document.querySelector('#nova-tarefa');
const btnAddTarefa = document.querySelector('#btnAddTarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const janelaEdicao = document.querySelector('#janelaEdicao');
const janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
const janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
const atualizarTarefa = document.querySelector('#atualizarTarefa');
const idTarefaEdicao = document.querySelector('#idTarefaEdicao');
const nomeEdicao = document.querySelector('#nomeEdicao');


novaTarefa.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        let tarefa = {
            nome: novaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) =>{
    alternarJanelaEdicao();
});

btnAddTarefa.addEventListener('click', (e) =>{
    let tarefa = {
        nome: novaTarefa.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa);
});

atualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: nomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual) {
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    
    } else {
        alert('Elemento HTML não encontrado!')
    }

});

function gerarId(){
    return Math.floor(Math.random() * 3000)
}

function adicionarTarefa(tarefa){
    let li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    novaTarefa.value = '';
}

function criarTagLi(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa){
    let li = document.getElementById('' + idTarefa + '');
    if(li){
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        nomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!')
    }
}

function excluir(idTarefa){
    let confirmacao = window.confirm('Tem certeza que quer excluir?');
    if(confirmacao) {
        let li = document.getElementById('' + idTarefa + '');
        if(li){
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!')
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicaoFundo.classList.toggle('abrir');
    janelaEdicao.classList.toggle('abrir');
}