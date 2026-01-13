class TarefasRepositorio {
    constructor() {
        if (TarefasRepositorio.instancia) {
            return TarefasRepositorio.instancia;
        }
        this.tarefas = [];
        this.carregarDoLocalStorage();
        TarefasRepositorio.instancia = this;
    }

    adicionar(tarefa) {
        this.tarefas.push(tarefa);
        this.salvarNoLocalStorage();
    }

    remover(id) {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
        this.salvarNoLocalStorage();
    }

    listar() {
        return this.tarefas;
    }

    buscarPorId(id) {
        return this.tarefas.find(t => t.id === id);
    }

    salvarNoLocalStorage() {
        const dados = this.tarefas.map(t => ({
            id: t.id,
            nome: t.nome,
            descricao: t.descricao,
            status: t.obterStatus()
        }));

        localStorage.setItem('tarefas', JSON.stringify(dados));
    }

    carregarDoLocalStorage() {
        const dados = JSON.parse(localStorage.getItem('tarefas')) || [];
        this.tarefas = dados;
    }
}

export const repositorioTarefas = new TarefasRepositorio();
