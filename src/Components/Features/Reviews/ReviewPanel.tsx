import { Box, Typography, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { EventDataToReviewObject } from '../../../models/mappings'
import { EventObject, Item, ItemDetails } from '../../../models/types'
import StarReview from '../../Reusable/StarReview'
import EventReview from '../../Reusable/EventReview'
import ReviewPopup from './ReviewPopup'

const ReviewPanel = ({
    events,
    boxTitle,
    selectedItem,
    itemDetails,
    hideActions = false,
}: {
    events: EventObject[]
    boxTitle?: string | undefined
    selectedItem: Item | null
    itemDetails: ItemDetails | undefined
    hideActions?: boolean
}) => {
    const [reviewsObj, setReviewsObj] = useState<{
        orderReviews?: any[]
        customerReviews?: any[]
    } | null>(null)
    const [hasReviews, setHasReviews] = useState(false)
    const [hasBothReviews, setHasBothReviews] = useState(false)
    const [reviewPopupOpen, setReviewPopupOpen] = useState(false)

    useEffect(() => {
        setReviewsObj(EventDataToReviewObject(events))
    }, [events, itemDetails])

    useEffect(() => {
        setHasReviews(
            (reviewsObj?.orderReviews || []).length > 0 ||
                (reviewsObj?.customerReviews || []).length > 0
        )
        setHasBothReviews(
            (reviewsObj?.orderReviews || []).length > 0 &&
                (reviewsObj?.customerReviews || []).length > 0
        )
    }, [reviewsObj, itemDetails])

    return (
        <Box sx={{ width: '100%' }}>
            {!hideActions && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ mt: 2 }} variant="h6">
                        {boxTitle || 'Order Reviews'}
                    </Typography>
                    <EventReview onClick={() => setReviewPopupOpen(true)} />
                    <ReviewPopup
                        isOpen={reviewPopupOpen}
                        handleClose={() => setReviewPopupOpen(false)}
                        itemDetails={itemDetails}
                        selectedItem={selectedItem}
                    />
                </Box>
            )}
            {hasReviews ? (
                <Box sx={{ m: 2, maxHeight: '300px', overflowY: 'auto' }}>
                    {(reviewsObj?.orderReviews || []).map((review, index) => (
                        <Box key={index}>
                            {index > 0 && <Divider sx={{ my: 2 }} />}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <Typography key={review.id} variant="body1">
                                    Efficiency Score:
                                </Typography>
                                <StarReview
                                    rating={review.efficiency_score as number}
                                    onRatingChange={() => {}}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <Typography key={review.id} variant="body1">
                                    Outcome Score:
                                </Typography>
                                <StarReview
                                    rating={review.outcome_score as number}
                                    onRatingChange={() => {}}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <Typography key={review.id} variant="body1">
                                    Comments: {review.comments}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    {hasBothReviews && <Divider sx={{ my: 2 }} />}
                    {(reviewsObj?.customerReviews || []).map(
                        (review, index) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                }}
                                key={index}
                            >
                                <Typography key={review.id} variant="body1">
                                    Customer Review Score:
                                </Typography>
                                <StarReview
                                    rating={review.num_stars as number}
                                    onRatingChange={() => {}}
                                />
                            </Box>
                        )
                    )}
                </Box>
            ) : (
                <Typography sx={{ mt: 2 }} variant="body1">
                    No reviews
                </Typography>
            )}
        </Box>
    )
}

export default ReviewPanel
