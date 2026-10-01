import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { z } from 'zod';

import { AppError, errorMessage } from '@/api/client';
import { authApi, type OnboardInput } from '@/api/auth';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, Touch, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * H1 — minimal profile + role commit: POST /me/onboarding is the single call
 * that writes role (one per account, §11.1) and flips PENDING_VERIFICATION →
 * ACTIVE. Worker needs only a name (city/area are optional, added later from
 * the profile screen); employer needs org details + a catalog area (required
 * by the contract). After success the account is ACTIVE → role home.
 *
 * V3 reskin: white r-xl auth card, labelled pill fields with teal focus rings
 * (prototype .field), pill area chips, primary CTA (lg). Every Controller,
 * schema, query and submit handler below is unchanged — RN convention stays
 * RHF <Controller> + onChangeText (register() breaks on RN).
 */

const workerSchema = z.object({
  fullName: z.string().min(2).max(120),
  bio: z.string().max(500),
  experienceYears: z.string(),
});

const employerSchema = z.object({
  orgName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(120),
  city: z.string().min(2).max(60),
  addressLine: z.string().min(3).max(255),
});

type WorkerValues = z.infer<typeof workerSchema>;
type EmployerValues = z.infer<typeof employerSchema>;
type RouteParams = { role?: string };

/** Prototype `.field` — label above, canvas pill box, focus ring, inline error. */
function PillField({
  label,
  error,
  ...input
}: { label: string; error?: string } & TextInputProps) {
  const [focused, setFocused] = useState(false);
  const multiline = input.multiline === true;
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        style={[
          styles.fieldBox,
          multiline && styles.fieldBoxMultiline,
          focused && styles.fieldBoxFocus,
          error != null && styles.fieldBoxError,
        ]}
      >
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={Colors.light.textMuted}
          {...input}
          onFocus={(e) => {
            setFocused(true);
            input.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            input.onBlur?.(e);
          }}
          style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
        />
      </View>
      {error != null ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const session = useSession();
  const params = useLocalSearchParams<RouteParams>();
  const role: 'worker' | 'employer' = params.role === 'employer' ? 'employer' : 'worker';

  const [areaId, setAreaId] = useState<string | null>(null);
  const [areaTouched, setAreaTouched] = useState(false);
  const [areaSearch, setAreaSearch] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const catalog = useQuery({ queryKey: ['catalog'], queryFn: authApi.catalog, retry: 1 });

  const workerForm = useForm<WorkerValues>({
    defaultValues: { fullName: '', bio: '', experienceYears: '' },
  });
  const employerForm = useForm<EmployerValues>({
    defaultValues: { orgName: '', contactName: '', city: 'Coimbatore', addressLine: '' },
  });

  const finish = async (me: { account: { publicId: string; status: string }; role: 'worker' | 'employer' }) => {
    session.setAccount({ publicId: me.account.publicId, role: me.role, status: me.account.status });
    router.replace(role === 'employer' ? '/employer' : '/worker');
  };

  const submitWorker = async (values: WorkerValues) => {
    setFormError(null);
    setSaving(true);
    try {
      const input: OnboardInput = {
        role: 'worker',
        fullName: values.fullName.trim(),
        ...(values.bio.trim() ? { bio: values.bio.trim() } : {}),
        ...(values.experienceYears.trim()
          ? { experienceYears: Math.min(50, Math.max(0, Number(values.experienceYears) || 0)) }
          : {}),
        ...(areaId ? { areaId } : {}),
      };
      await finish(await authApi.onboard(input));
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const submitEmployer = async (values: EmployerValues) => {
    setFormError(null);
    setAreaTouched(true);
    if (!areaId) return;
    setSaving(true);
    try {
      const input: OnboardInput = {
        role: 'employer',
        orgName: values.orgName.trim(),
        contactName: values.contactName.trim(),
        city: values.city.trim(),
        addressLine: values.addressLine.trim(),
        areaId: areaId as string,
      };
      await finish(await authApi.onboard(input));
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const renderAreaPicker = () => {
    const areas = (catalog.data?.areas ?? []).filter((area) => {
      const needle = areaSearch.trim().toLowerCase();
      if (!needle) return true;
      return `${area.city} ${area.name}`.toLowerCase().includes(needle);
    });
    return (
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{en.auth.areaPick}</Text>
        <TextInput
          accessibilityLabel={en.auth.areaSearch}
          placeholder={en.auth.areaSearch}
          placeholderTextColor={Colors.light.textMuted}
          value={areaSearch}
          onChangeText={setAreaSearch}
          style={styles.areaSearch}
        />
        <ScrollView style={styles.areaScroll}>
          {areas.map((area) => {
            const active = areaId === area.publicId;
            return (
              <Pressable
                key={area.publicId}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => {
                  setAreaId(area.publicId);
                  setAreaTouched(true);
                }}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {area.city} · {area.name}
                </Text>
              </Pressable>
            );
          })}
          {areas.length === 0 ? <Text style={styles.muted}>No areas match.</Text> : null}
        </ScrollView>
        {areaTouched && !areaId ? (
          <Text style={styles.fieldError}>{en.auth.areaRequired}</Text>
        ) : null}
        {catalog.isError ? (
          <Text style={styles.fieldError}>
            {errorMessage(catalog.error instanceof AppError ? catalog.error : new Error('catalog'))}
          </Text>
        ) : null}
      </View>
    );
  };

  if (role === 'worker') {
    return (
      <Screen title={en.auth.profileWorkerTitle}>
        <Text style={styles.lead}>{en.auth.profileWorkerNote}</Text>
        <View style={styles.card}>
          <Controller
            control={workerForm.control}
            name="fullName"
            rules={{
              validate: (value) =>
                workerSchema.shape.fullName.safeParse(value).success || 'Name must be 2–120 characters',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PillField
                label={en.auth.fullName}
                error={workerForm.formState.errors.fullName?.message}
                placeholder={en.auth.fullNamePlaceholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={workerForm.control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <PillField
                label={en.auth.bio}
                placeholder={en.auth.bioPlaceholder}
                multiline
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={workerForm.control}
            name="experienceYears"
            render={({ field: { onChange, onBlur, value } }) => (
              <PillField
                label={en.auth.experience}
                keyboardType="number-pad"
                maxLength={2}
                placeholder="0"
                value={value}
                onChangeText={(text: string) => onChange(text.replace(/\D/g, ''))}
                onBlur={onBlur}
              />
            )}
          />

          {formError ? <Text style={styles.fieldError}>{formError}</Text> : null}
          <Button
            variant="primary"
            size="lg"
            label={saving ? en.auth.creating : en.auth.createProfile}
            disabled={saving}
            onPress={workerForm.handleSubmit((v) => void submitWorker(v))}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={en.auth.profileEmployerTitle}>
      <View style={styles.card}>
        <Controller
          control={employerForm.control}
          name="orgName"
          rules={{
            validate: (value) =>
              employerSchema.shape.orgName.safeParse(value).success || 'Name must be 2–120 characters',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PillField
              label={en.auth.orgName}
              error={employerForm.formState.errors.orgName?.message}
              placeholder={en.auth.orgNamePlaceholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={employerForm.control}
          name="contactName"
          rules={{
            validate: (value) =>
              employerSchema.shape.contactName.safeParse(value).success || 'Name must be 2–120 characters',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PillField
              label={en.auth.contactName}
              error={employerForm.formState.errors.contactName?.message}
              placeholder={en.auth.contactNamePlaceholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={employerForm.control}
          name="city"
          rules={{
            validate: (value) =>
              employerSchema.shape.city.safeParse(value).success || 'City must be 2–60 characters',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PillField
              label={en.auth.city}
              error={employerForm.formState.errors.city?.message}
              placeholder={en.auth.cityPlaceholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={employerForm.control}
          name="addressLine"
          rules={{
            validate: (value) =>
              employerSchema.shape.addressLine.safeParse(value).success || 'Address must be 3–255 characters',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PillField
              label={en.auth.address}
              error={employerForm.formState.errors.addressLine?.message}
              placeholder={en.auth.addressPlaceholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {renderAreaPicker()}

        {formError ? <Text style={styles.fieldError}>{formError}</Text> : null}
        <Button
          variant="primary"
          size="lg"
          label={saving ? en.auth.creating : en.auth.createProfile}
          disabled={saving}
          onPress={employerForm.handleSubmit((v) => void submitEmployer(v))}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  card: {
    gap: Spacing.three,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    ...Elevation.lift,
  },
  field: {
    gap: Spacing.half,
  },
  fieldLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: Colors.light.textMuted,
  },
  fieldBox: {
    minHeight: Touch.min,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  fieldBoxMultiline: {
    minHeight: 96,
    borderRadius: Radius.lg,
    justifyContent: 'flex-start',
  },
  fieldBoxFocus: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.card,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  fieldBoxError: {
    borderColor: Colors.light.danger,
    backgroundColor: Colors.light.card,
  },
  fieldInput: {
    ...TypeScale.body,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
    paddingVertical: Spacing.half,
  },
  fieldInputMultiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  fieldError: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.danger,
  },
  areaSearch: {
    minHeight: Touch.min,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    ...TypeScale.body,
    fontFamily: Fonts.bodyBold,
  },
  areaScroll: {
    maxHeight: 180,
  },
  muted: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
    paddingVertical: Spacing.one,
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    marginBottom: Spacing.one,
    backgroundColor: Colors.light.card,
    alignSelf: 'flex-start',
  },
  chipActive: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.primary,
  },
  chipText: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  chipTextActive: {
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },
});
