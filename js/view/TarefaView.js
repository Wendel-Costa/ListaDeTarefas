import { TarefaController } from '../controller/TarefaController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando View');

    class TarefaView {
        constructor() {

            this.form = document.getElementById('todo-form');
            this.lista = document.getElementById('lista-todos');
            this.containerLista = document.getElementById('lista-container');
            this.filtroStatus = document.getElementById('filtro-status');

            if (!this.form || !this.lista || !this.filtroStatus) {
                console.error('Elementos do DOM não encontrados');
                return;
            }

            this.controller = new TarefaController(this);

            this.renderizar();

            this.form.addEventListener('submit', e => {
                e.preventDefault();

                const nome = document.getElementById('nome').value;
                const descricao = document.getElementById('descricao').value;
                const status = document.getElementById('status').value;

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

                const statusAtual = tarefa.obterStatus();
                const statusClasse = statusAtual.toLowerCase();

                li.innerHTML = `
                    <div class="todo-info">
                        <strong>${tarefa.nome}</strong>
                        <p class="descricao">${tarefa.descricao}</p>

                        <span class="status ${statusClasse}">
                            ${statusAtual}
                        </span>

                        <select class="alterar-status">
                            <option value="Disponível" ${statusAtual === 'Disponível' ? 'selected' : ''}>Disponível</option>
                            <option value="Fazendo" ${statusAtual === 'Fazendo' ? 'selected' : ''}>Fazendo</option>
                            <option value="Feita" ${statusAtual === 'Feita' ? 'selected' : ''}>Feita</option>
                        </select>
                    </div>

                    <div class="todo-acoes">
                        <button class="btn-remover">Remover</button>
                    </div>
                `;

                li.querySelector('.btn-remover').onclick = () => {
                    this.controller.removerTarefa(tarefa.id);
                };

                li.querySelector('.alterar-status').onchange = (e) => {
                    this.controller.alterarStatus(tarefa.id, e.target.value);
                };

                this.lista.appendChild(li);
            });
        }
    }

    new TarefaView();
});