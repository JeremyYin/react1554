

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
    
    
    
    
    class Child extends Component {
        constructor(props){
            super(props)
        }
            
        render(){
            return (
                <div>this is a component.</div>
            )
        }
    }



ReactDOM.render(
    <Child />,
    document.querySelector('#container')
)