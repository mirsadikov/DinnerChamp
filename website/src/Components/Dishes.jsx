import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDishes } from '../Actions/dishController';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Alert, CircularProgress } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'dishes__header' },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, headerClassName: 'dishes__header' },
  { field: 'price', headerName: 'Price', minWidth: 50, headerClassName: 'dishes__header' },
  {
    headerClassName: 'dishes__header',

    field: 'category',
    headerName: 'Category',
    minWidth: 100,
    valueGetter: (params) => params.value?.name || 'No',
  },
  {
    headerClassName: 'dishes__header',
    field: 'description',
    headerName: 'Description',
    minWidth: 120,
    maxWidth: 200,
    sortable: false,
    valueGetter: (params) => params.value?.substring(0, 50) || 'No',
  },
  {
    headerClassName: 'dishes__header',
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <img
        src={process.env.REACT_APP_IMG_ENDPOINT + params.value}
        alt="dish"
        style={{ width: '100px', height: '100px', padding: '5px', objectFit: 'cover' }}
      />
    ),
  },
  {
    headerClassName: 'dishes__header',
    field: 'onSale',
    headerName: 'On Sale',
    type: 'boolean',
    renderCell: (params) => (
      <Switch checked={params.value} inputProps={{ 'aria-label': 'controlled' }} />
    ),
  },
  {
    headerClassName: 'dishes__header',
    field: 'updatedAt',
    headerName: 'Updated At',
    minWidth: 120,
    valueGetter: (params) => new Date(params.value).toLocaleString('en-Gb'),
    type: 'dateTime',
  },
  {
    headerClassName: 'dishes__header',
    field: 'createdAt',
    headerName: 'Created At',
    minWidth: 120,
    valueGetter: (params) => new Date(params.value).toLocaleString('en-Gb'),
    type: 'dateTime',
  },
  {
    headerClassName: 'dishes__header',
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    disableExport: true,
    width: 100,
    renderCell: (params) => (
      <div className="dishes__actions">
        <button className="dishes__action-btn dishes__action-btn--edit">
          <EditIcon />
        </button>
        <button className="dishes__action-btn dishes__action-btn--delete">
          <DeleteOutlineIcon />
        </button>
      </div>
    ),
  },
];

export default function Dishes() {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    name: true,
    price: true,
    category: true,
    description: false,
    image: true,
    onSale: true,
    updatedAt: false,
    createdAt: false,
    actions: true,
  });

  const { dishes, loading, error } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dishes) {
      dispatch(getAllDishes());
    }
  }, [dishes, dispatch]);

  return (
    <div className="dashboard__card dishes">
      <h2 className="dashboard__card-title">Dishes</h2>
      {error && (
        <Alert className="dishes__alert" severity="error">
          {error}
        </Alert>
      )}
      <div className="dishes__controls"></div>
      <div className="dishes__table">
        {loading && (
          <CircularProgress className="dishes__loading center-self" color="primary" size={50} />
        )}
        {dishes && (
          <DataGrid
            rows={dishes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            autoHeight
            rowHeight={100}
            getRowHeight={() => 'auto'}
            // showCellRightBorder
            // showColumnRightBorder
            components={{
              NoRowsOverlay: () => <div className="dishes__no-data">No Dishes Found</div>,
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 100 },
              },
            }}
            disableDensitySelector
            disableColumnMenu
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(model) => setColumnVisibilityModel(model)}
          />
        )}
      </div>
    </div>
  );
}
//
