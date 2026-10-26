export interface TicketInfo {
    _id: string;
    ticketId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface TicketResponse {
    success: boolean;
}