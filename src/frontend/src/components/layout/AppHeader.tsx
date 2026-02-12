import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import InternetIdentitySignIn from '../auth/InternetIdentitySignIn';
import ProfileAvatar from '../profile/ProfileAvatar';
import { useGetCallerUserProfile } from '../../hooks/useCurrentUserProfile';

export default function AppHeader() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/logo-quill-book.dim_512x512.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-serif font-bold text-foreground">
              StorySpace
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && userProfile && (
              <div className="flex items-center gap-3">
                <ProfileAvatar profile={userProfile} size="sm" />
                <span className="text-sm font-medium text-foreground hidden sm:inline">
                  {userProfile.displayName}
                </span>
              </div>
            )}
            <InternetIdentitySignIn />
          </div>
        </div>
      </div>
    </header>
  );
}
