import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {IconContext} from "react-icons"

import {MdClear} from "react-icons/md"

class InBasketItem extends React.Component<InBasketItemProps, InBasketItemState> {

    constructor(props: InBasketItemProps) {
        super(props);
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", maxWidth: '25%'}}>
                <ListGroup.Item
                    style={{flex: 1, marginRight: 10}}
                    key={this.props.itemId}>
                    {this.props.itemName}
                </ListGroup.Item>
                <IconContext.Provider value={{ style: {fontSize: '50px'}}}>
                    <div>
                        <MdClear onClick={() => {this.props.onRemoveItem(this.props.itemId)}}/>
                    </div>
                </IconContext.Provider>
            </div>
        );
    }
}

interface InBasketItemProps {
    itemId: string;
    itemName: string;
    onRemoveItem: (id: string) => void;
}

interface InBasketItemState {

}

export default InBasketItem;