const urlBase = process.env.TRADING_BOOK_API_ENDPOINT;

export async function get<T>(resourceEndpoint:string):Promise<T>{

    const url:string = `${urlBase}${resourceEndpoint}`;

    const response = await fetch(url,
        {
            headers:
            {
              'Host':'10.0.2.5'    
            }
        }
    );

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

export async function remove(resourceEndpoint:string):Promise<boolean>{
 
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