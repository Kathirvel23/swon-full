import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  Colors,
  Elevation,
  Fonts,
  Radius,
  Spacing,
  TypeScale,
} from '@/constants/theme';

type Option = { value: string; label: string };

/** Real single-select dropdown (modal list). Tap opens a picker list. */
export function Dropdown({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select…',
  error,
}: {
  label: string;
  value?: string;
  options: Option[];
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  return (
    <View collapsable={false} style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen(true)}
        style={[styles.box, value ? styles.boxSelected : null]}
      >
        <Text style={[styles.boxText, !value && styles.placeholder]} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={Colors.light.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.modal} onPress={() => {}}>
            <Text style={styles.modalTitle}>{label}</Text>
            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              {options.map((o) => {
                const active = o.value === value;
                return (
                  <Pressable
                    key={o.value}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    onPress={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    style={[styles.row, active && styles.rowSelected]}
                  >
                    <Text style={[styles.rowText, active && styles.rowTextSelected]}>{o.label}</Text>
                    {active ? (
                      <Ionicons name="checkmark" size={16} color={Colors.light.primary} />
                    ) : null}
                  </Pressable>
                );
              })}
              {options.length === 0 ? <Text style={styles.muted}>No options.</Text> : null}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Calendar picker — tap the field, pick a day from a real calendar. */
export function DateField({
  label,
  value,
  onChange,
  error,
  placeholder = 'Pick a date',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const tY = today.getFullYear();
  const tM = today.getMonth();
  const tD = today.getDate();

  const select = (d: number) => {
    onChange(`${year}-${pad(month + 1)}-${pad(d)}`);
    setOpen(false);
  };
  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };
  const cellKey = (d: number) => `${year}-${pad(month + 1)}-${pad(d)}`;

  return (
    <View collapsable={false} style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable accessibilityRole="button" onPress={() => setOpen(true)} style={[styles.box, value ? styles.boxSelected : null]}>
        <Text style={[styles.boxText, !value && styles.placeholder]} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={18} color={Colors.light.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.modal, styles.calModal]} onPress={() => {}}>
            <Text style={styles.modalTitle}>{label}</Text>
            <View style={styles.calHeader}>
              <Pressable onPress={prev} style={styles.calNav} accessibilityLabel="Previous month">
                <Ionicons name="chevron-back" size={20} color={Colors.light.text} />
              </Pressable>
              <Text style={styles.calMonth}>
                {MONTHS[month]} {year}
              </Text>
              <Pressable onPress={next} style={styles.calNav} accessibilityLabel="Next month">
                <Ionicons name="chevron-forward" size={20} color={Colors.light.text} />
              </Pressable>
            </View>
            <View style={styles.calWeek}>
              {WEEKDAYS.map((d) => (
                <Text key={d} style={styles.calDow}>{d}</Text>
              ))}
            </View>
            <View style={styles.calGrid}>
              {Array.from({ length: firstDow }, (_, i) => (
                <View key={`blank-${i}`} style={styles.calCell} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const d = i + 1;
                const active = value === cellKey(d);
                const isToday = d === tD && month === tM && year === tY;
                return (
                  <Pressable
                    key={d}
                    onPress={() => select(d)}
                    style={[styles.calCell, isToday && styles.calToday, active && styles.calSelected]}
                    accessibilityLabel={cellKey(d)}
                  >
                    <Text
                      style={[
                        styles.calDay,
                        isToday && styles.calDayToday,
                        active && styles.calDaySelected,
                      ]}
                    >
                      {d}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable style={styles.doneBtn} onPress={() => setOpen(false)}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.half,
  },
  fieldLabel: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.mid,
    paddingVertical: Spacing.two,
    backgroundColor: Colors.light.card,
  },
  boxSelected: {
    borderColor: Colors.light.primary,
  },
  boxText: {
    flex: 1,
    ...TypeScale.body,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  placeholder: {
    color: Colors.light.textMuted,
    fontFamily: Fonts.body,
  },
  error: {
    ...TypeScale.caption,
    color: Colors.light.danger,
  },
  muted: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(11, 30, 28, 0.5)',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  modal: {
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two,
    maxHeight: '75%',
    ...Elevation.pop,
  },
  calModal: {
    maxHeight: '80%',
  },
  modalTitle: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 24,
    color: Colors.light.text,
  },
  list: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: Spacing.two,
    borderRadius: Radius.md,
  },
  rowSelected: {
    backgroundColor: Colors.light.tint,
  },
  rowText: {
    ...TypeScale.body,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
    flexShrink: 1,
  },
  rowTextSelected: {
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calNav: {
    padding: Spacing.two,
  },
  calMonth: {
    fontFamily: Fonts.bodyExtra,
    fontSize: 15,
    color: Colors.light.text,
  },
  calWeek: {
    flexDirection: 'row',
  },
  calDow: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    paddingVertical: 4,
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calToday: {
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.tint,
  },
  calSelected: {
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.primary,
  },
  calDay: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: Colors.light.text,
  },
  calDayToday: {
    color: Colors.light.primaryDark,
  },
  calDaySelected: {
    color: Colors.light.onPrimary,
  },
  doneBtn: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  doneText: {
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primary,
  },
});