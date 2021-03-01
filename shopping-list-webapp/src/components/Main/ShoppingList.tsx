import {ListGroup} from "react-bootstrap";
import {ShoppingItem, ShoppingItemState} from "../../store/shopping-list/types";
import {ApplicationState} from "../../store";
import {addToBasket, getShoppingItems, removeItem} from "../../store/shopping-list/actions";
import {connect} from "react-redux";
import React from "react";
import InBasketItem from "./InBasketItem";
import InListItem from "./InListItem";

class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {

    constructor(props: ShoppingListProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getShoppingItems();
    }

    render() {
        return (
            <div className="m-4">
                {this.props.shoppingList != null && this.props.shoppingList.data.length > 0
                    ? (
                        <div>
                            <ListGroup variant="flush">
                                {this.props.shoppingList.data
                                    .filter((item: ShoppingItem) => {
                                        return !item.inBasket
                                    })
                                    .map((item: ShoppingItem) => {
                                        return (
                                            <InListItem itemValue={item.name ?? ''}
                                                        itemId={item.id}
                                                        key={item.id}
                                                        onAddItemToBasket={() => {
                                                            // add item to basket
                                                            this.props.addToBasket({
                                                                id: item.id,
                                                                inBasket: true,
                                                                name: item.name
                                                            });
                                                        }}
                                                        onRemoveItem={() => {
                                                            this.props.removeItem({
                                                                id: item.id
                                                            })
                                                        }}
                                            />
                                        );
                                    })}
                            </ListGroup>

                            <div style={{marginTop: 10}}>
                                <h3>Basket: </h3>
                            </div>
                            <ListGroup variant="flush">
                                {this.props.shoppingList.data
                                    .filter((item: ShoppingItem) => {
                                        return item.inBasket
                                    }).length > 0
                                    ? this.props.shoppingList.data
                                        .filter((item: ShoppingItem) => {
                                            return item.inBasket
                                        })
                                        .map((item: ShoppingItem) => {
                                            return (
                                                <InBasketItem itemId={item.id}
                                                              itemName={item.name ?? ''}
                                                              key={item.id}
                                                              onRemoveItem={() => {
                                                                  // remove item
                                                                  this.props.removeItem(item);
                                                              }}/>
                                            )
                                        })
                                    : (
                                        <div>
                                            <ListGroup.Item style={{maxWidth: '70%'}}>Empty basket</ListGroup.Item>
                                        </div>
                                    )}
                            </ListGroup>
                        </div>
                    ) : (<div/>)}


            </div>
        );
    }
}

interface ShoppingListProps {
    shoppingList: ShoppingItemState,
    addToBasket: (a: ShoppingItem) => void,
    removeItem: (a: ShoppingItem) => void,
    getShoppingItems: () => void;
}

interface ShoppingListState {

}

const mapStateToProps = (state: ApplicationState) => ({
    shoppingList: state.shoppingList,
});

const mapDispatchToProps = {
    addToBasket,
    removeItem,
    getShoppingItems
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);