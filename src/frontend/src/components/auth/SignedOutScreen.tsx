import AppShell from '../layout/AppShell';
import InternetIdentitySignIn from './InternetIdentitySignIn';
import { BookOpen, Feather, Users } from 'lucide-react';

export default function SignedOutScreen() {
  return (
    <AppShell showHero>
      <div className="text-center space-y-8 py-12">
        <div className="space-y-4">
          <img
            src="/assets/generated/logo-quill-book.dim_512x512.png"
            alt="Logo"
            className="w-24 h-24 mx-auto"
          />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Stories Worth Reading
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A platform where writers craft compelling stories and readers discover new worlds, one chapter at a time.
          </p>
        </div>

        <div className="flex justify-center">
          <InternetIdentitySignIn />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8">
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Feather className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg">Write Your Story</h3>
            <p className="text-sm text-muted-foreground">
              Share your creativity with readers around the world
            </p>
          </div>

          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg">Discover Stories</h3>
            <p className="text-sm text-muted-foreground">
              Read captivating tales from talented writers
            </p>
          </div>

          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif font-semibold text-lg">Join the Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with fellow readers and writers
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
