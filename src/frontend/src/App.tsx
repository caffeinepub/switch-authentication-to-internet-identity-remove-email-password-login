import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import SignedOutScreen from './components/auth/SignedOutScreen';
import ProfileOnboarding from './components/profile/ProfileOnboarding';
import AppHeader from './components/layout/AppHeader';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  const { identity, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isInitializing = loginStatus === 'initializing' || actorFetching;

  // Show loading state during initialization
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show signed-out screen if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <SignedOutScreen />
        <Toaster />
      </>
    );
  }

  // Show onboarding if profile doesn't exist
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (showProfileSetup) {
    return (
      <>
        <div className="min-h-screen bg-background">
          <AppHeader />
          <ProfileOnboarding />
        </div>
        <Toaster />
      </>
    );
  }

  // Show main authenticated app
  return (
    <>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="container max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-serif font-bold text-foreground">
                Welcome to Your Writing Space
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You're successfully signed in with Internet Identity. Your profile is set up and ready.
              </p>
            </div>

            {userProfile && (
              <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-serif font-semibold">Your Profile</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Display Name:</span>
                    <p className="text-foreground">{userProfile.displayName}</p>
                  </div>
                  {userProfile.bio && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Bio:</span>
                      <p className="text-foreground">{userProfile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
