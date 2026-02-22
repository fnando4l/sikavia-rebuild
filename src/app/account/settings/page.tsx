"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // Replace with real API call
    toast.success("Profile updated");
    setProfileLoading(false);
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setPasswordLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // Replace with real API call
    toast.success("Password changed");
    setPasswordLoading(false);
    setPasswords({ current: "", next: "", confirm: "" });
  }

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="font-body text-sm text-muted hover:text-charcoal transition-colors">
          Account
        </Link>
        <span className="text-muted">/</span>
        <h1 className="font-display text-3xl text-charcoal">Settings</h1>
      </div>

      {/* Profile */}
      <section className="mb-10">
        <h2 className="font-display text-xl text-charcoal mb-5">Profile</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
          <Button type="submit" variant="primary" loading={profileLoading}>
            Save Changes
          </Button>
        </form>
      </section>

      {/* Password */}
      <section>
        <h2 className="font-display text-xl text-charcoal mb-5">Change Password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwords.next}
            onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
            hint="Minimum 8 characters"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
            required
          />
          <Button type="submit" variant="primary" loading={passwordLoading}>
            Update Password
          </Button>
        </form>
      </section>
    </div>
  );
}
