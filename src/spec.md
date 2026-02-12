# Specification

## Summary
**Goal:** Replace email/password authentication with Internet Identity, key user data by Principal, and add a simple onboarding/profile flow with a cohesive writing-platform theme and static generated assets.

**Planned changes:**
- Remove all email/password login, signup, and reset-password UI/flows; add clear “Sign in with Internet Identity” and “Sign out” actions using the existing template integration (without editing immutable hook/component paths).
- Update authenticated gating so signed-out users are prompted to sign in and signed-in users can access authenticated areas.
- Update backend identity handling so user records and authenticated operations are keyed by the caller Principal; reject anonymous callers for protected methods.
- Add post-login onboarding/profile screens to create/update profile fields (display name required; bio and profile picture editable), persisted and retrieved by Principal.
- Apply a consistent visual theme (colors, typography, spacing, component styling) across auth/onboarding/profile screens with English copy.
- Add and reference static generated image assets (logo, hero/background illustration, default avatar) from `frontend/public/assets/generated` (no backend image serving).

**User-visible outcome:** Users can sign in/out with Internet Identity, are guided to complete a basic profile on first login, can later edit their bio and profile picture, and see a consistent themed UI with custom static visuals.
