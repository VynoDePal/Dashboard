import React, { useState } from 'react';
import { Type, Maximize2, Minimize2, Zap, Eye, Monitor } from 'lucide-react';

const VisualSettings: React.FC = () => {
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(16);
  const [uiDensity, setUiDensity] = useState<'compact' | 'default' | 'comfortable'>('default');
  const [animationSpeed, setAnimationSpeed] = useState<'none' | 'fast' | 'normal' | 'slow'>('normal');
  const [contrast, setContrast] = useState(100);
  const [reducedMotion, setReducedMotion] = useState(false);

  const fonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Montserrat',
    'Nunito',
    'Poppins',
    'Lato',
  ];

  const densityOptions = [
    { value: 'compact', label: 'Compact', icon: Minimize2 },
    { value: 'default', label: 'Default', icon: Monitor },
    { value: 'comfortable', label: 'Comfortable', icon: Maximize2 },
  ] as const;

  const animationOptions = [
    { value: 'none', label: 'None' },
    { value: 'fast', label: 'Fast' },
    { value: 'normal', label: 'Normal' },
    { value: 'slow', label: 'Slow' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Typography Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Type className="h-5 w-5 mr-2" />
                Typography
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Customize fonts and text display settings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                style={{ fontFamily }}
              >
                {fonts.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Base Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg border dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</h4>
            <div style={{ fontFamily, fontSize: `${fontSize}px` }} className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Heading 1</h1>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Heading 2</h2>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Heading 3</h3>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Regular paragraph text. This is how most of your content will look.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Smaller text for captions and secondary information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* UI Density Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">UI Density</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Adjust the spacing and sizing of interface elements
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {densityOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setUiDensity(value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  uiDensity === value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg border dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</h4>
            <div className={`space-y-${uiDensity === 'compact' ? '2' : uiDensity === 'comfortable' ? '6' : '4'}`}>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900"></div>
                <div>
                  <h3 className="font-medium">List Item</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Description text</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900"></div>
                <div>
                  <h3 className="font-medium">Another Item</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">More details here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation & Motion Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Animation & Motion
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Configure animation and motion preferences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Animation Speed
              </label>
              <div className="grid grid-cols-4 gap-3">
                {animationOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setAnimationSpeed(value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      animationSpeed === value
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Reduced Motion
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Minimize non-essential animations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg border dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</h4>
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 bg-blue-500 rounded-lg transition-transform hover:scale-110 ${
                  reducedMotion ? '' : `duration-${
                    animationSpeed === 'fast' ? '150' :
                    animationSpeed === 'normal' ? '300' :
                    animationSpeed === 'slow' ? '500' : '0'
                  }`
                }`}
              ></div>
              <div
                className={`w-12 h-12 bg-green-500 rounded-lg transition-transform hover:rotate-45 ${
                  reducedMotion ? '' : `duration-${
                    animationSpeed === 'fast' ? '150' :
                    animationSpeed === 'normal' ? '300' :
                    animationSpeed === 'slow' ? '500' : '0'
                  }`
                }`}
              ></div>
              <div
                className={`w-12 h-12 bg-purple-500 rounded-lg transition-opacity hover:opacity-50 ${
                  reducedMotion ? '' : `duration-${
                    animationSpeed === 'fast' ? '150' :
                    animationSpeed === 'normal' ? '300' :
                    animationSpeed === 'slow' ? '500' : '0'
                  }`
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Accessibility */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Visual Accessibility
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Adjust visual settings for better accessibility
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contrast: {contrast}%
              </label>
              <input
                type="range"
                min="75"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div className="mt-6 p-4 rounded-lg border dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</h4>
              <div style={{ filter: `contrast(${contrast}%)` }} className="space-y-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-200">High contrast text example</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200">Normal contrast text example</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualSettings;