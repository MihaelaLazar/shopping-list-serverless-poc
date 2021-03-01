import React from "react";
import {Button, ListGroup} from "react-bootstrap";
import {MdClear, MdShoppingBasket} from "react-icons/md";
import {IconContext} from "react-icons";

class InListItem extends React.Component<InListItemProps, InListItemState> {

    constructor(props: InListItemProps) {
        super(props);
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", maxWidth: '25%'}}>
                <ListGroup.Item
                    style={{flex: 1, marginRight: 10}}
                    key={this.props.itemId}
                    // variant="danger"
                >
                    {this.props.itemValue}
                </ListGroup.Item>
                <IconContext.Provider value={{ style: {fontSize: '50px'}}}>
                    <div>
                        <MdShoppingBasket onClick={() => {this.props.onAddItemToBasket(this.props.itemId)}}/>
                    </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ style: {fontSize: '50px'}}}>
                    <div>
                        <MdClear onClick={() => {this.props.onRemoveItem(this.props.itemId)}}/>
                    </div>
                </IconContext.Provider>
            </div>
        );
    }
}

interface InListItemProps {
    itemId: string;
    itemValue: string;
    onAddItemToBasket: (itemIndex: string) => void;
    onRemoveItem: (itemIndex: string) => void;
}

interface InListItemState {

}

export default InListItem;