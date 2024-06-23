import { Box, Typography, Button, TextField, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import StarReview from '../../Reusable/StarReview'
import { Item, ItemDetails, OrderReviewBody } from '../../../models/types'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import orderReviewMutation from '../../../state/OrderReviewMutation'
import queryClient from '../../../state/QueryClient'
import { EventDataToReviewObject } from '../../../models/mappings'
import ReviewPanel from './ReviewPanel'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ReviewForm = ({
    selectedItem,
    itemDetails,
    handleDrawerClose,
}: {
    selectedItem: Item | null
    itemDetails: ItemDetails | undefined,
    handleDrawerClose: () => void
}) => {
    useEffect(() => {
        if (itemDetails) {
            const reviewsObj = EventDataToReviewObject(itemDetails.events)
            const orderReviewsObject =
                reviewsObj.orderReviews as OrderReviewBody[]
            setHasReviews(orderReviewsObject.length > 0)
        }
    }, [itemDetails])

    const [formData, setFormData] = useState<OrderReviewBody>({
        outcome_score: 0,
        efficiency_score: 0,
        comments: '',
    })
    const [hasReviews, setHasReviews] = useState(false)

    const mutation = useMutation<OrderReviewBody>({
        mutationFn: () => orderReviewMutation(selectedItem?.id || '', formData),
        mutationKey: ['orderReview', selectedItem?.id],
        onSuccess: (data: any) => {
            console.log('Event created successfully:', data)
            setFormData({
                outcome_score: 0,
                efficiency_score: 0,
                comments: '',
            })
            // @ts-ignore
            queryClient.invalidateQueries('itemDetails')
            handleDrawerClose()
        },
        onError: (error: any) => {
            console.error('Error creating event:', error)
            // @ts-ignore
            queryClient.invalidateQueries('itemDetails')
            handleDrawerClose()
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
        <Box>
            <Typography variant="h4">{selectedItem?.summary}</Typography>
            <Typography variant="body1">{selectedItem?.provider}</Typography>
            <Typography sx={{ mt: 2 }} variant="h5">
                Leave us a review!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Typography variant="body1">Outcome Score</Typography>
                <StarReview
                    rating={formData.outcome_score || 0}
                    onRatingChange={(rating) =>
                        handleChange({
                            name: 'outcome_score',
                            value: rating,
                        })
                    }
                />
                <Typography variant="body1">Efficiency Score</Typography>
                <StarReview
                    rating={formData.efficiency_score || 0}
                    onRatingChange={(rating) =>
                        handleChange({
                            name: 'efficiency_score',
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
                {hasReviews && (
                    <Box sx={{ mt: 2 }}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel-content"
                                id="panel-header"
                            >
                                <Typography variant="h6">
                                    Existing Reviews
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ p: 2 }}>
                                    <ReviewPanel
                                        events={itemDetails?.events || []}
                                        selectedItem={selectedItem}
                                        itemDetails={itemDetails}
                                        boxTitle=" "
                                        hideActions
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                    </Box>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    )
}

export default ReviewForm
