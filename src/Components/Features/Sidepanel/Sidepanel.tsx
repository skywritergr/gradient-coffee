import { Box, Drawer, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Item, ItemDetails } from '../../../models/types'
import ReviewForm from '../Reviews/ReviewForm'
import EventTable from './Events/EventTable'
import ReviewPanel from '../Reviews/ReviewPanel'
import fetchItemDetails from '../../../state/ItemDetails'
import { useQuery } from '@tanstack/react-query'

const SidePanel = ({
    selectedItem,
    reviewMode,
    drawerOpen,
    handleDrawerClose,
}: {
    selectedItem: Item | null
    reviewMode: boolean
    drawerOpen: boolean
    handleDrawerClose: () => void
}) => {
    const { data: itemDetails } = useQuery<ItemDetails>({
        queryKey: ['itemDetails', selectedItem?.id],
        queryFn: () => fetchItemDetails(selectedItem?.id || ''),
        enabled: selectedItem !== null && drawerOpen,
    })

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{ width: '600px' }}
            variant="temporary"
        >
            <Box sx={{ width: '40vw', p: 2 }}>
                <IconButton onClick={handleDrawerClose} sx={{ mb: 2 }}>
                    <CloseIcon />
                </IconButton>
                {reviewMode ? (
                    <ReviewForm
                        selectedItem={selectedItem}
                        itemDetails={itemDetails}
                        handleDrawerClose={handleDrawerClose}
                    />
                ) : (
                    <Box>
                        <Typography variant="h4">
                            {itemDetails?.summary || 'No item selected'}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Bean provider:</strong>{' '}
                            {itemDetails?.provider || 'No item selected'}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Created:</strong>{' '}
                            {new Date(
                                itemDetails?.created || ''
                            ).toLocaleString() || 'No item selected'}
                        </Typography>
                        <ReviewPanel events={itemDetails?.events || []} itemDetails={itemDetails} selectedItem={selectedItem} />
                        <Typography sx={{ mt: 2 }} variant="h6">Events in chronological order:</Typography>
                        <EventTable events={itemDetails?.events || []} orderId={selectedItem?.id || ''} />
                    </Box>
                )}
            </Box>
        </Drawer>
    )
}

export default SidePanel
