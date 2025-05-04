import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { addFood } from '../../redux/food/food.action';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddMealModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [veg, setVeg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [flavorProfile, setFlavorProfile] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [festival, setFestival] = useState("");

  let image;

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeChange = (type) => {
    if (type === "veg") {
      setVeg(true);
    } else {
      setVeg(false);
    }
  };

  const handleImage = (e) => {
    image = e.target.files[0];
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("isVeg", veg);
    form.append("quantity", quantity);
    form.append("foodImage", image);
    form.append("ingredients", JSON.stringify(ingredients.split(",").map(i => i.trim())));
    form.append("diet", diet);
    form.append("cook_time", cookTime);
    form.append("flavor_profile", flavorProfile);
    form.append("course", course);
    form.append("state", state);
    form.append("region", region);
    form.append("festival", festival);

    dispatch(addFood(form));
    setOpen(false);

    // Reset fields
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setVeg(false);
    setIngredients("");
    setDiet("");
    setCookTime("");
    setFlavorProfile("");
    setCourse("");
    setState("");
    setRegion("");
    setFestival("");
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add New Meal
        </BootstrapDialogTitle>
        <form className="flex flex-col gap-2 w-96" onSubmit={handleSubmit}>
          <DialogContent dividers>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name' className='font-semibold'>Name</label>
              <input type="text" value={name} required name="name" id="name" placeholder="Enter Name of Meal" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="price" className='font-semibold'>Price</label>
              <input type="number" value={price} required name="price" id="price" placeholder="Enter Price of Meal" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="quantity" className='font-semibold'>Per Day Quantity</label>
              <input type="number" value={quantity} required name="quantity" id="quantity" placeholder="Enter Quantity" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="type" className='font-semibold'>Type</label>
              <select name="type" required id="type" className='px-3 py-1 border rounded focus:outline-none' onChange={(e) => handleTypeChange(e.target.value)}>
                <option value="">Select Type of Meal</option>
                <option value="veg">Veg</option>
                <option value="nonVeg">Non-Veg</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="description" className='font-semibold'>Description</label>
              <textarea value={description} required rows={3} name="description" id="description" placeholder="Enter Description of Meal" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="ingredients" className='font-semibold'>Ingredients (comma separated)</label>
              <input type="text" value={ingredients} name="ingredients" id="ingredients" placeholder="e.g. rice, dal, paneer" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setIngredients(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="diet" className='font-semibold'>Diet Type</label>
              <input type="text" value={diet} name="diet" id="diet" placeholder="e.g. Keto, Vegan" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setDiet(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="cookTime" className='font-semibold'>Cook Time (minutes)</label>
              <input type="number" value={cookTime} name="cookTime" id="cookTime" placeholder="e.g. 30" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setCookTime(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="flavorProfile" className='font-semibold'>Flavor Profile</label>
              <input type="text" value={flavorProfile} name="flavorProfile" id="flavorProfile" placeholder="e.g. spicy, sweet" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setFlavorProfile(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="course" className='font-semibold'>Course</label>
              <input type="text" value={course} name="course" id="course" placeholder="e.g. main, dessert" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setCourse(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="state" className='font-semibold'>State</label>
              <input type="text" value={state} name="state" id="state" placeholder="e.g. Punjab" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setState(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="region" className='font-semibold'>Region</label>
              <input type="text" value={region} name="region" id="region" placeholder="e.g. North India" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setRegion(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="festival" className='font-semibold'>Festival</label>
              <input type="text" value={festival} name="festival" id="festival" placeholder="e.g. Diwali, Eid" className="px-3 py-1 border rounded focus:outline-none" onChange={(e) => setFestival(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="image" className='font-semibold'>Image</label>
              <input type="file" required id="image" onChange={handleImage} />
            </div>
          </DialogContent>
          <DialogActions>
            <input type="submit" value="Add Meal" autoFocus className="text-white cursor-pointer bg-slate-800 rounded px-2 py-1" />
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
