import React, { Fragment } from 'react'
import { Navbar, NavbarBrand, NavbarToggler, NavbarText } from 'reactstrap';


function NavBar() {
    return (
        <Fragment>
            <Navbar >
                <NavbarBrand href="#home">Navbar with text</NavbarBrand>
            </Navbar>
        </Fragment>
    )
}

export default NavBar
