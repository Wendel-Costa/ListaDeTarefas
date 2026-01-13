#  Projeto Lista de Tarefas

Este projeto consiste em uma aplicação de lista de tarefas desenvolvida em **JavaScript**, utilizando uma arquitetura organizada em **Model, View e Controller (MVC)** e aplicando **padrões de projeto** para melhorar a manutenção, extensibilidade e organização do código.

---

##  Padrões de Projeto Utilizados

Neste projeto foram aplicados os seguintes padrões de projeto:

* **Strategy**
* **Singleton**

Esses padrões foram utilizados principalmente nos módulos de **Status da Tarefa** e **Repositório de Tarefas**.

---

##  Padrão Strategy

###  O que é o Strategy?

O padrão **Strategy** permite definir uma família de algoritmos, encapsulá-los em classes separadas e torná-los intercambiáveis em tempo de execução. Ele possibilita que o comportamento de um objeto varie sem que seja necessário modificar sua classe principal.

---

###  Onde foi utilizado?

O padrão **Strategy** foi aplicado no **gerenciamento de status das tarefas**, localizado no diretório:

```
js/model/status/
```

Arquivos envolvidos:

* `StatusBase.js`
* `StatusDisponivel.js`
* `StatusFazendo.js`
* `StatusFeita.js`

---

###  Como foi aplicado?

* A classe `StatusBase` define a interface comum para todos os tipos de status.
* Cada status concreto (`Disponível`, `Fazendo`, `Feita`) é representado por uma classe específica que implementa essa interface.
* A classe `Tarefa` utiliza um objeto de status para representar seu estado atual, podendo trocar esse comportamento dinamicamente.

 **Benefícios**:

* Facilidade para adicionar novos status
* Redução de condicionais (`if/else`)
* Código mais flexível e extensível

---

##  Padrão Singleton

###  O que é o Singleton?

O padrão **Singleton** garante que uma classe possua **apenas uma única instância**, fornecendo um ponto global de acesso a ela.

---

###  Onde foi utilizado?

O padrão **Singleton** foi aplicado no **repositório de tarefas**, localizado em:

```
js/model/TarefasRepositorio.js
```

---

###  Como foi aplicado?

* A classe `TarefasRepositorio` controla a criação da sua instância.
* Caso uma instância já exista, ela é reutilizada.
* O repositório é exportado como uma instância única, garantindo consistência dos dados.

 **Benefícios**:

* Evita duplicação de dados
* Centraliza o controle das tarefas
* Garante estado único da aplicação

---

##  Arquitetura do Projeto

O projeto segue uma arquitetura baseada no padrão **MVC (Model-View-Controller)**:

* **Model**: regras de negócio, tarefas, status e repositório
* **View**: interface gráfica e interação com o usuário
* **Controller**: comunicação entre Model e View

Essa separação melhora a organização, manutenção e escalabilidade do sistema.

---

##  Autores

Este projeto foi desenvolvido por:

* **Erika Beatriz Martins Sousa**
  
* **Wendel Davi Reis Costa**

> Projeto desenvolvido com fins acadêmicos, como atividade relacionada ao estudo de **Padrões de Projeto** e **Engenharia de Software**.

---
