import { useState, useEffect } from 'react';
import { useGetCallerUserProfile } from '../../hooks/useCurrentUserProfile';
import { useSaveCallerUserProfile } from '../../hooks/useSaveCurrentUserProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
import ProfileAvatar from './ProfileAvatar';
import { Upload } from 'lucide-react';

export default function ProfileEditor() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<ExternalBlob | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName);
      setBio(userProfile.bio);
      setProfilePicture(userProfile.profilePicture || null);
    }
  }, [userProfile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });
      setProfilePicture(blob);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error('Please enter a display name');
      return;
    }

    saveProfile(
      {
        displayName: displayName.trim(),
        bio: bio.trim(),
        profilePicture: profilePicture || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Profile updated successfully!');
        },
        onError: (error) => {
          console.error('Profile save error:', error);
          toast.error('Failed to update profile. Please try again.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground mt-4">Loading profile...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const previewProfile = {
    displayName: displayName || 'Your Name',
    bio: bio || '',
    profilePicture: profilePicture || undefined,
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="text-center space-y-3">
                <ProfileAvatar profile={previewProfile} size="lg" />
                <div>
                  <Label htmlFor="picture" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                      <Upload className="w-4 h-4" />
                      {profilePicture ? 'Change Photo' : 'Upload Photo'}
                    </div>
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading || isPending}
                  />
                  {isUploading && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">
                Display Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                maxLength={50}
                disabled={isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself and your writing..."
                rows={4}
                maxLength={500}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                {bio.length}/500 characters
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isPending || isUploading}>
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
