import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import SettingsLayout from './SettingsLayout';
import { useToast } from '../../hooks/useToast';

const SettingsPage: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast({
        type: 'success',
        message: 'Settings saved successfully!'
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Failed to save settings'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      showToast({
        type: 'info',
        message: 'Settings have been reset to default'
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <SettingsLayout />
      
      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <button
          onClick={handleReset}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label="Reset settings"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Save settings"
        >
          <Save className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;