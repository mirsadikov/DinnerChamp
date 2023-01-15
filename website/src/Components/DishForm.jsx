import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Alert, Switch } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../Actions/categoryActions';
import { createDish, updateDish } from '../Actions/dishActions';
import { LoadingButton } from '@mui/lab';
import { DISH_FORM_RESET } from '../constants';
import Checkbox from '@mui/material/Checkbox';

export default function DishForm() {
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('-1');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [newImagePreview, setNewImagePreview] = useState('');
  const [deleteOldImage, setDeleteOldImage] = useState(false);
  const [onSale, setOnSale] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const imageInputRef = useRef();

  const { categories } = useSelector((state) => state.categories);
  const { loading, error, success } = useSelector((state) => state.dishForm);

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }

    return () => {
      dispatch({ type: DISH_FORM_RESET });
    };
  }, [categories, dispatch]);

  useEffect(() => {
    // get state from history
    if (location.state) {
      const { dish } = location.state;
      setEditId(dish.id);
      setName(dish.name);
      setPrice(dish.price);
      setCategory(dish.category?.id.toString() || '-1');
      setDescription(dish.description || '');
      setOnSale(dish.onSale);

      if (dish.image) {
        setImagePreview(process.env.REACT_APP_IMG_ENDPOINT + dish.image);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (success) {
      dispatch({ type: DISH_FORM_RESET });
      navigate('/dashboard/dishes');
    }
  }, [success, navigate, dispatch]);

  function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (category !== '-1') formData.append('categoryId', category);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);
    if (editId && deleteOldImage) formData.append('removeImage', deleteOldImage);
    formData.append('onSale', onSale);

    if (editId) {
      dispatch(updateDish(editId, formData));
    } else {
      dispatch(
        createDish(
          formData,
          categories.find((c) => c.id.toString() === category),
        ),
      );
    }
  }

  function newFileHandler(e) {
    // only accept image files
    if (!e.target.files[0].type.startsWith('image/')) {
      alert('Please select an image file');
      e.target.value = '';
      return;
    }

    setImage(e.target.files[0]);
    setNewImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="dashboard__card dishform">
      <div className="dashboard__card-header dishform__header">
        <Link
          to="/dashboard/dishes "
          className="dishform__back button button--small button--primary"
        >
          <ArrowBackIosNewIcon />
        </Link>
        <h2 className="dashboard__card-title">{editId ? 'Edit Dish' : 'Create new dish'}</h2>
      </div>

      {error && (
        <Alert className="dishform__alert" severity="error">
          {error}
        </Alert>
      )}

      <form className="dishform__form form form--small" onSubmit={submitHandler}>
        <div className="dishform__form-group">
          <div className="form__group">
            <label htmlFor="name" className="dishform__label form__label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="dishform__input form__control"
              placeholder="Enter dish name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form__group-2 dishform__form-group">
          <div className="form__group">
            <label htmlFor="price" className="dishform__label form__label">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="dishform__input form__control"
              placeholder="Enter dish price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="category" className="dishform__label form__label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="dishform__input form__control dishform__input--select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="-1">Select category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="dishform__form-group">
          <div className="form__group">
            <label htmlFor="description" className="dishform__label form__label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="dishform__input form__control dishform__input--textarea"
              placeholder="Enter dish description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="form__group-2 dishform__form-group">
          <div className="form__group">
            <label htmlFor="image" className="dishform__label form__label">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="dishform__input form__control"
              ref={imageInputRef}
              onChange={newFileHandler}
            />
            <button
              type="button"
              className="dishform__clear-image button"
              onClick={() => {
                setImage('');
                setNewImagePreview('');
                imageInputRef.current.value = '';
              }}
              disabled={!image && !newImagePreview}
            >
              Remove New Image
            </button>
          </div>
          {(imagePreview || newImagePreview) && (
            <div className="form__group">
              <label htmlFor="imagePreview" className="dishform__label form__label">
                {newImagePreview ? 'New Image Preview' : 'Old Image Preview'}
              </label>
              <img
                src={newImagePreview ? newImagePreview : imagePreview}
                alt=""
                className="dishform__image-preview"
              />
            </div>
          )}
        </div>

        {imagePreview && (
          <div className="form__group-2 dishform__form-group">
            <div className="form__group form__group--row">
              <label htmlFor="onSale" className="dishform__label form__label">
                Delete Old Image
              </label>
              <Checkbox
                checked={deleteOldImage || newImagePreview}
                onChange={(e) => setDeleteOldImage(e.target.checked)}
                disabled={newImagePreview}
              />
            </div>
          </div>
        )}

        <div className="form__group-2 dishform__form-group">
          <div className="form__group form__group--row">
            <label htmlFor="onSale" className="dishform__label form__label">
              On Sale
            </label>
            <div className="dishform__input form__control dishform__input--switch">
              <Switch
                name="onSale"
                id="onSale"
                inputProps={{ 'aria-label': 'controlled' }}
                checked={onSale}
                onChange={(e) => setOnSale(e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className="dishform__buttons">
          <LoadingButton
            loading={loading}
            type="submit"
            className="dishform__submit button button--primary button--small"
          >
            {editId ? 'Update' : 'Create'}
          </LoadingButton>
          <Link
            to="/dashboard/dishes"
            className="dishform__cancel button button--small button--secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
