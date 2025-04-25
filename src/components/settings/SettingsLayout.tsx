import React, { useState } from 'react';
import { Menu, X, Grid, Layout, Palette, Sliders } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';
import PageHeader from './PageHeader';
import WidgetsManager from './WidgetsManager';
import LayoutCustomizer from './LayoutCustomizer';
import ThemePreviewer from './ThemePreviewer';
import VisualSettings from './VisualSettings';

const SettingsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('widgets');

  const sections = [
    { id: 'widgets', name: 'Widgets', icon: Grid },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'theme', name: 'Appearance', icon: Palette },
    { id: 'visual', name: 'Visual', icon: Sliders },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'widgets':
        return <WidgetsManager />;
      case 'layout':
        return <LayoutCustomizer />;
      case 'theme':
        return <ThemePreviewer />;
      case 'visual':
        return <VisualSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <SidebarNavigation
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader
          title={sections.find(s => s.id === activeSection)?.name || ''}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-background text-text p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;