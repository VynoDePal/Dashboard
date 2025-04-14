export interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  enabled: boolean;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface LayoutTemplate {
  id: string;
  name: string;
  layout: (string | null)[][];
}

export interface VisualSettings {
  fontFamily: string;
  fontSize: number;
  uiDensity: 'compact' | 'default' | 'comfortable';
}