import React from 'react'
import { Popup} from "semantic-ui-react"

function KikiPropup({content , children}) {
 
    return <Popup inverted  content = {content} trigger={children}/>;
    
}

export default KikiPropup
