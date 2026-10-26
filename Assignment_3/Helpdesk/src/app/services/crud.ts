import { inject, Service } from '@angular/core';
import { TicketInfo, TicketResponse } from '../ticket';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Service()
export class Crud {
    private readonly baseUrl = 'http://localhost:3000/api/tickets';

    private http = inject(HttpClient);

    getTickets(): Observable<TicketInfo[]> {
        return this.http.get<TicketInfo[]>(this.baseUrl).pipe(map((response: TicketInfo[]) => response));
    }


    getTicketsById(id: string): Observable<TicketInfo> {
        return this.http.get<TicketInfo>(`${this.baseUrl}/${id}`);
    }


    updateTicket(ticketId: string, updatedTicket: Partial<TicketInfo>): Observable<TicketInfo> {
        const url = `${this.baseUrl}/${ticketId}`;
        return this.http.put<TicketInfo>(url, updatedTicket).pipe(map((response: TicketInfo) => response));
    }

    deleteTicket(ticketId: string): Observable<TicketResponse> {
        const url = `${this.baseUrl}/${ticketId}`;
        return this.http.delete<TicketResponse>(url).pipe(map((response: TicketResponse) => response));
    }

    createTicket(ticket: TicketInfo): Observable<TicketResponse> {
        const url = `${this.baseUrl}/create`;
        return this.http.post<TicketResponse>(url, ticket).pipe(map((response: TicketResponse) => response));
    }

}
