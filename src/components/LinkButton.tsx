import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Button, { ButtonProps } from '@mui/material/Button';

// Собираем пропсы кнопки + пропсы Link (но без «children», «className» и т.д.)
export type LinkButtonProps =
  Omit<RouterLinkProps, 'to'> &              // все пропсы <Link>, кроме to
  { to: RouterLinkProps['to'] } &            // to обязателен
  Omit<ButtonProps, 'href'>;                 // из ButtonProps исключаем href

// Функциональный компонент, который рендерит MUI‑кнопку, но под капотом — <Link>
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(({
  to,
  replace,
  state,
  ...buttonProps
}, ref) => (
  <Button
    component={RouterLink}
    to={to}
    replace={replace}
    state={state}
    ref={ref}
    {...buttonProps}
  />
));

LinkButton.displayName = 'LinkButton'; 