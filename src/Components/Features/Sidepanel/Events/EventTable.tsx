import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
    Box,
    Tooltip,
    Typography,
} from '@mui/material'
import { EventObject } from '../../../../models/types'
import {
    EventToTitle,
    EventDataRetrievalFunction,
    EventDataToEventReviewObject,
} from '../../../../models/mappings'
import { useState } from 'react'
import EventReviewPopup from '../../Reviews/EventReviewPopup'

const EventTable = ({
    events,
    orderId,
}: {
    events: EventObject[]
    orderId: string
}) => {
    const [reviewEventPopupOpen, setReviewEventPopupOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<EventObject | null>(null)
    const handleEventReviewPopupOpen = () => {
        setReviewEventPopupOpen(true)
    }
    const handleEventReviewPopuipClose = () => {
        setReviewEventPopupOpen(false)
    }
    const eventReviewDataObject = EventDataToEventReviewObject(events)
    return (
        <Box>
            <EventReviewPopup
                isOpen={reviewEventPopupOpen}
                event={selectedEvent}
                orderId={orderId}
                handleClose={handleEventReviewPopuipClose}
            />
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="events table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Event Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events
                            .sort(
                                (a, b) =>
                                    new Date(a.created).getTime() -
                                    new Date(b.created).getTime()
                            )
                            .map((event) => {
                                // Skip customer review and review events
                                // We display those separately
                                if (
                                    event.type === 'customer.review' ||
                                    event.type === 'review.order' ||
                                    event.type === 'review.event'
                                ) {
                                    return null
                                }
                                return (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                            {EventToTitle(event)}
                                        </TableCell>
                                        <TableCell>
                                            {EventDataRetrievalFunction(
                                                event
                                            )()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                event.created
                                            ).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {eventReviewDataObject[event.id]
                                                ?.score !== undefined ? (
                                                    <Box>
                                                        <Typography>
                                                            {'Score: ' +
                                                            eventReviewDataObject[event.id]
                                                                ?.score}
                                                        </Typography>
                                                        <Typography>
                                                            Comments: 
                                                            {eventReviewDataObject[event.id]
                                                                ?.comments || 'No comments left'}
                                                        </Typography>
                                                    </Box>
                                            ) : (
                                                <Tooltip
                                                    title="Leave us a review!"
                                                    arrow
                                                >
                                                    <Link
                                                        component="button"
                                                        variant="body2"
                                                        onClick={() => {
                                                            handleEventReviewPopupOpen()
                                                            setSelectedEvent(event)}
                                                        }
                                                    >
                                                        No Review
                                                    </Link>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default EventTable
