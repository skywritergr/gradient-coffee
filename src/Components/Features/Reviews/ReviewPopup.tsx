import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ReviewForm from './ReviewForm'
import { Item, ItemDetails } from '../../../models/types'

const ReviewPopup = ({
    isOpen,
    selectedItem,
    itemDetails,
    handleClose,
}: {
    isOpen: boolean
    selectedItem: Item | null
    itemDetails: ItemDetails | undefined
    handleClose: () => void
}) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                keepMounted
            >
                <DialogTitle>
                    Add a Review
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ReviewForm
                        handleDrawerClose={handleClose}
                        selectedItem={selectedItem}
                        itemDetails={itemDetails}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReviewPopup
