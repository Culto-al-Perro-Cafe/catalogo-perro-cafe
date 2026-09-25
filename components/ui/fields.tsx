"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { Icon } from "./Icon";

function FieldShell({
  label,
  error,
  htmlFor,
  errorId,
  children,
}: {
  label: ReactNode;
  error?: string;
  htmlFor: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div className="cp-field-shell">
      <label className="cp-field-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && (
        <span id={errorId} className="cp-field-error">
          {error}
        </span>
      )}
    </div>
  );
}

type TextFieldProps = Omit<ComponentProps<"input">, "className"> & {
  label: ReactNode;
  error?: string;
};

export function TextField({ label, error, id, ...rest }: TextFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  const errorId = `${fid}-error`;
  return (
    <FieldShell label={label} error={error} htmlFor={fid} errorId={errorId}>
      <input
        id={fid}
        className="cp-field"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<ComponentProps<"select">, "className"> & {
  label: ReactNode;
  error?: string;
  options: readonly (string | { value: string; label: string })[];
};

export function SelectField({
  label,
  error,
  id,
  options,
  ...rest
}: SelectFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  const errorId = `${fid}-error`;
  return (
    <FieldShell label={label} error={error} htmlFor={fid} errorId={errorId}>
      <div className="cp-select">
        <select
          id={fid}
          className="cp-field"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          {options.map((o) =>
            typeof o === "string" ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
        <Icon name="expand_more" size={16} />
      </div>
    </FieldShell>
  );
}

export function SegmentedChoice({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const labelId = useId();
  const errorId = `${labelId}-error`;
  return (
    <div className="cp-field-shell" style={{ gap: 10 }}>
      <span id={labelId} className="cp-field-label">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        className="cp-seg"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={option === value}
            className="cp-seg__opt"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {/* Keeps the value in native FormData / no-JS submissions. */}
      <input type="hidden" name={name} value={value} />
      {error && (
        <span id={errorId} className="cp-field-error">
          {error}
        </span>
      )}
    </div>
  );
}
