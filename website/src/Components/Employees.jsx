import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEmployee, getAllEmployees } from '../Actions/employeeActions';

export default function Employees() {
  const [pageSize, setPageSize] = useState(20);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    staffId: true,
    name: true,
    updatedAt: false,
    createdAt: false,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'staffId', headerName: 'Staff ID', minWidth: 120, type: 'number' },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, type: 'string' },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      minWidth: 150,
      valueGetter: (params) => new Date(params.value).toLocaleString('en-Gb'),
      type: 'dateTime',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      minWidth: 150,
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
      width: 120,
      minWidth: 100,
      renderCell: (params) => (
        <div className="employees__actions">
          <button
            className="employees__action-btn employees__action-btn--edit"
            onClick={editHandler(params.id)}
          >
            <EditIcon />
          </button>
          <button
            className="employees__action-btn employees__action-btn--delete"
            onClick={deleteHandler(params.id)}
          >
            <DeleteOutlineIcon />
          </button>
        </div>
      ),
    },
  ];

  const { employees, loading, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!employees) {
      dispatch(getAllEmployees());
    }
  }, [employees, dispatch]);

  const deleteHandler = (id) => {
    return () => {
      if (window.confirm('Are you sure you want to delete this employee?'))
        dispatch(deleteEmployee(id));
    };
  };

  const handleRefresh = () => {
    dispatch(getAllEmployees());
  };

  const editHandler = (id) => {
    return () => {
      navigate('/dashboard/employees/form/', {
        state: { employee: employees.find((x) => x.id === id) },
      });
    };
  };

  return (
    <div className="dashboard__card employees">
      <div className="dashboard__card-header">
        <h2 className="dashboard__card-title">Employees</h2>
        <div className="employees__controls">
          <button className="button button--small" onClick={handleRefresh}>
            Refresh
          </button>
          <Link
            to="/dashboard/employees/form"
            className="employees__create button button--small button--primary"
          >
            Create new employee
          </Link>
        </div>
      </div>
      {error && (
        <Alert className="employees__alert" severity="error">
          {error}
        </Alert>
      )}
      <div className="employees__table">
        <Backdrop open={loading || false} className="employees__loading">
          <CircularProgress color="inherit" />
        </Backdrop>
        {employees && (
          <DataGrid
            rows={employees}
            columns={columns}
            autoHeight
            pagination
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            disableSelectionOnClick
            getRowHeight={() => 50}
            components={{
              NoRowsOverlay: () => <div className="employees__no-data">No Employees Found</div>,
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
