'use no memo'; // React Compiler is incompatible with react-hook-form v7 Controller (drops keystrokes in controlled inputs) — opt this file out.
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useWatch, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { authApi } from '@/api/auth';
import { errorMessage } from '@/api/client';
import { jobsApi } from '@/api/jobs';
import { Button, Card, Screen } from '@/components/screen';
import { Chip } from '@/components/ui';
import { Dropdown, DateField } from '@/components/inputs';
import { Colors, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Wave 3 (H4): employer post-a-job form, V3 re-skin (cards, chips, fields).
 * RHF Controller + onChangeText per the app convention; category/area/skills/
 * welfare come from the server catalogs (no hardcoded lists, §26). Two exits:
 * draft, or draft+publish (publish enforces the #10 KYC gate — the server
 * message surfaces inline). Validation and payload building are unchanged.
 */

type FormValues = {
  title: string;
  description: string;
  categoryId: string;
  areaId: string;
  addressLine: string;
  startsOn: string;
  endsOn: string;
  dayStartTime: string;
  dayEndTime: string;
  payType: 'HOUR' | 'DAY' | 'TOTAL';
  payAmount: string;
  headcount: string;
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
}) {
  return (
    <View style={s.field}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textMuted}
        multiline={multiline}
        autoCapitalize="sentences"
        style={[s.input, multiline && s.inputMultiline]}
        accessibilityLabel={label}
      />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

export default function PostJobScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [skillIds, setSkillIds] = useState<string[]>([]);
  const [welfareCodes, setWelfareCodes] = useState<string[]>([]);

  const catalog = useQuery({ queryKey: ['catalog'], queryFn: authApi.catalog, retry: 1 });
  const welfare = useQuery({ queryKey: ['welfare'], queryFn: jobsApi.welfareCatalog, retry: 1 });

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      areaId: '',
      addressLine: '',
      startsOn: '',
      endsOn: '',
      dayStartTime: '09:00',
      dayEndTime: '18:00',
      payType: 'DAY',
      payAmount: '',
      headcount: '1',
    },
  });

  const toggle = (list: string[], set: (v: string[]) => void, code: string) =>
    set(list.includes(code) ? list.filter((c) => c !== code) : [...list, code]);

  const run = async (values: FormValues, publishNow: boolean) => {
    setBusy(true);
    setServerError(null);
    try {
      const area = (catalog.data?.areas ?? []).find((a) => a.publicId === values.areaId);
      const created = await jobsApi.create({
        title: values.title.trim(),
        description: values.description.trim(),
        categoryId: values.categoryId,
        city: area?.city ?? '',
        areaId: values.areaId,
        addressLine: values.addressLine.trim(),
        startsOn: values.startsOn.trim(),
        endsOn: values.endsOn.trim(),
        dayStartTime: values.dayStartTime.trim(),
        dayEndTime: values.dayEndTime.trim(),
        payType: values.payType,
        payAmountPaise: Math.round(Number(values.payAmount) * 100),
        headcountRequired: Math.max(1, Math.min(500, Number(values.headcount) || 1)),
        skillIds,
        welfare: welfareCodes.map((code) => ({ code })),
      });
      if (publishNow) await jobsApi.publish(created.publicId);
      await queryClient.invalidateQueries({ queryKey: ['jobs-mine'] });
      await queryClient.invalidateQueries({ queryKey: ['jobs-feed'] });
      router.back();
    } catch (e) {
      setServerError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const submit = (publishNow: boolean) => () =>
    void handleSubmit((values) => run(values, publishNow))();

  const selectedArea = useWatch({ control, name: 'areaId' });
  const categoryId = useWatch({ control, name: 'categoryId' });
  const payType = useWatch({ control, name: 'payType' });
  const categories = catalog.data?.categories ?? [];
  const areas = catalog.data?.areas ?? []; // V1: all areas selectable; city follows the pick
  const skills = catalog.data?.skills ?? [];
  const welfareItems = welfare.data ?? [];

  return (
    <Screen title={en.jobs.postJob}>
      <View style={s.intro}>
        <Text style={s.introTitle}>{en.jobs.postJob}</Text>
        <Text style={s.introSub}>{en.jobs.f.descriptionHint}</Text>
      </View>

      <Controller
        control={control}
        name="title"
        rules={{ required: en.jobs.f.title, minLength: { value: 5, message: en.jobs.f.title } }}
        render={({ field: { value, onChange } }) => (
          <Field
            label={en.jobs.f.title}
            value={value}
            onChangeText={onChange}
            placeholder={en.jobs.f.titleHint}
            error={errors.title?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{ required: en.jobs.f.description, minLength: { value: 20, message: en.jobs.f.description } }}
        render={({ field: { value, onChange } }) => (
          <Field
            label={en.jobs.f.description}
            value={value}
            onChangeText={onChange}
            placeholder={en.jobs.f.descriptionHint}
            error={errors.description?.message}
            multiline
          />
        )}
      />

      <Dropdown
        label={en.jobs.f.category}
        value={categoryId}
        options={categories.map((c) => ({ value: c.publicId, label: c.name }))}
        onChange={(v) => setValue('categoryId', v)}
        error={errors.categoryId ? en.jobs.f.category : undefined}
      />

      <Dropdown
        label={en.jobs.f.area}
        value={selectedArea}
        options={areas.map((a) => ({ value: a.publicId, label: `${a.name} (${a.city})` }))}
        onChange={(v) => setValue('areaId', v)}
        error={errors.areaId ? en.jobs.f.area : undefined}
      />

      <Controller
        control={control}
        name="addressLine"
        rules={{ required: en.jobs.f.address }}
        render={({ field: { value, onChange } }) => (
          <Field
            label={en.jobs.f.address}
            value={value}
            onChangeText={onChange}
            error={errors.addressLine?.message}
          />
        )}
      />

      <View style={s.twoCol}>
        <View style={s.col}>
          <Controller
            control={control}
            name="startsOn"
            rules={{ required: en.jobs.f.startDate, pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: 'YYYY-MM-DD' } }}
            render={({ field: { value, onChange } }) => (
              <DateField label={en.jobs.f.startDate} value={value} onChange={onChange} error={errors.startsOn?.message} />
            )}
          />
        </View>
        <View style={s.col}>
          <Controller
            control={control}
            name="endsOn"
            rules={{ required: en.jobs.f.endDate, pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: 'YYYY-MM-DD' } }}
            render={({ field: { value, onChange } }) => (
              <DateField label={en.jobs.f.endDate} value={value} onChange={onChange} error={errors.endsOn?.message} />
            )}
          />
        </View>
      </View>

      <View style={s.twoCol}>
        <View style={s.col}>
          <Controller
            control={control}
            name="dayStartTime"
            rules={{ required: true, pattern: { value: /^\d{2}:\d{2}$/, message: 'HH:MM' } }}
            render={({ field: { value, onChange } }) => (
              <Field label={en.jobs.f.startTime} value={value} onChangeText={onChange} error={errors.dayStartTime?.message} />
            )}
          />
        </View>
        <View style={s.col}>
          <Controller
            control={control}
            name="dayEndTime"
            rules={{ required: true, pattern: { value: /^\d{2}:\d{2}$/, message: 'HH:MM' } }}
            render={({ field: { value, onChange } }) => (
              <Field label={en.jobs.f.endTime} value={value} onChangeText={onChange} error={errors.dayEndTime?.message} />
            )}
          />
        </View>
      </View>

      <Card title={en.jobs.f.payType}>
        <Dropdown
          label={en.jobs.f.payType}
          value={payType}
          options={[
            { value: 'HOUR', label: en.jobs.f.payH },
            { value: 'DAY', label: en.jobs.f.payD },
            { value: 'TOTAL', label: en.jobs.f.payT },
          ]}
          onChange={(v) => setValue('payType', v as FormValues['payType'])}
        />
        <Controller
          control={control}
          name="payAmount"
          rules={{
            required: en.jobs.f.payAmount,
            pattern: { value: /^\d{2,6}$/, message: en.jobs.f.payAmount },
          }}
          render={({ field: { value, onChange } }) => (
            <Field label={`₹ — ${en.jobs.f.payAmount}`} value={value} onChangeText={onChange} placeholder="750" error={errors.payAmount?.message} />
          )}
        />
        <Controller
          control={control}
          name="headcount"
          rules={{ required: en.jobs.f.headcount, pattern: { value: /^\d{1,3}$/, message: en.jobs.f.headcount } }}
          render={({ field: { value, onChange } }) => (
            <Field label={en.jobs.f.headcount} value={value} onChangeText={onChange} placeholder="3" error={errors.headcount?.message} />
          )}
        />
      </Card>

      <Card title={en.jobs.f.skills}>
        <View style={s.chipRow}>
          {skills.map((skill) => (
            <Chip
              key={skill.publicId}
              label={skill.name}
              selected={skillIds.includes(skill.publicId)}
              onPress={() => toggle(skillIds, setSkillIds, skill.publicId)}
            />
          ))}
        </View>
      </Card>

      <Card title={en.jobs.f.welfare}>
        <Text style={s.hint}>{en.jobs.f.welfareHint}</Text>
        <View style={s.chipRow}>
          {welfareItems.map((w) => (
            <Chip
              key={w.code}
              label={w.label}
              selected={welfareCodes.includes(w.code)}
              onPress={() => toggle(welfareCodes, setWelfareCodes, w.code)}
            />
          ))}
        </View>
      </Card>

      {serverError ? <Text style={s.error}>{serverError}</Text> : null}

      <Button label={en.jobs.saveDraft} variant="secondary" disabled={busy} onPress={submit(false)} />
      <Button label={en.jobs.publish} variant="primary" disabled={busy} onPress={submit(true)} />
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const s = StyleSheet.create({
  intro: {
    gap: 2,
  },
  introTitle: {
    ...TypeScale.title,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  introSub: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  field: {
    gap: Spacing.half,
  },
  fieldLabel: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  input: {
    ...TypeScale.body,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.mid,
    paddingVertical: Spacing.two,
    minHeight: 48,
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
    paddingTop: Spacing.two,
  },
  error: {
    ...TypeScale.caption,
    color: Colors.light.danger,
  },
  hint: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.half,
  },
  twoCol: {
    flexDirection: 'row',
    gap: Spacing.mid,
  },
  col: {
    flex: 1,
  },
});
