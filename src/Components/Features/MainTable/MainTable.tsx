import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { Item } from '../../../models/types'
import EventReview from '../../Reusable/EventReview'

const MainTable = ({
    items,
    handleItemClick,
}: {
    items: Item[]
    handleItemClick: (item: Item, review: boolean) => void
}) => {
    return (
        <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="items table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Summary</TableCell>
                        <TableCell>Coffee Provider</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow
                            key={item.id}
                            onClick={() => handleItemClick(item, false)}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                                backgroundColor:
                                    index % 2 === 0 ? 'white' : '#f0f0f0',
                                cursor: 'pointer',
                            }}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.summary}</TableCell>
                            <TableCell>{item.provider}</TableCell>
                            <TableCell>
                                {
                                    <EventReview
                                        onClick={(e) => {
                                            handleItemClick(item, true)
                                            e.stopPropagation()
                                        }}
                                    />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MainTable
