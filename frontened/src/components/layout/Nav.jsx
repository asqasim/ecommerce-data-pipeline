import { Link, NavLink } from "react-router-dom"

export default function Nav(){
    return(
        <nav style={{display:'flex',gap:'12px',backgroundColor:'red'}}>
            <NavLink href="#">home</NavLink>
            <NavLink href="#">home</NavLink>
            <NavLink href="#">home</NavLink>
        </nav>
    )
}