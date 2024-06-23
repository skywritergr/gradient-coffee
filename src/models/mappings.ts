import { EventObject, OrderReviewBody } from './types'

export const EventToTitle = (event: EventObject): string => {
    switch (event.type) {
        case 'barista.selected':
            return 'Barista selected'
        case 'beans.order':
            return 'Beans ordered'
        case 'beans.order-rejected':
            return 'Beans order rejected'
        case 'coffee.start':
            return 'Coffee started'
        case 'coffee.grind':
            return 'Coffee grinded'
        case 'coffee.brew':
            return 'Coffee brewed'
        case 'milk.retrieve':
            return 'Milk retrieved'
        case 'milk.froth':
            return 'Milk frothed'
        case 'milk.restock':
            return 'Milk restocked'
        case 'coffee.pour':
            return 'Coffee poured'
        case 'coffee.finish':
            return 'Coffee finished'
        case 'coffee.stir':
            return 'Coffee stirred'
        case 'order.deliver':
            return 'Order delivered'
        case 'customer.review':
            return 'Customer review'
        case 'review.order':
            return 'Order reviewed'
        default:
            return 'Unknown event'
    }
}

export const EventDataRetrievalFunction = (event: EventObject) => {
    const eventDataObject = typeof event.data === 'string' ? JSON.parse(event.data) : event.data

    switch (event.type) {
        case 'barista.selected':
            return () => eventDataObject.barista_id
        case 'beans.order-rejected':
        case 'beans.order':
            return () => eventDataObject.provider
        case 'coffee.start':
            return () => eventDataObject.coffee_type
        case 'coffee.grind':
        case 'coffee.brew':
        case 'milk.retrieve':
        case 'milk.froth':
        case 'coffee.pour':
        case 'coffee.stir':
        case 'coffee.finish':
            return () => eventDataObject.coffee_id
        case 'milk.restock':
        case 'order.deliver':
            return () => {
                const objectKey = Object.keys(eventDataObject)[0]
                return `${eventDataObject[objectKey]} ${objectKey}`
            }
        case 'customer.review':
            return () => eventDataObject.num_stars
        case 'review.order':
            return () => eventDataObject
        default:
            return () => 'Unknown event'
    }
}

export const EventDataToReviewObject = (events: EventObject[]): { customerReviews: any[]; orderReviews: any[] } => {
    const reviewsObj: { customerReviews: any[]; orderReviews: any[] } = {
        customerReviews: [],
        orderReviews: [],
    };

    reviewsObj.orderReviews = events.filter((event) => event.type === 'review.order').map((event: any) => {
        const eventDataObject: OrderReviewBody = typeof event.data === 'string' ? JSON.parse(event.data) : event.data

        return eventDataObject;
    });

    reviewsObj.customerReviews = events.filter((event) => event.type === 'customer.review').map((event: any) => {
        const eventDataObject = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        return eventDataObject
    });

    return reviewsObj;
}

export const EventDataToEventReviewObject = (events: EventObject[]) => {
    return events.filter((event) => event.type === 'review.event').reduce((acc: any, event: any) => {
        const eventDataObject = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        acc[event.reference_id] = eventDataObject
        return acc
    }, {})
}