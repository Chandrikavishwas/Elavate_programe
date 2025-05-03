import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const AddDoctorForm = ({ onClose }) => {
  const { addDoctor } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    city: '',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600', // Default image
    summary: '',
    availability: {
      monday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
      wednesday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
      friday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor(formData);
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Dr. John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            required
            value={formData.specialization}
            onChange={handleChange}
            className="input-field"
            placeholder="Cardiologist"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="doctor@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            placeholder="New York"
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com/doctor-image.jpg"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          id="summary"
          name="summary"
          rows="4"
          required
          value={formData.summary}
          onChange={handleChange}
          className="input-field"
          placeholder="Brief professional background and expertise..."
        ></textarea>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button 
          type="button" 
          onClick={onClose}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn-primary"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctorForm;