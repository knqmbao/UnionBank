import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function DataGrids({columnsTest, rowsTest}) {
    return (
        <DataGrid
            rows={rowsTest}
            columns={columnsTest}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[5, 10, 25]}
            // checkboxSelection
            disableRowSelectionOnClick
        />
    )
}
