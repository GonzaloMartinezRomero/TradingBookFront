import Link from "next/link";

interface Props {
    url?: string;
}


export function StockChartLink(props:Props) {

    const urlNormalized = props.url ?? "not defined";

    return (<>
        <div style={{ "fontSize": "26px"}}>
            <Link href={urlNormalized} target="_blank" className="bi bi-link-45deg"></Link>
        </div>
    </>);

}