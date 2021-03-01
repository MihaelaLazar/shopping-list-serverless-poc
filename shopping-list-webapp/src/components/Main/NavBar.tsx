import {Navbar} from "react-bootstrap";
import React from "react";

class NavBar extends React.Component<any, any> {

    render() {
        return (
            <Navbar bg="danger" expand="sm">
                <Navbar.Brand>Shopping list</Navbar.Brand>
            </Navbar>
        );
    }

}

export default NavBar;