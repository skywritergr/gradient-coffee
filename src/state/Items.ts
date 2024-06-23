import { Item } from '../models/types';

const API_KEY = process.env.REACT_APP_API_KEY

const fetchItems = async (next_cursor: string | null): Promise<{orders: Item[], next_cursor: string}> => {
    const cursor = next_cursor ? `?cursor=${next_cursor}` : ''
    const response = await fetch(
        `https://staging-gradient-lattes-fdr2.encr.app/orders${cursor}`,
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

export default fetchItems