import { SummaryDto } from "../domain/summary/summary.model";
import { get } from "./http-client.service";


export function getSummary(): Promise<SummaryDto> {

    return get<SummaryDto>("Summary");
}
