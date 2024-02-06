import React, { Component } from 'react'
import Modal from './components/Modal';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      taskList: []
    };
  }

  //Adicionar componentDidMount
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios  //Axios para mandar e receber HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.State({ taskList: res.data }))
      .catch(err => console.log(err))
  };


  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false })
  };


  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
          >
          Completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
          >
          Incompleted
        </span>
      </div>
    );
  };


  // Renderizar itens na lista completos ou incompletos
renderItems = () => {
  const { viewCompleted } = this.state;
  const newItems = this.state.taskList.filter(
    item => item.completed == viewCompleted
  );
return newItems.map(item => (
  <li 
    key={item.id}
    className="list-group-item d-flex justify-content-between align-items-center"
    >
     
    <span 
    className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
    title={item.description}
    >
      {item.title}
    </span>
    <span>
      <button
      onClick={() => this.editItem(item)}
      className='btn btn-info mr-2'
      >
        Editar
        </button>
      <button 
      onClick={() => this.handleDelete(item)}
      className='btn btn-danger mr-2'
      >
        Deletar
        </button>
    </span>
  </li>
))
};


  // Criar propriedade toggle
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };


  handleSubmit = item => {
    this.toggle()
    if (item.id) {
      // se post antigo, editar e enviar
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList())
      return;
    }
    //se post novo, enviar
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList())
  };

  // Deletar item
  handleDelete = item => {
    axios
        .delete(`http://localhost:8000/api/tasks/${item.id}/`)
        .then(res => this.refreshList())
  }

  // Criar item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal});
  };

  //Editar item
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

// Efeitos visuais para o usuario
  render() {
    return (
      <main className='content p-3 mb-2 bg-info'>
        <h1 className='text-white text-uppercase text-center my-4'>Task Manager</h1>
        <div className='row'>
          <div className='col-md-6 col-sma-10 mx-auto p-0'>
            <div className='card p-3'>
              <div>
                <button onClick={this.createItem} className='btn btn-warning'>Adicionar Tarefa</button>
              </div>
              {this.renderTabList()}
              <ul className='list-group list-group-flush'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className='my-5 mb-2 bg-info text-white text-center'>Copyright 2024 &copy; Todos os Direitos Reservados</footer>
        {this.state.modal ? (
          <Modal 
          activeItem={this.state.activeItem} 
          toggle={this.toggle} 
          onSave={this.handleSubmit} 
          />
        ) : null}
      </main>
    )
  }


}

export default App;
