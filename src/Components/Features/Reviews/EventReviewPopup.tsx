import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    TextField,
    Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import StarReview from '../../Reusable/StarReview'
import { useState } from 'react'
import { EventObject } from '../../../models/types'
import queryClient from '../../../state/QueryClient'
import { useMutation } from '@tanstack/react-query'
import eventReviewMutation from '../../../state/EventReviewMutations'

const EventReviewPopup = ({
    isOpen,
    event,
    orderId,
    handleClose,
}: {
    isOpen: boolean
    event: EventObject | null
    orderId: string
    handleClose: () => void
}) => {
    const [formData, setFormData] = useState({
        score: 0,
        comments: '',
    })

    const mutation = useMutation({
        mutationFn: () =>
            eventReviewMutation(orderId, event?.id || '', formData),
        mutationKey: ['orderReview', orderId, event?.id || ''],
        onSuccess: (data: any) => {
            console.log('Event created successfully:', data)
            setFormData({
                score: 0,
                comments: '',
            })
            // @ts-ignore
            queryClient.invalidateQueries(['itemDetails'])
            handleClose()
        },
        onError: (error: any) => {
            console.error('Error creating event:', error)
            // @ts-ignore
            queryClient.invalidateQueries(['itemDetails'])
            handleClose()
        },
    })

    const handleChange = (e: { name: string; value: number | string }) => {
        const { name, value } = e
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate()
    }

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
                    Add a Review for the Event
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
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        <Typography variant="body1">Outcome Score</Typography>
                        <StarReview
                            rating={formData.score || 0}
                            onRatingChange={(rating) =>
                                handleChange({
                                    name: 'score',
                                    value: rating,
                                })
                            }
                        />
                        <TextField
                            label="Review"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.comments}
                            onChange={(e) =>
                                handleChange({
                                    name: 'comments',
                                    value: e.target.value,
                                })
                            }
                            sx={{ mt: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EventReviewPopup
