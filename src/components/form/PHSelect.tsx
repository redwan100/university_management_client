import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelect = {
  label: string;
  name: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
};

const PHSelect = ({ label, name, options, disabled }: PHSelect) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="middle"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
