import { Box, Paper, Typography, Link } from '@mui/material'
import EventReview from '../../Reusable/EventReview'
import { Item } from '../../../models/types'

const ItemCard = ({
    item,
    handleItemClick,
}: {
    item: Item
    handleItemClick: (item: Item, review: boolean) => void
}) => {
    return (
        <Paper
            key={item.id}
            sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                position: 'relative',
            }}
        >
            <Typography variant="h6">{item.summary}</Typography>
            <Typography sx={{ mb: 2 }} variant="body2">
                <strong>Bean provider:</strong> {item.provider}
            </Typography>
            <Box
                sx={{
                    position: 'absolute',
                    right: 16,
                    bottom: 8,
                }}
            >
                <EventReview onClick={() => handleItemClick(item, true)} />
            </Box>
            <Link
                component="button"
                variant="body2"
                onClick={() => handleItemClick(item, false)}
            >
                View Details
            </Link>
        </Paper>
    )
}

export default ItemCard
