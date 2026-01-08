class TarefasRepositorio {
    constructor() {
        if (TarefasRepositorio.instancia) {
            return TarefasRepositorio.instancia;
        }
        this.tarefas = [];
        TarefasRepositorio.instancia = this;
    }

    adicionar(tarefa) {
        this.tarefas.push(tarefa);
    }

    remover(id) {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
    }

    listar() {
        return this.tarefas;
    }

    buscarPorId(id) {
        return this.tarefas.find(t => t.id === id);
    }
}

export const repositorioTarefas = new TarefasRepositorio();