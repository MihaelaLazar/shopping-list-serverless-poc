import React from "react";
import ShoppingList from "./Main/ShoppingList";
import AddItem from "./Main/AddItem";
import Header from "./Main/Header";

export default function Main() {
    return (
        <div>
            <Header />
            <AddItem />
            <ShoppingList />
        </div>
    );

}
