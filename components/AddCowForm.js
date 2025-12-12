'use client';

import { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';

export default function AddCowForm({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagId: '',
    dateOfBirth: '',
    imageUrl: '',
    notes: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  
  const cowImageUrls = [
    '/cow-default.jpg',
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
    'https://images.unsplash.com/photo-1573781203248-ffa93c7cb0bc?w=400',
    'https://images.unsplash.com/photo-1551844931-59311cc83885?w=400',
    'https://images.unsplash.com/photo-1589461229291-3dad3327fec3?w=400',
  ];
  
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }

      // Read file and convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result;
        setFormData({
          ...formData,
          imageUrl: base64String,
        });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    setFormData({
      ...formData,
      imageUrl: e.target.value,
    });
    setImagePreview(null);
  };

  const clearImage = () => {
    setFormData({
      ...formData,
      imageUrl: '',
    });
    setImagePreview(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.tagId) {
      alert('Please fill in required fields (Name and Tag ID)');
      return;
    }
    
    const cowData = {
      ...formData,
      imageUrl: formData.imageUrl || cowImageUrls[Math.floor(Math.random() * cowImageUrls.length)],
    };
    
    onAdd(cowData);
    setFormData({
      name: '',
      tagId: '',
      dateOfBirth: '',
      imageUrl: '',
      notes: '',
    });
    setImagePreview(null);
    setIsOpen(false);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <div className="mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Plus size={20} />
          Add New Cow
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Add New Cow</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter cow name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tagId"
                value={formData.tagId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., C001"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              
              {/* Image Upload Section */}
              <div className="space-y-3">
                {/* File Upload (Mobile & Desktop) */}
                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                  <div className="text-center">
                    <Upload size={24} className="mx-auto text-green-600 mb-1" />
                    <span className="text-sm text-gray-600">Click to upload or drag image</span>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* OR Divider */}
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-3 text-xs text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* URL Input */}
                <input
                  type="url"
                  value={formData.imageUrl && !imagePreview ? formData.imageUrl : ''}
                  onChange={handleUrlChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Or paste image URL here"
                  disabled={!!imagePreview}
                />
                <p className="text-xs text-gray-500">
                  {imagePreview ? '✓ Image uploaded' : 'Leave blank for random cow image'}
                </p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any additional information..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add Cow
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
