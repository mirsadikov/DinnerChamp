import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from '../Actions/categoryActions';
import Chip from '@mui/material/Chip';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress } from '@mui/material';

export default function Categories() {
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const dispatch = useDispatch();
  const { categories, loading, addLoading, addSuccess, error } = useSelector(
    (state) => state.categories,
  );
  useEffect(() => {
    if (!categories) dispatch(getCategories());
  }, [dispatch, categories]);

  useEffect(() => {
    if (addSuccess) {
      setName('');
    }
  }, [addSuccess]);

  const handleAdd = () => {
    dispatch(addCategory(name));
  };

  const handleUpdate = () => {
    dispatch(updateCategory(editId, name));
    setEditId(null);
    setName('');
  };

  const handleDelete = (id) => {
    return () => {
      if (window.confirm('Are you sure you want to delete this category?'))
        dispatch(deleteCategory(id));
    };
  };

  const handleEdit = (id) => {
    return () => {
      setEditId(id);
      setName(categories.find((c) => c.id === id).name);
    };
  };

  const turnOnDelete = () => {
    setDeleteMode(!deleteMode);
  };

  const turnOnEdit = () => {
    setName('');
    setEditMode(!editMode);
  };

  return (
    <div className="dashboard__card categories">
      <h2 className="dashboard__card-title">Categories</h2>
      {error && (
        <Alert className="caregories__alert" severity="error">
          {error}
        </Alert>
      )}
      <div className="categories__list">
        {loading && (
          <CircularProgress className="categories__loading center-self" color="primary" size={50} />
        )}
        {categories &&
          [...categories]
            .sort((a, b) => a.id - b.id)
            .map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                deleteIcon={deleteMode ? <CancelIcon /> : editMode ? <ModeEditIcon /> : <></>}
                onDelete={deleteMode ? handleDelete(category.id) : handleEdit(category.id)}
                className="categories__chip"
              />
            ))}
      </div>
      <div className="categories__controls">
        <div className="categories__add">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="categories__add-input form__control"
          />
          <LoadingButton
            loading={addLoading}
            onClick={editId ? handleUpdate : handleAdd}
            type="submit"
            className="categories__add-btn button button--primary"
          >
            {editId ? 'Update' : 'Add'}
          </LoadingButton>
        </div>
        <button onClick={turnOnEdit} disabled={deleteMode} className="categories__edit-btn button">
          {editMode ? 'Done' : 'Edit'}
        </button>
        <button
          onClick={turnOnDelete}
          disabled={editMode}
          className="categories__delete-btn button"
        >
          {deleteMode ? 'Done' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
