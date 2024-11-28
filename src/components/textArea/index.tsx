import { HTMLProps } from "react";
import { Container } from "./styles";

export function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <Container>
      <textarea className="text-area" {...rest}></textarea>
    </Container>
  );
}
