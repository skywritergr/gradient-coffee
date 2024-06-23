import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'

interface EventReviewProps {
    onClick: (e?: any) => void
}

const EventReview: React.FC<EventReviewProps> = ({ onClick }) => {
    return (
        <Tooltip title="Leave us a review!" arrow>
            <IconButton onClick={onClick}>
                <ChatIcon />
            </IconButton>
        </Tooltip>
    )
}

export default EventReview
