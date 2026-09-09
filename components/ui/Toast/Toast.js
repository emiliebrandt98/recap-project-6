import { useEffect } from "react";
import styled, { css } from "styled-components";

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onCloseToast,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onCloseToast]);

  return (
    <ToastContainer role="status" $type={type}>
      {message}
    </ToastContainer>
  );
}

const ToastContainer = styled.div`
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  ${({ $type }) => variantStyles[$type]}
`;

const variantStyles = {
  success: css`
    color: #155724;
    background-color: #d4edda;
  `,
  error: css`
    color: #721c24;
    background-color: #f8d7da;
  `,
};
