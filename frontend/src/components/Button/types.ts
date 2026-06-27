export interface ButtonProps {
  title: string;
  onPress?: () => void;
  type?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
}