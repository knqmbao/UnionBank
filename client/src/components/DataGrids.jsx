import React from 'react'
import { DataGrid, gridClasses } from '@mui/x-data-grid'

export default function DataGrids({ columnsTest, rowsTest, descCol, colVisibility }) {
    return (
        <DataGrid
            rows={rowsTest}
            columns={columnsTest}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 25,
                    },
                },
                sorting: {
                    sortModel: [{ field: descCol, sort: 'desc' }],
                },
            }}
            getRowHeight={() => 'auto'}
            sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 2,
                },
              }}
            columnVisibilityModel={colVisibility}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
        />
    )
}
