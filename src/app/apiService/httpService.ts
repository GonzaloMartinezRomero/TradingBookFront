const urlBase:string ="https://localhost:7267/";

export async function get<T>(resourceEndpoint:string):Promise<T>{

    const url:string = `${urlBase}${resourceEndpoint}`;

    const response = await fetch(url);

    if(!response.ok){
        let errorMsg:string = response.statusText;
        throw new Error(errorMsg);
    }

    const value:T = await response.json();

    return value;
}

export async function post<T>(resourceEndpoint:string, body:any|null):Promise<T>{
 
    const url:string = `${urlBase}${resourceEndpoint}`;
    const bodyParsed:string = (body==null)?"": JSON.stringify(body);

    const response = await fetch(url,{
        method:'POST',
        body: bodyParsed,
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if(!response.ok){
        let errorMsg:string = response.statusText;
        throw new Error(errorMsg);
    }

    const value:T = await response.json();

    return value;
}

export async function sendDelete(resourceEndpoint:string):Promise<boolean>{
 
    const url:string = `${urlBase}${resourceEndpoint}`;

    const response = await fetch(url,{
        method:'DELETE',
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if(!response.ok){
        let errorMsg:string = response.statusText;
        throw new Error(errorMsg);
    }

    return true;
}

export async function patch<T>(resourceEndpoint:string, body:any|null):Promise<T>{
 
    const url:string = `${urlBase}${resourceEndpoint}`;
    const bodyParsed:string = (body==null)?"": JSON.stringify(body);

    const response = await fetch(url,{
        method:'PATCH',
        body: bodyParsed,
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if(!response.ok){
        let errorMsg:string = response.statusText;
        throw new Error(errorMsg);
    }

    const value:T = await response.json();

    return value;
}