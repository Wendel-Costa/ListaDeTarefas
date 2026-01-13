import { repositorioTarefas } from '../model/TarefasRepositorio.js';
import { Tarefa } from '../model/Tarefa.js';
import { StatusDisponivel } from '../model/status/StatusDisponivel.js';
import { StatusFazendo } from '../model/status/StatusFazendo.js';
import { StatusFeita } from '../model/status/StatusFeita.js';

export class TarefaController {
    constructor(view) {
        this.view = view;
        this.idAtual = 1;
        this.reconstruirTarefas();
    }

    reconstruirTarefas() {
        const tarefasSalvas = repositorioTarefas.listar();

        repositorioTarefas.tarefas = tarefasSalvas.map(t => {
            const status = this.criarStatus(t.status);
            this.idAtual = Math.max(this.idAtual, t.id + 1);
            return new Tarefa(t.id, t.nome, t.descricao, status);
        });
    }

    criarTarefa(nome, descricao, statusTexto) {
        const status = this.criarStatus(statusTexto);
        const tarefa = new Tarefa(this.idAtual++, nome, descricao, status);
        repositorioTarefas.adicionar(tarefa);
        this.view.renderizar();
    }

    removerTarefa(id) {
        repositorioTarefas.remover(id);
        this.view.renderizar();
    }

    listarTarefas() {
        return repositorioTarefas.listar();
    }

    criarStatus(texto) {
        switch (texto) {
            case 'Fazendo': return new StatusFazendo();
            case 'Feita': return new StatusFeita();
            default: return new StatusDisponivel();
        }
    }

    alterarStatus(id, novoStatusTexto) {
        const tarefa = repositorioTarefas.buscarPorId(id);
        if (!tarefa) return;

        const novoStatus = this.criarStatus(novoStatusTexto);
        tarefa.alterarStatus(novoStatus);

        repositorioTarefas.salvarNoLocalStorage();
        this.view.renderizar();
    }
}
