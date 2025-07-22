export interface SocialLink {
  platform: string;
  username: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  shadowColor: string;
  url?: string;
  isActive?: boolean;
}

export interface TemplateData {
  id: number;
  name: string;
  profession: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  templateType?: 'modern' | 'classic' | 'minimal' | 'creative';
}

export interface TemplateCustomization {
  name: string;
  profession: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  theme?: TemplateTheme;
}

export interface TemplateTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  cardBackground: string;
  borderColor: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  theme: TemplateTheme;
  preview: string;
}

export interface LinkItem {
  _id: string;
  linkTitle: string;
  linkUrl: string;
  linkLogo: string;
  status: string;
  type: 'social' | 'non_social';
  order?: number;
  clicks?: number;
  isActive?: boolean;
}

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profession?: string;
  bio?: string;
  profile_img: string;
  type: 'user' | 'admin';
  template_id?: string;
  customization?: TemplateCustomization;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCardProps {
  id: number;
  name: string;
  profession: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
  theme?: TemplateTheme;
  isPreview?: boolean;
  onClick?: () => void;
}

export interface TemplateLandingProps {
  onTemplateSelect?: (templateId: number) => void;
  showPreviewOnly?: boolean;
}

export interface TemplateCustomizerProps {
  templateId: string;
  initialData?: TemplateCustomization;
  onSave?: (data: TemplateCustomization) => void;
  onCancel?: () => void;
}

export interface TemplatePreviewProps {
  templateId: string;
  data?: TemplateData;
  showActions?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface TemplateApiResponse extends ApiResponse<TemplateData[]> {}

export interface UserApiResponse extends ApiResponse<UserProfile> {}

export interface LinkApiResponse extends ApiResponse<LinkItem[]> {}

// Form Types
export interface TemplateFormData {
  name: string;
  profession: string;
  description: string;
  profileImage: File | string;
  socialLinks: Omit<SocialLink, 'icon' | 'gradientFrom' | 'gradientTo' | 'borderColor' | 'shadowColor'>[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export interface SocialPlatformConfig {
  platform: string;
  icon: string;
  baseUrl: string;
  placeholder: string;
  validation: RegExp;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  shadowColor: string;
}

// Constants
export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    platform: 'instagram',
    icon: 'fab fa-instagram',
    baseUrl: 'https://instagram.com/',
    placeholder: '@username',
    validation: /^[a-zA-Z0-9._]{1,30}$/,
    gradientFrom: 'from-pink-500/20',
    gradientTo: 'to-purple-500/20',
    borderColor: 'border-pink-500/30',
    shadowColor: 'rgba(236,72,153,0.3)'
  },
  {
    platform: 'twitter',
    icon: 'fab fa-twitter',
    baseUrl: 'https://twitter.com/',
    placeholder: '@username',
    validation: /^[a-zA-Z0-9_]{1,15}$/,
    gradientFrom: 'from-blue-500/20',
    gradientTo: 'to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    shadowColor: 'rgba(59,130,246,0.3)'
  },
  {
    platform: 'linkedin',
    icon: 'fab fa-linkedin-in',
    baseUrl: 'https://linkedin.com/in/',
    placeholder: 'username',
    validation: /^[a-zA-Z0-9-]{3,100}$/,
    gradientFrom: 'from-blue-600/20',
    gradientTo: 'to-indigo-600/20',
    borderColor: 'border-blue-600/30',
    shadowColor: 'rgba(37,99,235,0.3)'
  },
  {
    platform: 'github',
    icon: 'fab fa-github',
    baseUrl: 'https://github.com/',
    placeholder: 'username',
    validation: /^[a-zA-Z0-9-]{1,39}$/,
    gradientFrom: 'from-gray-700/20',
    gradientTo: 'to-gray-900/20',
    borderColor: 'border-gray-700/30',
    shadowColor: 'rgba(75,85,99,0.3)'
  },
  {
    platform: 'youtube',
    icon: 'fab fa-youtube',
    baseUrl: 'https://youtube.com/@',
    placeholder: '@channelname',
    validation: /^[a-zA-Z0-9._-]{1,30}$/,
    gradientFrom: 'from-red-500/20',
    gradientTo: 'to-orange-500/20',
    borderColor: 'border-red-500/30',
    shadowColor: 'rgba(239,68,68,0.3)'
  },
  {
    platform: 'facebook',
    icon: 'fab fa-facebook-f',
    baseUrl: 'https://facebook.com/',
    placeholder: 'username',
    validation: /^[a-zA-Z0-9.]{5,50}$/,
    gradientFrom: 'from-blue-700/20',
    gradientTo: 'to-blue-800/20',
    borderColor: 'border-blue-700/30',
    shadowColor: 'rgba(29,78,216,0.3)'
  },
  {
    platform: 'tiktok',
    icon: 'fab fa-tiktok',
    baseUrl: 'https://tiktok.com/@',
    placeholder: '@username',
    validation: /^[a-zA-Z0-9._]{2,24}$/,
    gradientFrom: 'from-pink-600/20',
    gradientTo: 'to-red-600/20',
    borderColor: 'border-pink-600/30',
    shadowColor: 'rgba(219,39,119,0.3)'
  },
  {
    platform: 'discord',
    icon: 'fab fa-discord',
    baseUrl: 'https://discord.gg/',
    placeholder: 'invite-code',
    validation: /^[a-zA-Z0-9]{2,32}$/,
    gradientFrom: 'from-indigo-600/20',
    gradientTo: 'to-purple-600/20',
    borderColor: 'border-indigo-600/30',
    shadowColor: 'rgba(79,70,229,0.3)'
  }
];

export const DEFAULT_THEMES: TemplatePreset[] = [
  {
    id: 'ocean',
    name: 'Ocean',
    theme: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#ff6b6b',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      text: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    preview: '/assets/themes/ocean-preview.jpg'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    theme: {
      primary: '#ff9a9e',
      secondary: '#fecfef',
      accent: '#feca57',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      text: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    preview: '/assets/themes/sunset-preview.jpg'
  },
  {
    id: 'dark',
    name: 'Dark',
    theme: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#e74c3c',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      text: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    preview: '/assets/themes/dark-preview.jpg'
  },
  {
    id: 'purple',
    name: 'Purple',
    theme: {
      primary: '#8360c3',
      secondary: '#2ebf91',
      accent: '#feca57',
      background: 'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
      text: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    preview: '/assets/themes/purple-preview.jpg'
  }
];
