import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Item } from './models/types'
import { Box, IconButton, Link } from '@mui/material'
import TableRowsIcon from '@mui/icons-material/TableRows'
import ListIcon from '@mui/icons-material/List'
import SidePanel from './Components/Features/Sidepanel/Sidepanel'
import ItemsList from './Components/Features/MainList/ItemsList'
import fetchItems from './state/Items'
import MainTable from './Components/Features/MainTable/MainTable'

function App() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [reviewMode, setReviewMode] = useState(false)
    const [nextCursor, setNextCursor] = useState<string | null>(null)
    const [items, setItems] = useState<Item[]>([])
    const [viewMode, setViewMode] = useState('list')

    const {
        data,
        isLoading,
        error,
        refetch: refetchItems,
    } = useQuery<{ orders: Item[]; next_cursor: string }>({
        queryKey: ['items'],
        queryFn: () => fetchItems(nextCursor),
    })
    useEffect(() => {
        if (!isLoading) {
            const { orders: itemsData, next_cursor: nextCursorData } =
                data || {}

            setNextCursor(nextCursorData || null)
            setItems(itemsData || [])
        }
    }, [data, isLoading])

    const handleItemClick = (item: Item, review = false) => {
        setSelectedItem(item)
        setReviewMode(review)
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    const handleNextPageClick = () => {
        // Handle next page logic
        console.log('Next page clicked', nextCursor)
        refetchItems()
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                backgroundColor: '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <IconButton
                    onClick={() =>
                        setViewMode(viewMode === 'list' ? 'table' : 'list')
                    }
                >
                    {viewMode === 'list' ? <TableRowsIcon /> : <ListIcon />}
                </IconButton>
                {viewMode === 'list' ? (
                    <ItemsList
                        items={items as Item[]}
                        handleItemClick={handleItemClick}
                    />
                ) : (
                    <MainTable items={items as Item[]} handleItemClick={handleItemClick} />
                )}
                <Link component="button" onClick={handleNextPageClick}>
                    Next page
                </Link>
            </Box>

            <SidePanel
                selectedItem={selectedItem}
                reviewMode={reviewMode}
                drawerOpen={drawerOpen}
                handleDrawerClose={handleDrawerClose}
            />
        </Box>
    )
}

export default App
