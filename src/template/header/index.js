import React from 'react';
import './styles.css';

function Header(){
    return(
        <header>
            <div id="brand">
                <p>MEGA</p>                
                <p>PokeStore</p>       
                <p><small>Sua PokeStore preferida</small></p> 
            </div>
            <div id="info">
            <p>Imperdível! Qualquer card pokémon por R$1,99 cada.</p>            
            </div>
        </header>        
    )
}

export default Header
