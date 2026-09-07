import { useEffect } from "react";
import styled from "styled-components";

export default function SuccessToast({ message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <ToastContainer role="status">{message}</ToastContainer>;
}

const ToastContainer = styled.div`
  color: #155724;
  background-color: #d4edda;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;
