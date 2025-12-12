'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function AddCowForm({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagId: '',
    dateOfBirth: '',
    imageUrl: '',
    notes: '',
  });
  
  const cowImageUrls = [
    '/cow-default.jpg',
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
    'https://images.unsplash.com/photo-1573781203248-ffa93c7cb0bc?w=400',
    'https://images.unsplash.com/photo-1551844931-59311cc83885?w=400',
    'https://images.unsplash.com/photo-1589461229291-3dad3327fec3?w=400',
  ];
  
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
                Image URL (optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Leave blank for random cow image"
              />
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
