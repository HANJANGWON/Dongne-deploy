import styled from "styled-components";

interface NotificationProps {
  message?: string;
}

const SNotification = styled.span`
  color: ${(props) => props.theme.accent};
  font-weight: bold;
  font-size: 13px;
  margin-top: 12px;
`;

const Notification = ({ message }: NotificationProps) => {
  return message === "" || !message ? null : (
    <SNotification>{message}</SNotification>
  );
};

export default Notification;
