import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Alert, Backdrop, CircularProgress, Switch } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import { deleteBranch, getAllBranches } from '../Actions/branchActions';

export default function Branches() {
  const [pageSize, setPageSize] = useState(20);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    name: true,
    email: true,
    phone: false,
    address: false,
    city: true,
    running: true,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200, type: 'string' },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 250, type: 'string' },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 150, type: 'string' },
    { field: 'address', headerName: 'Address', flex: 1, minWidth: 150, type: 'string' },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 150, type: 'string' },
    {
      field: 'running',
      headerName: 'Running',
      type: 'boolean',
      renderCell: (params) => (
        <Switch checked={params.value} inputProps={{ 'aria-label': 'controlled' }} />
      ),
    },
    {
      // type: 'actions',
      filterable: false,
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      disableExport: true,
      width: 120,
      minWidth: 100,
      renderCell: (params) => (
        <div className="branches__actions">
          <button
            className="branches__action-btn branches__action-btn--edit"
            onClick={editHandler(params.id)}
          >
            <EditIcon />
          </button>
          <button
            className="branches__action-btn branches__action-btn--delete"
            onClick={deleteHandler(params.id)}
          >
            <DeleteOutlineIcon />
          </button>
        </div>
      ),
    },
  ];

  const { branches, loading, error } = useSelector((state) => state.branches);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!branches) {
      dispatch(getAllBranches());
    }
  }, [branches, dispatch]);

  const deleteHandler = (id) => {
    return () => {
      if (window.confirm('Are you sure you want to delete this branch?'))
        dispatch(deleteBranch(id));
    };
  };

  const handleRefresh = () => {
    dispatch(getAllBranches());
  };

  const editHandler = (id) => {
    return () => {
      navigate('/dashboard/branches/form/', {
        state: { branch: branches.find((x) => x.id === id) },
      });
    };
  };

  return (
    <div className="dashboard__card branches">
      <div className="dashboard__card-header">
        <h2 className="dashboard__card-title">Branches</h2>
        <div className="branches__controls">
          <button className="button button--small" onClick={handleRefresh}>
            Refresh
          </button>
          <Link
            to="/dashboard/branches/form"
            className="branches__create button button--small button--primary"
          >
            Create new branch
          </Link>
        </div>
      </div>
      {error && (
        <Alert className="branches__alert" severity="error">
          {error}
        </Alert>
      )}
      <div className="branches__table">
        <Backdrop open={loading || false} className="branches__loading">
          <CircularProgress color="inherit" />
        </Backdrop>
        {branches && (
          <DataGrid
            rows={branches}
            columns={columns}
            autoHeight
            pagination
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            disableSelectionOnClick
            getRowHeight={() => 50}
            components={{
              NoRowsOverlay: () => <div className="branches__no-data">No Branches Found</div>,
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
