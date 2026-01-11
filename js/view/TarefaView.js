import { TarefaController } from '../controller/TarefaController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando View');

    class TarefaView {
        constructor() {
            this.controller = new TarefaController(this);

            this.form = document.getElementById('todo-form');
            this.lista = document.getElementById('lista-todos');
            this.containerLista = document.getElementById('lista-container');
            this.filtroStatus = document.getElementById('filtro-status');

            if (!this.form || !this.lista) {
                console.error('Elementos do DOM não encontrados');
                return;
            }

            this.form.addEventListener('submit', e => {
                e.preventDefault();

                const nome = document.getElementById('nome').value;
                const descricao = document.getElementById('descricao').value;
                const status = document.getElementById('status').value;

                console.log('Criando tarefa:', nome, descricao, status);

                this.controller.criarTarefa(nome, descricao, status);
                this.form.reset();
            });

            this.filtroStatus.addEventListener('change', () => {
                this.renderizar();
            });
        }

        renderizar() {
            const filtro = this.filtroStatus.value;
            const tarefas = this.controller.listarTarefas();

            console.log('Renderizando tarefas:', tarefas);

            this.lista.innerHTML = '';

            const filtradas = tarefas.filter(tarefa => {
                if (filtro === 'Todos') return true;
                return tarefa.obterStatus() === filtro;
            });

            this.containerLista.style.display =
                filtradas.length > 0 ? 'block' : 'none';

            filtradas.forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('todo-item');

                const status = tarefa.obterStatus().toLowerCase();

                li.innerHTML = `
        <div class="todo-info">
            <strong>${tarefa.nome}</strong>
            <span>${tarefa.descricao}</span>
            <span class="status ${status}">${tarefa.obterStatus()}</span>
        </div>

        <div class="todo-acoes">
            <button class="btn-remover">Remover</button>
        </div>
    `;

                li.querySelector('button').onclick = () => {
                    this.controller.removerTarefa(tarefa.id);
                };

                this.lista.appendChild(li);
            });
        }
    }

    new TarefaView();
});