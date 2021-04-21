const formulario = document.getElementById("Formulario")

formulario.addEventListener('submit', function(event){ 
    const{ target } = event
    const elementos = target.getElementsByTagName("input")

    const id= elementos.id
    const produto= elementos.Produto
    const quantidade= elementos.Quantidade

    if(produto && !id.value){
        const produtos = salvar(produto.value,quantidade.value)
        mostrar(produtos.id,produtos.nome,produtos.quant)
    }
    else{
       atualizar(id.value,produto.value,quantidade.value)
       carregarprodutos()
    }
})

function salvar(produto,quantidade){
    const objeto = {produto, quantidade, id:1}
    let lista = []
    const listaLocal = localStorage.getItem("set")
    if(listaLocal){
        lista = JSON.parse(listaLocal)
        if(lista.length) objeto.id = lista[lista.length-1].id+1
    } 
    lista.push(objeto)     
    localStorage.setItem("set",JSON.stringify(lista))
}

function atualizar(id, produto, quantidade) {
    const list = JSON.parse(localStorage.getItem("set"));
    const index = list.findIndex((prod) => prod.id == id);

    if(index != -1) {
        list[index] = {produto, quantidade, id};
    }

    localStorage.setItem('set', JSON.stringify(list));
} 

function deletarItem(id){
    let list = JSON.parse(localStorage.getItem('set'));
    list = list.filter(prod => prod.id != id);
    localStorage.setItem('set', JSON.stringify(list));
    carregarprodutos()
}

function buscar(){
    const element = document.getElementById('ProdutoBusca');
    let produtos = JSON.parse(localStorage.getItem('set'))
    const item = produtos.find(prod => prod.produto == element.value)

    if(item){
        let row = document.getElementById('tabela')
        row.innerHTML = ''
        let linha = ''
        linha = '<li class="list-group-item" data-id="1">'+
                    "<label id=''>"+item.produto+" - "+item.quantidade+"</label>"+
                    '<button name="id" onclick="deletarItem('+item.id+')"class="btn btn-sm btn-secondary float-right">🗑</button>'+
                    '<button name="id" onclick="editarItem('+item.id+')"class="btn btn-sm btn-info float-right">✏</button>'+
                '</li>'
        row.innerHTML = linha
    }
}

function editarItem(id){
    const formulario = document.getElementById('Formulario');
    const elements = formulario.getElementsByTagName('input');
    let produtos = JSON.parse(localStorage.getItem('set'))
    const item = produtos.find((item) => item.id == id)

    elements.id.value = item.id;
    elements.Produto.value = item.produto;
    elements.Quantidade.value = item.quantidade
}

function mostrar(id,nome,quantidade){
    let row = document.getElementById('tabela')
    let posicao = id - 1
    let linha = '<li class="list-group-item" data-id="1">'+
                    "<label id=''>"+nome+" - "+quantidade+"</label>"+
                    '<button name="id" onclick="deletarItem('+id+')"class="btn btn-sm btn-secondary float-right" value='+id+' >🗑</button>'+
                    '<button name="id" onclick="editarItem('+id+')"class="btn btn-sm btn-info float-right" value='+id+' >✏</button>'+
                '</li>'
    row.innerHTML += linha
}

function carregarprodutos() {
    const list = document.getElementsByClassName('list-group').item(0);
    const prods = localStorage.getItem('set')
    let listaProds = []
    if(prods)listaProds = JSON.parse(prods)
    list.innerHTML = '';
    listaProds.forEach((produtos) => {
        mostrar(produtos.id, produtos.produto, produtos.quantidade);
    });
} 

window.onload = carregarprodutos;