import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDish, getAllDishes } from '../Actions/dishActions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import { Link, useNavigate } from 'react-router-dom';
import defaultImg from '../Images/default-img.png';

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, type: 'string' },
    { field: 'price', headerName: 'Price', minWidth: 50, type: 'number' },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 100,
      valueGetter: (params) => params.value?.name || 'No',
    },
    {
      type: 'string',
      field: 'description',
      headerName: 'Description',
      minWidth: 200,
      sortable: false,
      valueGetter: (params) => params.value?.substring(0, 50) || 'No',
    },
    {
      field: 'image',
      headerName: 'Image',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value ? process.env.REACT_APP_IMG_ENDPOINT + params.value : defaultImg}
          alt="dish"
          style={{ width: '100px', height: '100px', padding: '5px', objectFit: 'contain' }}
        />
      ),
    },
    {
      field: 'onSale',
      headerName: 'On Sale',
      type: 'boolean',
      renderCell: (params) => (
        <Switch checked={params.value} inputProps={{ 'aria-label': 'controlled' }} />
      ),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      minWidth: 120,
      valueGetter: (params) => new Date(params.value).toLocaleString('en-Gb'),
      type: 'dateTime',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 120,
      valueGetter: (params) => new Date(params.value).toLocaleString('en-Gb'),
      type: 'dateTime',
    },
    {
      // type: 'actions',
      filterable: false,
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      disableExport: true,
      width: 100,
      // getActions: (params) => [
      //   <button className="dishes__action-btn dishes__action-btn--edit">
      //     <EditIcon />
      //   </button>,
      //   <button
      //     className="dishes__action-btn dishes__action-btn--delete"
      //     onClick={deleteHandler(params.id)}
      //   >
      //     <DeleteOutlineIcon />
      //   </button>,
      // ],
      renderCell: (params) => (
        <div className="dishes__actions">
          <button
            className="dishes__action-btn dishes__action-btn--edit"
            onClick={editHandler(params.id)}
          >
            <EditIcon />
          </button>
          <button
            className="dishes__action-btn dishes__action-btn--delete"
            onClick={deleteHandler(params.id)}
          >
            <DeleteOutlineIcon />
          </button>
        </div>
      ),
    },
  ];

  const { dishes, loading, error } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dishes) {
      dispatch(getAllDishes());
    }
  }, [dishes, dispatch]);

  const deleteHandler = (id) => {
    return () => {
      if (window.confirm('Are you sure you want to delete this dish?')) dispatch(deleteDish(id));
    };
  };

  const handleRefresh = () => {
    dispatch(getAllDishes());
  };

  const editHandler = (id) => {
    return () => {
      navigate('/dashboard/dishes/form/', { state: { dish: dishes.find((x) => x.id === id) } });
    };
  };

  return (
    <div className="dashboard__card dishes">
      <div className="dashboard__card-header">
        <h2 className="dashboard__card-title">Dishes</h2>
        <div className="dishes__controls">
          <button className="button button--small" onClick={handleRefresh}>
            Refresh
          </button>
          <Link
            to="/dashboard/dishes/form"
            className="dishes__create button button--small button--primary"
          >
            Create new dish
          </Link>
        </div>
      </div>
      {error && (
        <Alert className="dishes__alert" severity="error">
          {error}
        </Alert>
      )}
      <div className="dishes__table">
        <Backdrop open={loading || false} className="dishes__loading">
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* {loading && (
          <CircularProgress className="dishes__loading center-self" color="primary" size={50} />
        )} */}
        {dishes && (
          <DataGrid
            rows={dishes}
            columns={columns}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
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
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'asc' }],
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
