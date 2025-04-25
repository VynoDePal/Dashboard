import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../types/settings';
import ApplyThemeButton from './ApplyThemeButton';

const ThemePreviewer: React.FC = () => {
  const { isDark, toggleTheme, updateTheme } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState('default');
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: isDark ? '#1f2937' : '#ffffff',
    text: isDark ? '#f3f4f6' : '#111827',
  });

  const colorPresets = [
    {
      id: 'default',
      name: 'Default',
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: isDark ? '#1f2937' : '#ffffff',
        text: isDark ? '#f3f4f6' : '#111827',
      },
    },
    {
      id: 'ocean',
      name: 'Ocean',
      colors: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#6366f1',
        background: isDark ? '#1e293b' : '#f8fafc',
        text: isDark ? '#f1f5f9' : '#0f172a',
      },
    },
    {
      id: 'forest',
      name: 'Forest',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#84cc16',
        background: isDark ? '#1a2e1d' : '#f0fdf4',
        text: isDark ? '#dcfce7' : '#14532d',
      },
    },
    {
      id: 'sunset',
      name: 'Sunset',
      colors: {
        primary: '#f97316',
        secondary: '#f59e0b',
        accent: '#ef4444',
        background: isDark ? '#2d1b15' : '#fff7ed',
        text: isDark ? '#ffedd5' : '#7c2d12',
      },
    },
  ];

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = colorPresets.find((p) => p.id === presetId);
    if (preset) {
      setCustomColors(preset.colors);
    }
  };

  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    setCustomColors((prev) => ({ ...prev, [key]: value }));
    setSelectedPreset('custom');
  };

  const PreviewCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-2 border-secondary rounded-lg overflow-hidden">
      <div className="border-b-2 border-secondary p-4">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  // Create theme object for ApplyThemeButton
  const newTheme: Theme = {
    id: selectedPreset,
    name: selectedPreset === 'custom' ? 'Custom' : colorPresets.find(p => p.id === selectedPreset)?.name || 'Custom',
    colors: {
      primary: customColors.primary,
      secondary: customColors.secondary,
      accent: customColors.accent,
      background: customColors.background,
      text: customColors.text,
    }
  };

  // Live update global theme context and CSS variables when inputs change
  useEffect(() => {
    updateTheme(newTheme)
    // Update background and text CSS variables
    document.documentElement.style.setProperty('--color-background', customColors.background)
    document.documentElement.style.setProperty('--color-text', customColors.text)
  }, [customColors, selectedPreset])

  // Lorsque le mode clair/sombre change, réappliquer le preset pour actualiser background et text
  useEffect(() => {
    handlePresetChange(selectedPreset)
  }, [isDark, selectedPreset])

  return (
    <div className="space-y-8">
      <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-text">Theme Mode</h2>
            <p className="mt-1 text-sm text-secondary">
              Choose your preferred color scheme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                if (isDark) toggleTheme();
              }}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                !isDark
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-gray-700" />
                  <span className="ml-2 font-medium text-gray-900">Light</span>
                </div>
                {!isDark && <Check className="h-5 w-5 text-blue-500" />}
              </div>
            </button>

            <button
              onClick={() => {
                if (!isDark) toggleTheme();
              }}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                isDark
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-gray-700" />
                  <span className="ml-2 font-medium text-gray-900">Dark</span>
                </div>
                {isDark && <Check className="h-5 w-5 text-blue-500" />}
              </div>
            </button>

            <button className="relative p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300">
              <div className="flex items-center">
                <span className="ml-2 font-medium text-gray-900">System</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-text">Color Scheme</h2>
            <p className="mt-1 text-sm text-secondary">
              Choose a preset or customize your colors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset.id)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedPreset === preset.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {preset.name}
                    </span>
                    {selectedPreset === preset.id && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: preset.colors.secondary }}
                    />
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: preset.colors.accent }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 px-3 py-2 border-2 rounded-lg border-gray-200 dark:border-gray-700 bg-background text-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 px-3 py-2 border-2 rounded-lg border-gray-200 dark:border-gray-700 bg-background text-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accent Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 px-3 py-2 border-2 rounded-lg border-gray-200 dark:border-gray-700 bg-background text-text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background text-text rounded-lg border-2 border-secondary shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-text">Preview</h2>
            <p className="mt-1 text-sm text-secondary">
              See how your theme looks with different components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PreviewCard title="Buttons">
              <div className="space-y-4">
                <div className="space-x-4">
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white"
                    style={{ backgroundColor: customColors.primary }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white"
                    style={{ backgroundColor: customColors.secondary }}
                  >
                    Secondary
                  </button>
                </div>
                <div className="space-x-4">
                  <button
                    className="px-4 py-2 rounded-lg font-medium"
                    style={{ color: customColors.primary, borderColor: customColors.primary }}
                  >
                    Outline
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white"
                    style={{ backgroundColor: customColors.accent }}
                  >
                    Accent
                  </button>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard title="Cards & Alerts">
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${customColors.primary}20` }}
                >
                  <p style={{ color: customColors.primary }}>Information message</p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${customColors.secondary}20` }}
                >
                  <p style={{ color: customColors.secondary }}>Success message</p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${customColors.accent}20` }}
                >
                  <p style={{ color: customColors.accent }}>Warning message</p>
                </div>
              </div>
            </PreviewCard>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-secondary">
            <ApplyThemeButton newTheme={newTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreviewer;