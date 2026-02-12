import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { UserProfile } from '../../backend';

interface ProfileAvatarProps {
  profile: UserProfile;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProfileAvatar({ profile, size = 'md' }: ProfileAvatarProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const imageUrl = profile.profilePicture
    ? profile.profilePicture.getDirectURL()
    : '/assets/generated/default-avatar.dim_256x256.png';

  const initials = profile.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={imageUrl} alt={profile.displayName} />
      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
