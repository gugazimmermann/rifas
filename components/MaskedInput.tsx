import React, { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface MaskedInputProps {
  id: string;
  mask: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ id, mask, placeholder, value, onChange, className }, ref) => {
    return (
      <IMaskInput
        mask={mask}
        value={value}
        onAccept={(value) =>
          onChange?.({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        id={id}
        placeholder={placeholder}
        className={className}
        inputRef={ref}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
