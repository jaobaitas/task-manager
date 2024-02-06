import React, { Component } from "react";
// Importando todas essas classes do módulo reactstrap.
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// Construir um componente de classe base
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  // Mudar o manipulador para verificar se uma caixa de seleção está marcada ou não
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  // Renderizando modal na classe CustomModal, recebendo toggle e onSave como props
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Item da Tarefa </ModalHeader>
        <ModalBody>
        
          <Form>

            {/* 3 formgroups
            1 titulo */}
            <FormGroup>
              <Label for="title">Titulo</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Inserir titulo"
              />
            </FormGroup>

            {/* 2 descrição */}
            <FormGroup>
              <Label for="description">Descrição</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Inserir descrição"
              />
            </FormGroup>

            {/* 3 completado */}
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completado
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        {/* criar rodapé */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CustomModal