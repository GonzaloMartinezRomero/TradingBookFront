import { useState } from "react";

export interface Props{
    title:string,
    children:React.ReactNode
}

export function CollapsableContainer(prop:Props){

    const [isCollapse,setIsCollapse] = useState(false);

    return (<>
        <h2 className="mt-4">{prop.title}        
            <button className="ms-3 btn btn-light" onClick={()=>{setIsCollapse(!isCollapse)}}>
                {isCollapse && <i className="bi bi-arrow-down"></i>}
                {!isCollapse && <i className="bi bi-arrow-up"></i>}
            </button>
        </h2>
        <div className="row" style={{"border":"1px solid black"}}/>
        {!isCollapse && prop.children}
    </>);  
}