// UserProfile.jsx — Beautiful, production-ready profile page for a Medi Care app
// Requirements:
// - Firebase Auth (to read current user: name/email/photo)
// - Firestore (to save profile details under users/{uid})
// - Firebase Storage (optional: upload avatar)
//
// Expected named exports from your ../firebase file:
//   export const auth = getAuth(app)
//   export const db = getFirestore(app)
//   export const storage = getStorage(app)
//
// Make sure you've enabled Authentication, Firestore, and Storage in Firebase Console.

import React, { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

const emptyProfile = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  bloodGroup: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  allergies: [],
  medications: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  insuranceProvider: "",
  insuranceNumber: "",
  preferredPharmacy: "",
  preferredCommunication: "email",
  notes: "",
  photoURL: "",
};

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(emptyProfile);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Local string for editing allergy tags
  const allergiesText = useMemo(() => profile.allergies?.join(", ") || "", [profile.allergies]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            ...emptyProfile,
            ...data,
            fullName: data.fullName || u.displayName || "",
            email: u.email || data.email || "",
            photoURL: data.photoURL || u.photoURL || "",
          });
          setLastUpdated(data.updatedAt?.toDate?.() || null);
        } else {
          setProfile({
            ...emptyProfile,
            fullName: u.displayName || "",
            email: u.email || "",
            photoURL: u.photoURL || "",
          });
        }
      } catch (e) {
        console.error("Failed to load profile", e);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!profile.fullName.trim()) e.fullName = "Full name is required";
    if (!profile.email.trim()) e.email = "Email is required";
    if (profile.phone && !/^\+?[0-9\-()\s]{7,}$/.test(profile.phone)) e.phone = "Enter a valid phone number";
    if (!profile.addressLine1.trim()) e.addressLine1 = "Address line 1 is required";
    if (!profile.city.trim()) e.city = "City is required";
    if (!profile.state.trim()) e.state = "State/Province is required";
    if (!profile.postalCode.trim()) e.postalCode = "Postal code is required";
    if (!profile.country.trim()) e.country = "Country is required";
    if (profile.emergencyContactPhone && !/^\+?[0-9\-()\s]{7,}$/.test(profile.emergencyContactPhone)) e.emergencyContactPhone = "Enter a valid emergency phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!user) return;
    if (!validate()) return;
    setSaving(true);
    try {
      const allergiesArr = (allergiesText || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const payload = {
        ...profile,
        allergies: allergiesArr,
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(db, "users", user.uid), payload, { merge: true });
      // Update Auth profile for consistency
      if (profile.fullName || profile.photoURL) {
        await updateProfile(user, {
          displayName: profile.fullName || user.displayName || "",
          photoURL: profile.photoURL || user.photoURL || "",
        });
      }
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Save failed", e);
      setErrors((prev) => ({ ...prev, _global: e.message || "Failed to save profile" }));
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (evt) => {
    const file = evt.target.files?.[0];
    if (!file || !user) return;
    try {
      const fileRef = ref(storage, `users/${user.uid}/avatar-${Date.now()}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setProfile((p) => ({ ...p, photoURL: url }));
    } catch (e) {
      console.error("Avatar upload failed", e);
      setErrors((prev) => ({ ...prev, photoURL: "Image upload failed" }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="animate-pulse bg-white/70 backdrop-blur rounded-2xl shadow-xl p-8 w-[92vw] max-w-3xl">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
          <div className="h-24 w-full bg-gray-200 rounded mb-4" />
          <div className="h-24 w-full bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-[92vw] max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-10 px-4">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header Card */}
        <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-xl border p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Avatar + Basic */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={profile.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.fullName || user.email) + "&background=10b981&color=fff"}
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl object-cover border"
                />
                <label className="absolute -bottom-2 -right-2 cursor-pointer bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg shadow hover:bg-emerald-700">
                  Change
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.fullName || "Your Name"}</h1>
                <p className="text-gray-600">{profile.email}</p>
                {lastUpdated && (
                  <p className="text-xs text-gray-500 mt-1">Updated {lastUpdated.toLocaleString?.() || "just now"}</p>
                )}
              </div>
            </div>
            {/* Right: Save button */}
            <div className="flex items-center gap-3">
              {errors._global && (
                <span className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {errors._global}
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:bg-emerald-700 disabled:opacity-60"
              >
                {saving ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17 3H7a2 2 0 0 0-2 2v14l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>
                )}
                <span>{saving ? "Saving..." : "Save Profile"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Section title="Personal Information">
            <Field label="Full Name" error={errors.fullName}>
              <input name="fullName" value={profile.fullName} onChange={handleChange} className="input" placeholder="e.g., John Doe" />
            </Field>
            <Field label="Email (from Auth)" error={errors.email}>
              <input name="email" value={profile.email} disabled className="input disabled:opacity-70" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phone" error={errors.phone}>
                <input name="phone" value={profile.phone} onChange={handleChange} className="input" placeholder="+1 555 123 4567" />
              </Field>
              <Field label="Gender">
                <select name="gender" value={profile.gender} onChange={handleChange} className="input">
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not">Prefer not to say</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Date of Birth">
                <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="input" />
              </Field>
              <Field label="Blood Group">
                <select name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} className="input">
                  <option value="">Select</option>
                  {[
                    "A+","A-","B+","B-","AB+","AB-","O+","O-",
                  ].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* Address */}
          <Section title="Address">
            <Field label="Address Line 1" error={errors.addressLine1}>
              <input name="addressLine1" value={profile.addressLine1} onChange={handleChange} className="input" placeholder="House / Street" />
            </Field>
            <Field label="Address Line 2">
              <input name="addressLine2" value={profile.addressLine2} onChange={handleChange} className="input" placeholder="Apt, suite, etc. (optional)" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="City" error={errors.city}>
                <input name="city" value={profile.city} onChange={handleChange} className="input" />
              </Field>
              <Field label="State/Province" error={errors.state}>
                <input name="state" value={profile.state} onChange={handleChange} className="input" />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Postal Code" error={errors.postalCode}>
                <input name="postalCode" value={profile.postalCode} onChange={handleChange} className="input" />
              </Field>
              <Field label="Country" error={errors.country}>
                <input name="country" value={profile.country} onChange={handleChange} className="input" />
              </Field>
            </div>
          </Section>

          {/* Medical Details */}
          <Section title="Medical Details">
            <Field label="Allergies (comma separated)">
              <input
                name="allergies"
                value={allergiesText}
                onChange={(e) => {
                  const val = e.target.value;
                  setProfile((p) => ({ ...p, allergies: val.split(",").map((s) => s.trim()) }));
                }}
                className="input"
                placeholder="e.g., Penicillin, Nuts"
              />
            </Field>
            <Field label="Current Medications">
              <textarea name="medications" value={profile.medications} onChange={handleChange} className="input min-h-[88px]" placeholder="e.g., Metformin 500mg, daily" />
            </Field>
          </Section>

          {/* Emergency & Insurance */}
          <Section title="Emergency & Insurance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Emergency Contact Name">
                <input name="emergencyContactName" value={profile.emergencyContactName} onChange={handleChange} className="input" />
              </Field>
              <Field label="Emergency Contact Phone" error={errors.emergencyContactPhone}>
                <input name="emergencyContactPhone" value={profile.emergencyContactPhone} onChange={handleChange} className="input" placeholder="+1 555 987 6543" />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Insurance Provider">
                <input name="insuranceProvider" value={profile.insuranceProvider} onChange={handleChange} className="input" />
              </Field>
              <Field label="Policy / Member ID">
                <input name="insuranceNumber" value={profile.insuranceNumber} onChange={handleChange} className="input" />
              </Field>
            </div>
          </Section>

          {/* Preferences */}
          <Section title="Preferences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Preferred Pharmacy">
                <input name="preferredPharmacy" value={profile.preferredPharmacy} onChange={handleChange} className="input" placeholder="e.g., Walgreens #123" />
              </Field>
              <Field label="Preferred Communication">
                <select name="preferredCommunication" value={profile.preferredCommunication} onChange={handleChange} className="input">
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="phone">Phone Call</option>
                </select>
              </Field>
            </div>
            <Field label="Notes">
              <textarea name="notes" value={profile.notes} onChange={handleChange} className="input min-h-[88px]" placeholder="Any additional information for your care team" />
            </Field>
          </Section>
        </div>
      </div>

      {/* Tailwind component classes */}
      <style>{`
        .section-card { @apply bg-white/90 backdrop-blur rounded-3xl shadow-xl border p-6; }
        .section-title { @apply text-lg font-semibold mb-4; }
        .input { @apply w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white; }
        .label { @apply block text-sm font-medium mb-1; }
        .error { @apply text-xs text-red-600 mt-1; }
      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="section-card">
      <h3 className="section-title">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
