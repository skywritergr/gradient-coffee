import { ItemDetails } from '../models/types';

const API_KEY = process.env.REACT_APP_API_KEY

const fetchItemDetails = async (id: string): Promise<ItemDetails> => {
    const response = await fetch(
        `https://staging-gradient-lattes-fdr2.encr.app/order/${id}/read`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
            },
        }
    )
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default fetchItemDetails