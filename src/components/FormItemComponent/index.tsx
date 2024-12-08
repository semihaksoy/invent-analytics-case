import { Form } from "antd";
import type { Rule } from "antd/lib/form";
import type { ElementType, ReactElement, ComponentProps } from "react";

interface FormItemComponentProps<C extends ElementType> {
  name: string | number | (string | number)[];
  label?: string;
  rules?: Rule[];
  component: C;
  componentProps?: ComponentProps<C>;
}

const FormItemComponent = <C extends ElementType>({
  name,
  label,
  rules = [],
  component: Component,
  componentProps,
}: FormItemComponentProps<C>): ReactElement => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      layout="vertical"
      className={componentProps?.className}
    >
      <Component {...(componentProps as ComponentProps<C>)} />
    </Form.Item>
  );
};

export default FormItemComponent;
