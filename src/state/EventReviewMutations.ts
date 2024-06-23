import { OrderReviewBody } from "../models/types";

const API_KEY = process.env.REACT_APP_API_KEY

const eventReviewMutation = async (orderId: string, eventId: string, reviewBody: OrderReviewBody) => {
    const response = await fetch(`https://staging-gradient-lattes-fdr2.encr.app/event/${orderId}/${eventId}/review`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewBody),
    });
  
    if (!response.ok) {
      throw new Error('Failed to post the review');
    }
  
    return (response ? response.json() : null) as Promise<any>;
  };
  
  export default eventReviewMutation;