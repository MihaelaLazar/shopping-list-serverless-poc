import React from "react";
import {ApplicationState} from "../../store";
import {addToBasket, addToList, clearItems, removeItem} from "../../store/shopping-list/actions";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {ShoppingItem} from "../../store/shopping-list/types";
import { v4 as uuidv4 } from 'uuid';

class AddItem extends React.Component<AddItemProps, AddItemState> {

    constructor(props: AddItemProps) {
        super(props);

        this.state = {
            itemNameToAdd: ""
        };
    }

    render() {
        return (
            <div className="m-4">
                <input
                    className="input"
                    placeholder="Add item..."
                    value={this.state.itemNameToAdd}
                    onChange={(event) => {
                        this.setState({itemNameToAdd: event.target.value})
                    }}
                />
                <Button className="button" variant="outline-dark"
                        onClick={() => {
                            this.props.addToList({
                                inBasket: false,
                                id: uuidv4(),
                                name: this.state.itemNameToAdd
                            });
                            this.setState({itemNameToAdd: ""})
                        }}>
                    Add
                </Button>
                <Button className="button" variant="outline-dark"
                        onClick={() => {
                            this.props.clearItems();
                        }}>
                    Clear
                </Button>
            </div>
        );
    }
}

interface AddItemProps {
    addToList: (a: ShoppingItem) => void,
    clearItems: () => void;
}

interface AddItemState {
    itemNameToAdd: string;
}

const mapStateToProps = (state: ApplicationState) => ({
    shoppingList: state.shoppingList,
});

const mapDispatchToProps = {
    addToBasket,
    removeItem,
    addToList,
    clearItems
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);