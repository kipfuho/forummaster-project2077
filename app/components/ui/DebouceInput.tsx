import { Input, InputProps } from "@mui/material";
import { useRef } from "react";

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout: number;
};

export default function DebounceInput(props: InputProps & DebounceProps) {
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout);
  };

  return <Input {...rest} onChange={handleChange} />;
}