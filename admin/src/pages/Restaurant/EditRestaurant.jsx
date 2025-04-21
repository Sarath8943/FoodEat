import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash2, ArrowLeft } from "lucide-react";

const EditRestaurant = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.data;
  const isEdit = Boolean(data);

  const [formData, setFormData] = useState({
    name: data?.name || "",
    cuisine: data?.cuisine || "",
    status: data?.status || "open",
    location: data?.location || "",
    image: null,
    contact: {
      phone: data?.contact?.phone || "",
      email: data?.contact?.email || "",
    },
  });

  const [imagePreview, setImagePreview] = useState(data?.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (upload) => {
        setImagePreview(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhone(formData.contact.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!isValidEmail(formData.contact.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!formData.location.trim()) {
      alert("Please enter the location.");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("cuisine", formData.cuisine);
      form.append("status", formData.status);
      form.append("location", formData.location);
      form.append("contact[phone]", formData.contact.phone);
      form.append("contact[email]", formData.contact.email);

      if (formData.image) {
        form.append("image", formData.image);
      }

      const endpoint = isEdit ? `/restaurant/${data._id}` : `/restaurant`;
      const method = isEdit ? "PATCH" : "POST";

      await axiosInstance({
        method,
        url: endpoint,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/allrestaurants");
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "#f5f5f5" }}>
      <Button
        startIcon={<ArrowLeft size={20} />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: "text.primary" }}
      >
        Back
      </Button>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight={600} mb={3}>
              {isEdit ? "Edit Restaurant" : "Create New Restaurant"}
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Restaurant Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cuisine Type"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Upload Restaurant Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                  {imagePreview && (
                    <Box mt={2} textAlign="center" position="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "300px",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "white",
                          borderRadius: "50%",
                          p: 0.5,
                          cursor: "pointer",
                          boxShadow: 1,
                        }}
                        onClick={() => {
                          setImagePreview("");
                          setFormData((prev) => ({ ...prev, image: null }));
                        }}
                      >
                        <Trash2 size={18} color="#f44336" />
                      </Box>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, phone: input.slice(0, 10) },
                      }));
                    }}
                    required
                    size="small"
                    helperText="10-digit phone number"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    required
                    size="small"
                    type="email"
                    helperText="Enter a valid email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        bgcolor: "primary.main",
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    >
                      {isEdit ? "Update Restaurant" : "Create Restaurant"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditRestaurant;
