export class Tarefa {
    constructor(id, nome, descricao, status) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
    }

    alterarStatus(novoStatus) {
        this.status = novoStatus;
    }

    obterStatus() {
        return this.status.getStatus();
    }
}
