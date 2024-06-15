import { forwardRef, ChangeEvent, ForwardedRef } from "react";
import MaskedInput from "./MaskedInput";

type FormInputProps = {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  mask?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { id, label, type, value, onChange, error, mask },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
        {mask ? (
          <MaskedInput
            id={id}
            mask={mask}
            placeholder={label}
            value={value}
            onChange={onChange}
            ref={ref}
            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={label}
            value={value || ""}
            onChange={onChange}
            ref={ref}
            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
