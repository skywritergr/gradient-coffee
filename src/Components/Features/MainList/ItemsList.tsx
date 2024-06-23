import ItemCard from './ItemCard'
import { Item } from '../../../models/types'
import { Box } from '@mui/material'

const ItemsList = ({
    items,
    handleItemClick,
}: {
    items: Item[],
    handleItemClick: (item: Item, review: boolean) => void
}) => {
    return (
        <Box sx={{ width: '600px', height: '70vh', overflowY: 'scroll', p: 2 }}>
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    handleItemClick={handleItemClick}
                />
            ))}
        </Box>
    )
}

export default ItemsList
