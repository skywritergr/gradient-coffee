export interface Item {
    id: string
    summary: string
    provider: string
    created: string
}

export interface Feedback {
    rating: number
    reviewText: string
}

export interface EventObject {
    id: string
    type: string
    created: string
    data: string
    reference_id: string
}

export interface ItemDetails {
    id: string
    summary: string
    provider: string
    created: string
    events: EventObject[]
}

export interface OrderReviewBody {
    outcome_score?: number
    efficiency_score?: number
    comments?: string
}